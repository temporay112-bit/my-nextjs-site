import { Pool, PoolConfig } from "pg";
import { loadEnvConfig } from "@next/env";

try {
  loadEnvConfig(process.cwd());
} catch {}

let pool: Pool | null = null;
let schemaInitialized = false;

export function getDatabaseUrl(): string | undefined {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    try {
      loadEnvConfig(process.cwd());
    } catch {}
  }
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL;
}

export function isPostgresConfigured(): boolean {
  return Boolean(getDatabaseUrl());
}

export function getPostgresPool(): Pool {
  if (pool) return pool;

  const connectionString = getDatabaseUrl();
  if (!connectionString) {
    throw new Error("DATABASE_URL / POSTGRES_URL is not defined in environment variables.");
  }

  const isLocalhost = connectionString.includes("localhost") || connectionString.includes("127.0.0.1");

  const config: PoolConfig = {
    connectionString,
    ssl: isLocalhost ? false : { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  };

  pool = new Pool(config);

  pool.on("error", (err) => {
    console.error("[PostgreSQL Pool Error]:", err.message);
  });

  return pool;
}

export async function query<T = any>(text: string, params: any[] = []): Promise<T[]> {
  const p = getPostgresPool();
  const res = await p.query(text, params);
  return res.rows;
}

export async function queryOne<T = any>(text: string, params: any[] = []): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows.length > 0 ? rows[0] : null;
}

export async function initPostgresSchema(): Promise<void> {
  if (schemaInitialized) return;
  if (!isPostgresConfigured()) return;

  const ddl = `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(128) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE,
      phone VARCHAR(64),
      password_hash TEXT NOT NULL,
      role VARCHAR(32) NOT NULL DEFAULT 'CUSTOMER',
      status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
      email_verified BOOLEAN NOT NULL DEFAULT FALSE,
      reset_token TEXT,
      reset_token_expires_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_login_at TIMESTAMPTZ
    );
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

    CREATE TABLE IF NOT EXISTS customer_profiles (
      id VARCHAR(128) PRIMARY KEY,
      user_id VARCHAR(128) UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      company_name VARCHAR(255),
      phone VARCHAR(64),
      country VARCHAR(128),
      notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_customer_profiles_user_id ON customer_profiles(user_id);

    CREATE TABLE IF NOT EXISTS verification_tokens (
      id VARCHAR(128) PRIMARY KEY,
      user_id VARCHAR(128) NOT NULL,
      token_hash VARCHAR(255) NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      used_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_verification_tokens_hash ON verification_tokens(token_hash);
    CREATE INDEX IF NOT EXISTS idx_verification_tokens_user_id ON verification_tokens(user_id);

    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id VARCHAR(128) PRIMARY KEY,
      user_id VARCHAR(128) NOT NULL,
      token_hash VARCHAR(255) NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      used_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_hash ON password_reset_tokens(token_hash);
    CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);

    CREATE TABLE IF NOT EXISTS categories (
      id VARCHAR(128) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      parent_id VARCHAR(128),
      description TEXT,
      image TEXT,
      sort_order INT NOT NULL DEFAULT 0,
      published BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(128) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      category_id VARCHAR(128) NOT NULL,
      subcategory_id VARCHAR(128),
      description TEXT,
      image TEXT NOT NULL,
      gallery JSONB DEFAULT '[]'::jsonb,
      specifications JSONB DEFAULT '{}'::jsonb,
      min_order_quantity JSONB,
      lead_time VARCHAR(128),
      featured BOOLEAN NOT NULL DEFAULT FALSE,
      published BOOLEAN NOT NULL DEFAULT TRUE,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
    CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);

    CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(128) PRIMARY KEY,
      customer_id VARCHAR(128),
      customer_name VARCHAR(255),
      customer_email VARCHAR(255),
      customer_phone VARCHAR(64),
      company_name VARCHAR(255),
      status VARCHAR(64) NOT NULL DEFAULT 'NEW',
      reference VARCHAR(128),
      notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);

    CREATE TABLE IF NOT EXISTS order_items (
      id VARCHAR(128) PRIMARY KEY,
      order_id VARCHAR(128) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id VARCHAR(128),
      description TEXT NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      notes TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

    CREATE TABLE IF NOT EXISTS inquiries (
      id VARCHAR(128) PRIMARY KEY,
      customer_id VARCHAR(128),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      phone VARCHAR(64),
      company_name VARCHAR(255),
      product_category VARCHAR(128),
      message TEXT NOT NULL,
      file_reference TEXT,
      status VARCHAR(64) NOT NULL DEFAULT 'NEW',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_inquiries_customer_id ON inquiries(customer_id);

    CREATE TABLE IF NOT EXISTS audit_logs (
      id VARCHAR(128) PRIMARY KEY,
      user_id VARCHAR(128),
      user_name VARCHAR(255),
      action VARCHAR(128) NOT NULL,
      entity VARCHAR(128) NOT NULL,
      entity_id VARCHAR(128),
      details TEXT,
      ip_address VARCHAR(64),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
  `;

  try {
    const p = getPostgresPool();
    await p.query(ddl);
    schemaInitialized = true;
  } catch (err: any) {
    console.error("[PostgreSQL Schema Init Error]:", err.message);
  }
}
