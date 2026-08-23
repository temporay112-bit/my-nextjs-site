-- SLOTS SPORTSWEAR — PostgreSQL Production Database Schema
-- Compatible with PostgreSQL 13+, Neon, Supabase, Vercel Postgres, AWS RDS

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(128) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
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

-- 2. Customer Profiles Table
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

-- 3. Verification Tokens Table
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

-- 4. Password Reset Tokens Table
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

-- 5. Categories Table
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

-- 6. Products Table
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

-- 7. Orders Table
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

-- 8. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id VARCHAR(128) PRIMARY KEY,
  order_id VARCHAR(128) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id VARCHAR(128),
  description TEXT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- 9. Inquiries Table
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

-- 10. Audit Logs Table
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
