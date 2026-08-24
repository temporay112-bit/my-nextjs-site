import fs from "fs";
import path from "path";
import { loadEnvConfig } from "@next/env";

try {
  loadEnvConfig(process.cwd());
} catch {}

import { getPostgresPool, initPostgresSchema, isPostgresConfigured } from "./postgres";
import type { DatabaseSchema } from "./types";

export async function migrateJsonToPostgres(): Promise<{
  success: boolean;
  counts: {
    users: number;
    customerProfiles: number;
    categories: number;
    products: number;
    orders: number;
    inquiries: number;
    auditLogs: number;
  };
  error?: string;
}> {
  if (!isPostgresConfigured()) {
    return {
      success: false,
      counts: {
        users: 0,
        customerProfiles: 0,
        categories: 0,
        products: 0,
        orders: 0,
        inquiries: 0,
        auditLogs: 0,
      },
      error: "DATABASE_URL / POSTGRES_URL is not configured in environment.",
    };
  }

  await initPostgresSchema();
  const pool = getPostgresPool();

  const dbFile = path.resolve(process.cwd(), "data/slots_db.json");
  if (!fs.existsSync(dbFile)) {
    return {
      success: false,
      counts: {
        users: 0,
        customerProfiles: 0,
        categories: 0,
        products: 0,
        orders: 0,
        inquiries: 0,
        auditLogs: 0,
      },
      error: `Source JSON database file not found at ${dbFile}`,
    };
  }

  const raw = fs.readFileSync(dbFile, "utf-8");
  const data: DatabaseSchema = JSON.parse(raw);

  const counts = {
    users: 0,
    customerProfiles: 0,
    categories: 0,
    products: 0,
    orders: 0,
    inquiries: 0,
    auditLogs: 0,
  };

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Migrate Users
    if (data.users && data.users.length > 0) {
      for (const u of data.users) {
        const cleanEmail = u.email ? u.email.toLowerCase().trim() : null;
        if (cleanEmail) {
          await client.query(
            `INSERT INTO users (id, name, email, phone, password_hash, role, status, email_verified, reset_token, reset_token_expires_at, created_at, updated_at, last_login_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
             ON CONFLICT (email) DO UPDATE SET
               name = EXCLUDED.name,
               phone = EXCLUDED.phone,
               password_hash = EXCLUDED.password_hash,
               role = EXCLUDED.role,
               status = EXCLUDED.status,
               email_verified = EXCLUDED.email_verified,
               updated_at = EXCLUDED.updated_at,
               last_login_at = EXCLUDED.last_login_at`,
            [
              u.id,
              u.name,
              cleanEmail,
              u.phone || null,
              u.passwordHash,
              u.role || "CUSTOMER",
              u.status || "ACTIVE",
              Boolean(u.emailVerified),
              u.resetToken || null,
              u.resetTokenExpiresAt || null,
              u.createdAt || new Date().toISOString(),
              u.updatedAt || new Date().toISOString(),
              u.lastLoginAt || null,
            ]
          );
        } else {
          await client.query(
            `INSERT INTO users (id, name, email, phone, password_hash, role, status, email_verified, reset_token, reset_token_expires_at, created_at, updated_at, last_login_at)
             VALUES ($1, $2, NULL, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
             ON CONFLICT (id) DO UPDATE SET
               name = EXCLUDED.name,
               phone = EXCLUDED.phone,
               password_hash = EXCLUDED.password_hash,
               role = EXCLUDED.role,
               status = EXCLUDED.status,
               email_verified = EXCLUDED.email_verified,
               updated_at = EXCLUDED.updated_at,
               last_login_at = EXCLUDED.last_login_at`,
            [
              u.id,
              u.name,
              u.phone || null,
              u.passwordHash,
              u.role || "CUSTOMER",
              u.status || "ACTIVE",
              Boolean(u.emailVerified),
              u.resetToken || null,
              u.resetTokenExpiresAt || null,
              u.createdAt || new Date().toISOString(),
              u.updatedAt || new Date().toISOString(),
              u.lastLoginAt || null,
            ]
          );
        }
        counts.users++;
      }
    }

    // 2. Migrate Customer Profiles
    if (data.customerProfiles && data.customerProfiles.length > 0) {
      for (const p of data.customerProfiles) {
        const userCheck = await client.query("SELECT 1 FROM users WHERE id = $1", [p.userId]);
        if (userCheck.rows.length === 0) continue;

        await client.query(
          `INSERT INTO customer_profiles (id, user_id, company_name, phone, country, notes, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (user_id) DO UPDATE SET
             company_name = EXCLUDED.company_name,
             phone = EXCLUDED.phone,
             country = EXCLUDED.country,
             notes = EXCLUDED.notes,
             updated_at = EXCLUDED.updated_at`,
          [
            p.id,
            p.userId,
            p.companyName || null,
            p.phone || null,
            p.country || null,
            p.notes || null,
            p.createdAt || new Date().toISOString(),
            p.updatedAt || new Date().toISOString(),
          ]
        );
        counts.customerProfiles++;
      }
    }

    // 3. Migrate Categories
    if (data.categories && data.categories.length > 0) {
      for (const c of data.categories) {
        await client.query(
          `INSERT INTO categories (id, name, slug, parent_id, description, image, sort_order, published, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
           ON CONFLICT (slug) DO UPDATE SET
             name = EXCLUDED.name,
             parent_id = EXCLUDED.parent_id,
             description = EXCLUDED.description,
             image = EXCLUDED.image,
             sort_order = EXCLUDED.sort_order,
             published = EXCLUDED.published,
             updated_at = EXCLUDED.updated_at`,
          [
            c.id,
            c.name,
            c.slug,
            c.parentId || null,
            c.description || null,
            c.image || null,
            c.sortOrder || 0,
            c.published !== false,
            c.createdAt || new Date().toISOString(),
            c.updatedAt || new Date().toISOString(),
          ]
        );
        counts.categories++;
      }
    }

    // 4. Migrate Products
    if (data.products && data.products.length > 0) {
      for (const prod of data.products) {
        await client.query(
          `INSERT INTO products (id, name, slug, category_id, subcategory_id, description, image, gallery, specifications, min_order_quantity, lead_time, featured, published, sort_order, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
           ON CONFLICT (slug) DO UPDATE SET
             name = EXCLUDED.name,
             category_id = EXCLUDED.category_id,
             subcategory_id = EXCLUDED.subcategory_id,
             description = EXCLUDED.description,
             image = EXCLUDED.image,
             gallery = EXCLUDED.gallery,
             specifications = EXCLUDED.specifications,
             min_order_quantity = EXCLUDED.min_order_quantity,
             lead_time = EXCLUDED.lead_time,
             featured = EXCLUDED.featured,
             published = EXCLUDED.published,
             sort_order = EXCLUDED.sort_order,
             updated_at = EXCLUDED.updated_at`,
          [
            prod.id,
            prod.name,
            prod.slug,
            prod.categoryId,
            prod.subcategoryId || null,
            prod.description || null,
            prod.image,
            JSON.stringify(prod.gallery || []),
            JSON.stringify(prod.specifications || {}),
            JSON.stringify(prod.minOrderQuantity || null),
            prod.leadTime || null,
            Boolean(prod.featured),
            prod.published !== false,
            prod.sortOrder || 0,
            prod.createdAt || new Date().toISOString(),
            prod.updatedAt || new Date().toISOString(),
          ]
        );
        counts.products++;
      }
    }

    // 5. Migrate Orders
    if (data.orders && data.orders.length > 0) {
      for (const o of data.orders) {
        await client.query(
          `INSERT INTO orders (id, customer_id, customer_name, customer_email, customer_phone, company_name, status, reference, notes, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           ON CONFLICT (id) DO UPDATE SET
             status = EXCLUDED.status,
             notes = EXCLUDED.notes,
             updated_at = EXCLUDED.updated_at`,
          [
            o.id,
            o.customerId || null,
            o.customerName || null,
            o.customerEmail || null,
            o.customerPhone || null,
            o.companyName || null,
            o.status || "NEW",
            o.reference || null,
            o.notes || null,
            o.createdAt || new Date().toISOString(),
            o.updatedAt || new Date().toISOString(),
          ]
        );
        counts.orders++;
      }
    }

    // 6. Migrate Inquiries
    if (data.inquiries && data.inquiries.length > 0) {
      for (const inq of data.inquiries) {
        await client.query(
          `INSERT INTO inquiries (id, customer_id, name, email, phone, company_name, product_category, message, file_reference, status, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
           ON CONFLICT (id) DO UPDATE SET
             status = EXCLUDED.status,
             updated_at = EXCLUDED.updated_at`,
          [
            inq.id,
            inq.customerId || null,
            inq.name,
            inq.email || null,
            inq.phone || null,
            inq.companyName || inq.company || null,
            inq.productCategory || null,
            inq.message || "",
            inq.fileReference || null,
            inq.status || "NEW",
            inq.createdAt || new Date().toISOString(),
            inq.updatedAt || new Date().toISOString(),
          ]
        );
        counts.inquiries++;
      }
    }

    // 7. Migrate Audit Logs
    if (data.auditLogs && data.auditLogs.length > 0) {
      for (const log of data.auditLogs) {
        await client.query(
          `INSERT INTO audit_logs (id, user_id, user_name, action, entity, entity_id, details, ip_address, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           ON CONFLICT (id) DO NOTHING`,
          [
            log.id,
            log.userId || null,
            log.userName || null,
            log.action,
            log.entity,
            log.entityId || null,
            log.details || null,
            log.ipAddress || null,
            log.createdAt || new Date().toISOString(),
          ]
        );
        counts.auditLogs++;
      }
    }

    await client.query("COMMIT");

    return {
      success: true,
      counts,
    };
  } catch (err: any) {
    await client.query("ROLLBACK");
    return {
      success: false,
      counts,
      error: err.message,
    };
  } finally {
    client.release();
  }
}

if (require.main === module) {
  migrateJsonToPostgres()
    .then((res) => {
      console.log("[Migration Result]:", JSON.stringify(res, null, 2));
      process.exit(res.success ? 0 : 1);
    })
    .catch((err) => {
      console.error("[Migration Error]:", err);
      process.exit(1);
    });
}
