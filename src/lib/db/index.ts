import fs from "fs";
import path from "path";
import { randomBytes, scryptSync } from "crypto";
import { loadEnvConfig } from "@next/env";

try {
  loadEnvConfig(process.cwd());
} catch {}

import type {
  User,
  UserRole,
  UserStatus,
  CustomerProfile,
  Category,
  Product,
  Order,
  OrderItem,
  OrderStatus,
  Inquiry,
  AuditLog,
  DatabaseSchema,
  VerificationToken,
  PasswordResetToken,
} from "./types";

import {
  isPostgresConfigured,
  getPostgresPool,
  initPostgresSchema,
} from "./postgres";

export type {
  User,
  UserRole,
  UserStatus,
  CustomerProfile,
  Category,
  Product,
  Order,
  OrderItem,
  OrderStatus,
  Inquiry,
  AuditLog,
  DatabaseSchema,
  VerificationToken,
  PasswordResetToken,
} from "./types";

import { parseInquiryFiles } from "../validations";
import { getSeedData } from "./seed";

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "slots_db.json");

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

function getInitialFallbackSchema(): DatabaseSchema {
  const seed = getSeedData();
  const adminIndex = seed.users.findIndex((u) => u.email === "shahrangujjar00@gmail.com");
  if (adminIndex === -1) {
    seed.users.unshift({
      id: "usr_admin_default",
      name: "Slots Administrator",
      email: "shahrangujjar00@gmail.com",
      phone: "+923001234567",
      passwordHash: hashPassword("Admin@Slots2026"),
      role: "ADMIN",
      status: "ACTIVE",
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  return seed;
}

function mapProductRow(r: any): Product {
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    categoryId: r.category_id || r.categoryId,
    subcategoryId: r.subcategory_id || r.subcategoryId || undefined,
    description: r.description || "",
    image: r.image,
    gallery: typeof r.gallery === "string" ? JSON.parse(r.gallery || "[]") : (r.gallery || []),
    specifications: typeof r.specifications === "string" ? JSON.parse(r.specifications || "{}") : (r.specifications || {}),
    minOrderQuantity: typeof r.min_order_quantity === "string" ? JSON.parse(r.min_order_quantity) : (r.min_order_quantity || r.minOrderQuantity || undefined),
    leadTime: r.lead_time || r.leadTime || undefined,
    featured: Boolean(r.featured),
    published: r.published !== false,
    sortOrder: Number(r.sort_order ?? r.sortOrder ?? 0),
    createdAt: r.created_at || r.createdAt,
    updatedAt: r.updated_at || r.updatedAt,
  };
}

function mapCategoryRow(r: any): Category {
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    parentId: r.parent_id || r.parentId || null,
    description: r.description || undefined,
    image: r.image || undefined,
    sortOrder: Number(r.sort_order ?? r.sortOrder ?? 0),
    published: r.published !== false,
    createdAt: r.created_at || r.createdAt,
    updatedAt: r.updated_at || r.updatedAt,
  };
}

function mapUserRow(r: any): User {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone || undefined,
    passwordHash: r.password_hash || r.passwordHash,
    role: (r.role || "CUSTOMER") as UserRole,
    status: (r.status || "ACTIVE") as UserStatus,
    emailVerified: Boolean(r.email_verified ?? r.emailVerified),
    resetToken: r.reset_token || r.resetToken || undefined,
    resetTokenExpiresAt: r.reset_token_expires_at || r.resetTokenExpiresAt || undefined,
    createdAt: r.created_at ? new Date(r.created_at).toISOString() : r.createdAt,
    updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : r.updatedAt,
    lastLoginAt: r.last_login_at ? new Date(r.last_login_at).toISOString() : r.lastLoginAt || undefined,
  };
}

function mapVerificationTokenRow(r: any): VerificationToken {
  return {
    id: r.id,
    userId: r.user_id || r.userId,
    identifier: r.identifier || r.user_id || r.userId,
    tokenHash: r.token_hash || r.tokenHash,
    token: r.token || r.token_hash || r.tokenHash,
    expiresAt: r.expires_at ? new Date(r.expires_at).toISOString() : r.expiresAt,
    expires: r.expires ? new Date(r.expires).toISOString() : r.expiresAt,
    usedAt: r.used_at ? new Date(r.used_at).toISOString() : r.usedAt || null,
    createdAt: r.created_at ? new Date(r.created_at).toISOString() : r.createdAt,
  };
}

function mapPasswordResetTokenRow(r: any): PasswordResetToken {
  return {
    id: r.id,
    userId: r.user_id || r.userId,
    tokenHash: r.token_hash || r.tokenHash,
    expiresAt: r.expires_at ? new Date(r.expires_at).toISOString() : r.expiresAt,
    usedAt: r.used_at ? new Date(r.used_at).toISOString() : r.usedAt || null,
    createdAt: r.created_at ? new Date(r.created_at).toISOString() : r.createdAt,
  };
}

function mapInquiryRow(r: any): Inquiry {
  const parsedFiles = parseInquiryFiles(r.file_reference || r.fileReference);
  return {
    id: r.id,
    customerId: r.customer_id || r.customerId || undefined,
    name: r.name,
    email: r.email || undefined,
    phone: r.phone || undefined,
    companyName: r.company_name || r.companyName || r.company || undefined,
    company: r.company_name || r.companyName || r.company || undefined,
    productCategory: r.product_category || r.productCategory || undefined,
    message: r.message || "",
    fileReference: r.file_reference || r.fileReference || undefined,
    files: parsedFiles.length > 0 ? parsedFiles : undefined,
    status: r.status || "NEW",
    createdAt: r.created_at ? new Date(r.created_at).toISOString() : r.createdAt,
    updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : r.updatedAt,
  };
}

/**
 * Universal Database Service with seamless dual-engine support:
 * 1. Persistent Managed PostgreSQL when DATABASE_URL is configured (Production).
 * 2. High-performance JSON file storage when offline / local fallback (Development).
 */
class DatabaseService {
  private data: DatabaseSchema | null = null;
  private lastMtime: number = 0;
  private postgresInitialized = false;

  public ensureInitialized(forceReload = false): DatabaseSchema {
    let shouldReload = forceReload || !this.data;

    try {
      if (fs.existsSync(DB_FILE)) {
        const stats = fs.statSync(DB_FILE);
        if (stats.mtimeMs > this.lastMtime) {
          shouldReload = true;
        }
      }
    } catch {}

    if (!shouldReload && this.data) return this.data;

    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const stats = fs.statSync(DB_FILE);
        this.lastMtime = stats.mtimeMs;
        const raw = fs.readFileSync(DB_FILE, "utf-8");
        this.data = JSON.parse(raw);
        if (!this.data) this.data = getInitialFallbackSchema();
        if (!this.data.users) this.data.users = [];
        if (!this.data.customerProfiles) this.data.customerProfiles = [];
        if (!this.data.categories) this.data.categories = [];
        if (!this.data.products) this.data.products = [];
        if (!this.data.orders) this.data.orders = [];
        if (!this.data.orderItems) this.data.orderItems = [];
        if (!this.data.inquiries) this.data.inquiries = [];
        if (!this.data.auditLogs) this.data.auditLogs = [];
        if (!this.data.verificationTokens) this.data.verificationTokens = [];
        if (!this.data.passwordResetTokens) this.data.passwordResetTokens = [];
      } else {
        this.data = getInitialFallbackSchema();
        this.save();
      }
    } catch {
      this.data = getInitialFallbackSchema();
      try {
        this.save();
      } catch {}
    }

    if (isPostgresConfigured() && !this.postgresInitialized) {
      this.postgresInitialized = true;
      initPostgresSchema().catch(() => {});
    }

    return this.data!;
  }

  /**
   * Atomic persistence with fsync for file storage + async write-through to PostgreSQL
   */
  public save(): void {
    if (!this.data) return;
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      const tempFile = `${DB_FILE}.tmp.${Date.now()}.${Math.random().toString(36).substring(2, 6)}`;
      const fd = fs.openSync(tempFile, "w");
      const content = Buffer.from(JSON.stringify(this.data, null, 2), "utf-8");
      fs.writeSync(fd, content, 0, content.length, null);
      fs.fsyncSync(fd);
      fs.closeSync(fd);

      try {
        fs.renameSync(tempFile, DB_FILE);
      } catch {
        fs.copyFileSync(tempFile, DB_FILE);
        fs.unlinkSync(tempFile);
      }

      try {
        if (fs.existsSync(DB_FILE)) {
          this.lastMtime = fs.statSync(DB_FILE).mtimeMs;
        }
      } catch {}
    } catch (err) {
      console.error("[DatabaseService] Atomic Save Error:", err);
    }
  }

  // ── USERS ──────────────────────────────────────────────────────────────────
  public getUsers(): User[] {
    return this.ensureInitialized().users;
  }

  public findUserById(id: string): User | undefined {
    return this.getUsers().find((u) => u.id === id);
  }

  public async findUserByIdAsync(id: string): Promise<User | undefined> {
    if (isPostgresConfigured()) {
      try {
        const pool = getPostgresPool();
        const res = await pool.query("SELECT * FROM users WHERE id = $1 LIMIT 1", [id]);
        if (res.rows && res.rows.length > 0) {
          return mapUserRow(res.rows[0]);
        }
      } catch (err) {
        console.error("[DatabaseService] findUserByIdAsync error:", err);
      }
    }
    return this.findUserById(id);
  }

  public getUserById(id: string): User | undefined {
    return this.findUserById(id);
  }

  public async getUserByIdAsync(id: string): Promise<User | undefined> {
    return this.findUserByIdAsync(id);
  }

  public findUserByEmail(email: string): User | undefined {
    const clean = email.trim().toLowerCase();
    return this.getUsers().find((u) => u.email && u.email.toLowerCase() === clean);
  }

  public async findUserByEmailAsync(email: string): Promise<User | undefined> {
    if (isPostgresConfigured()) {
      try {
        const clean = email.trim().toLowerCase();
        const pool = getPostgresPool();
        const res = await pool.query("SELECT * FROM users WHERE LOWER(email) = $1 LIMIT 1", [clean]);
        if (res.rows && res.rows.length > 0) {
          return mapUserRow(res.rows[0]);
        }
      } catch (err) {
        console.error("[DatabaseService] findUserByEmailAsync error:", err);
      }
    }
    return this.findUserByEmail(email);
  }

  public getUserByEmailOrPhone(identifier: string): User | undefined {
    const clean = identifier.trim().toLowerCase();
    const cleanPhone = identifier.replace(/\s+/g, "");
    return this.getUsers().find(
      (u) =>
        (u.email && u.email.toLowerCase() === clean) ||
        (u.phone && u.phone.replace(/\s+/g, "") === cleanPhone)
    );
  }

  public async getUserByEmailOrPhoneAsync(identifier: string): Promise<User | undefined> {
    if (isPostgresConfigured()) {
      try {
        const clean = identifier.trim().toLowerCase();
        const cleanPhone = identifier.replace(/\s+/g, "");
        const pool = getPostgresPool();
        const res = await pool.query(
          "SELECT * FROM users WHERE LOWER(email) = $1 OR (phone IS NOT NULL AND REPLACE(phone, ' ', '') = $2) LIMIT 1",
          [clean, cleanPhone]
        );
        if (res.rows && res.rows.length > 0) {
          return mapUserRow(res.rows[0]);
        }
      } catch (err) {
        console.error("[DatabaseService] getUserByEmailOrPhoneAsync error:", err);
      }
    }
    return this.getUserByEmailOrPhone(identifier);
  }

  public getUserByResetToken(token: string): User | undefined {
    const now = new Date().toISOString();
    return this.getUsers().find(
      (u) => u.resetToken === token && u.resetTokenExpiresAt && u.resetTokenExpiresAt > now
    );
  }

  public createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): User {
    const db = this.ensureInitialized();
    const now = new Date().toISOString();
    const newUser: User = {
      ...user,
      id: `usr_${Date.now()}_${randomBytes(4).toString("hex")}`,
      createdAt: now,
      updatedAt: now,
    };
    db.users.push(newUser);
    this.save();

    if (isPostgresConfigured()) {
      const pool = getPostgresPool();
      pool.query(
        `INSERT INTO users (id, name, email, phone, password_hash, role, status, email_verified, reset_token, reset_token_expires_at, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         ON CONFLICT (email) DO UPDATE SET
           name = EXCLUDED.name,
           phone = EXCLUDED.phone,
           password_hash = EXCLUDED.password_hash,
           role = EXCLUDED.role,
           status = EXCLUDED.status,
           email_verified = EXCLUDED.email_verified,
           updated_at = EXCLUDED.updated_at`,
        [
          newUser.id,
          newUser.name,
          newUser.email.toLowerCase().trim(),
          newUser.phone || null,
          newUser.passwordHash,
          newUser.role,
          newUser.status,
          newUser.emailVerified,
          newUser.resetToken || null,
          newUser.resetTokenExpiresAt || null,
          newUser.createdAt,
          newUser.updatedAt,
        ]
      ).catch((e) => console.error("[PG Write Error]:", e.message));
    }

    return newUser;
  }

  public updateUser(id: string, updates: Partial<User>): User | undefined {
    const db = this.ensureInitialized();
    const index = db.users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;
    const now = new Date().toISOString();
    db.users[index] = {
      ...db.users[index],
      ...updates,
      updatedAt: now,
    };
    this.save();

    if (isPostgresConfigured()) {
      const u = db.users[index];
      const pool = getPostgresPool();
      pool.query(
        `UPDATE users SET
           name = $1,
           phone = $2,
           password_hash = $3,
           role = $4,
           status = $5,
           email_verified = $6,
           reset_token = $7,
           reset_token_expires_at = $8,
           updated_at = $9,
           last_login_at = $10
         WHERE id = $11`,
        [
          u.name,
          u.phone || null,
          u.passwordHash,
          u.role,
          u.status,
          u.emailVerified,
          u.resetToken || null,
          u.resetTokenExpiresAt || null,
          u.updatedAt,
          u.lastLoginAt || null,
          u.id,
        ]
      ).catch((e) => console.error("[PG Update User Error]:", e.message));
    }

    return db.users[index];
  }

  public async updateUserAsync(id: string, updates: Partial<User>): Promise<User | undefined> {
    const db = this.ensureInitialized();
    const index = db.users.findIndex((u) => u.id === id);
    const now = new Date().toISOString();
    if (index !== -1) {
      db.users[index] = {
        ...db.users[index],
        ...updates,
        updatedAt: now,
      };
      this.save();
    }

    if (isPostgresConfigured()) {
      try {
        const pool = getPostgresPool();
        const user = await this.findUserByIdAsync(id);
        if (user) {
          const merged: User = { ...user, ...updates, updatedAt: now };
          await pool.query(
            `UPDATE users SET
               name = $1,
               phone = $2,
               password_hash = $3,
               role = $4,
               status = $5,
               email_verified = $6,
               reset_token = $7,
               reset_token_expires_at = $8,
               updated_at = $9,
               last_login_at = $10
             WHERE id = $11`,
            [
              merged.name,
              merged.phone || null,
              merged.passwordHash,
              merged.role,
              merged.status,
              merged.emailVerified,
              merged.resetToken || null,
              merged.resetTokenExpiresAt || null,
              merged.updatedAt,
              merged.lastLoginAt || null,
              id,
            ]
          );
          return merged;
        }
      } catch (err) {
        console.error("[DatabaseService] updateUserAsync error:", err);
      }
    }

    return index !== -1 ? db.users[index] : undefined;
  }

  public setResetToken(userId: string, token: string, expiresAt: string): boolean {
    return Boolean(this.updateUser(userId, { resetToken: token, resetTokenExpiresAt: expiresAt }));
  }

  public clearResetToken(userId: string): boolean {
    return Boolean(this.updateUser(userId, { resetToken: undefined, resetTokenExpiresAt: undefined }));
  }

  public deleteUser(id: string): boolean {
    const db = this.ensureInitialized();
    const before = db.users.length;
    db.users = db.users.filter((u) => u.id !== id);
    if (db.users.length !== before) {
      this.save();
      if (isPostgresConfigured()) {
        getPostgresPool().query("DELETE FROM users WHERE id = $1", [id]).catch(() => {});
      }
      return true;
    }
    return false;
  }

  public verifyUserEmail(email: string): User | undefined {
    const db = this.ensureInitialized();
    const clean = email.trim().toLowerCase();
    const index = db.users.findIndex((u) => u.email && u.email.toLowerCase() === clean);
    if (index === -1) return undefined;
    const now = new Date().toISOString();
    db.users[index] = {
      ...db.users[index],
      emailVerified: true,
      updatedAt: now,
    };
    this.save();

    if (isPostgresConfigured()) {
      getPostgresPool().query("UPDATE users SET email_verified = true, updated_at = $1 WHERE email = $2", [
        now,
        clean,
      ]).catch(() => {});
    }

    return db.users[index];
  }

  // ── CUSTOMER PROFILES ────────────────────────────────────────────────────────
  public getProfiles(): CustomerProfile[] {
    return this.ensureInitialized().customerProfiles;
  }

  public findCustomerProfileByUserId(userId: string): CustomerProfile | undefined {
    return this.getProfiles().find((p) => p.userId === userId);
  }

  public getProfileByUserId(userId: string): CustomerProfile | undefined {
    return this.findCustomerProfileByUserId(userId);
  }

  public upsertProfile(userId: string, data: Partial<Omit<CustomerProfile, "id" | "userId" | "createdAt" | "updatedAt">>): CustomerProfile {
    const db = this.ensureInitialized();
    const now = new Date().toISOString();
    const index = db.customerProfiles.findIndex((p) => p.userId === userId);

    let resultProfile: CustomerProfile;

    if (index >= 0) {
      db.customerProfiles[index] = {
        ...db.customerProfiles[index],
        ...data,
        updatedAt: now,
      };
      this.save();
      resultProfile = db.customerProfiles[index];
    } else {
      const newProfile: CustomerProfile = {
        id: `prof_${Date.now()}_${randomBytes(4).toString("hex")}`,
        userId,
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      db.customerProfiles.push(newProfile);
      this.save();
      resultProfile = newProfile;
    }

    if (isPostgresConfigured()) {
      getPostgresPool().query(
        `INSERT INTO customer_profiles (id, user_id, company_name, phone, country, notes, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (user_id) DO UPDATE SET
           company_name = EXCLUDED.company_name,
           phone = EXCLUDED.phone,
           country = EXCLUDED.country,
           notes = EXCLUDED.notes,
           updated_at = EXCLUDED.updated_at`,
        [
          resultProfile.id,
          resultProfile.userId,
          resultProfile.companyName || null,
          resultProfile.phone || null,
          resultProfile.country || null,
          resultProfile.notes || null,
          resultProfile.createdAt,
          resultProfile.updatedAt,
        ]
      ).catch(() => {});
    }

    return resultProfile;
  }

  // ── VERIFICATION TOKENS ──────────────────────────────────────────────────────
  public createVerificationToken(userIdOrIdentifier: string, tokenHash: string, expiresAt: string): VerificationToken {
    const db = this.ensureInitialized(true);
    if (!db.verificationTokens) db.verificationTokens = [];
    db.verificationTokens = db.verificationTokens.filter(
      (t) => (t.userId !== userIdOrIdentifier && t.identifier !== userIdOrIdentifier) || t.usedAt !== null
    );

    const now = new Date().toISOString();
    const newToken: VerificationToken = {
      id: `vtok_${Date.now()}_${randomBytes(4).toString("hex")}`,
      userId: userIdOrIdentifier,
      identifier: userIdOrIdentifier,
      tokenHash,
      token: tokenHash,
      expiresAt,
      expires: expiresAt,
      usedAt: null,
      createdAt: now,
    };
    db.verificationTokens.push(newToken);
    this.save();

    if (isPostgresConfigured()) {
      getPostgresPool().query(
        `INSERT INTO verification_tokens (id, user_id, token_hash, expires_at, used_at, created_at)
         VALUES ($1, $2, $3, $4, NULL, $5)`,
        [newToken.id, newToken.userId, newToken.tokenHash, newToken.expiresAt, newToken.createdAt]
      ).catch(() => {});
    }

    return newToken;
  }

  public async createVerificationTokenAsync(
    userIdOrIdentifier: string,
    tokenHash: string,
    expiresAt: string
  ): Promise<VerificationToken> {
    const now = new Date().toISOString();
    const newToken: VerificationToken = {
      id: `vtok_${Date.now()}_${randomBytes(4).toString("hex")}`,
      userId: userIdOrIdentifier,
      identifier: userIdOrIdentifier,
      tokenHash,
      token: tokenHash,
      expiresAt,
      expires: expiresAt,
      usedAt: null,
      createdAt: now,
    };

    const db = this.ensureInitialized(true);
    if (!db.verificationTokens) db.verificationTokens = [];
    db.verificationTokens = db.verificationTokens.filter(
      (t) => (t.userId !== userIdOrIdentifier && t.identifier !== userIdOrIdentifier) || t.usedAt !== null
    );
    db.verificationTokens.push(newToken);
    this.save();

    if (isPostgresConfigured()) {
      try {
        const pool = getPostgresPool();
        await pool.query(
          `INSERT INTO verification_tokens (id, user_id, token_hash, expires_at, used_at, created_at)
           VALUES ($1, $2, $3, $4, NULL, $5)`,
          [newToken.id, newToken.userId, newToken.tokenHash, newToken.expiresAt, newToken.createdAt]
        );
      } catch (err) {
        console.error("[DatabaseService] createVerificationTokenAsync error:", err);
      }
    }

    return newToken;
  }

  public findVerificationTokenByHash(tokenHash: string): VerificationToken | undefined {
    const db = this.ensureInitialized(true);
    if (!db.verificationTokens) return undefined;
    return db.verificationTokens.find((t) => t.tokenHash === tokenHash || (t as any).token === tokenHash);
  }

  public async findVerificationTokenByHashAsync(tokenHash: string): Promise<VerificationToken | undefined> {
    if (isPostgresConfigured()) {
      try {
        const pool = getPostgresPool();
        const res = await pool.query(
          "SELECT * FROM verification_tokens WHERE token_hash = $1 ORDER BY created_at DESC LIMIT 1",
          [tokenHash]
        );
        if (res.rows && res.rows.length > 0) {
          return mapVerificationTokenRow(res.rows[0]);
        }
      } catch (err) {
        console.error("[DatabaseService] findVerificationTokenByHashAsync error:", err);
      }
    }
    return this.findVerificationTokenByHash(tokenHash);
  }

  public markVerificationTokenUsed(tokenHash: string): boolean {
    const db = this.ensureInitialized(true);
    if (!db.verificationTokens) return false;
    const index = db.verificationTokens.findIndex((t) => t.tokenHash === tokenHash || (t as any).token === tokenHash);
    if (index === -1) return false;
    const now = new Date().toISOString();
    db.verificationTokens[index].usedAt = now;
    this.save();

    if (isPostgresConfigured()) {
      getPostgresPool().query(
        "UPDATE verification_tokens SET used_at = $1 WHERE token_hash = $2",
        [now, tokenHash]
      ).catch(() => {});
    }

    return true;
  }

  public async markVerificationTokenUsedAsync(tokenHash: string): Promise<boolean> {
    const now = new Date().toISOString();
    this.markVerificationTokenUsed(tokenHash);

    if (isPostgresConfigured()) {
      try {
        const pool = getPostgresPool();
        await pool.query(
          "UPDATE verification_tokens SET used_at = $1 WHERE token_hash = $2 OR id = $2",
          [now, tokenHash]
        );
        return true;
      } catch (err) {
        console.error("[DatabaseService] markVerificationTokenUsedAsync error:", err);
      }
    }
    return true;
  }

  public getVerificationToken(tokenHash: string): VerificationToken | undefined {
    return this.findVerificationTokenByHash(tokenHash);
  }

  public deleteVerificationToken(tokenHash: string): void {
    const db = this.ensureInitialized(true);
    if (!db.verificationTokens) return;
    db.verificationTokens = db.verificationTokens.filter((t) => t.tokenHash !== tokenHash && (t as any).token !== tokenHash);
    this.save();

    if (isPostgresConfigured()) {
      getPostgresPool().query("DELETE FROM verification_tokens WHERE token_hash = $1", [tokenHash]).catch(() => {});
    }
  }

  // ── PASSWORD RESET TOKENS ───────────────────────────────────────────────────
  public createPasswordResetToken(userId: string, tokenHash: string, expiresAt: string): PasswordResetToken {
    const db = this.ensureInitialized(true);
    if (!db.passwordResetTokens) db.passwordResetTokens = [];
    db.passwordResetTokens = db.passwordResetTokens.filter((t) => t.userId !== userId || t.usedAt !== null);

    const now = new Date().toISOString();
    const newToken: PasswordResetToken = {
      id: `prtok_${Date.now()}_${randomBytes(4).toString("hex")}`,
      userId,
      tokenHash,
      expiresAt,
      usedAt: null,
      createdAt: now,
    };
    db.passwordResetTokens.push(newToken);
    this.save();

    if (isPostgresConfigured()) {
      getPostgresPool().query(
        `INSERT INTO password_reset_tokens (id, user_id, token_hash, expires_at, used_at, created_at)
         VALUES ($1, $2, $3, $4, NULL, $5)`,
        [newToken.id, newToken.userId, newToken.tokenHash, newToken.expiresAt, newToken.createdAt]
      ).catch(() => {});
    }

    return newToken;
  }

  public async createPasswordResetTokenAsync(
    userId: string,
    tokenHash: string,
    expiresAt: string
  ): Promise<PasswordResetToken> {
    const now = new Date().toISOString();
    const newToken: PasswordResetToken = {
      id: `prtok_${Date.now()}_${randomBytes(4).toString("hex")}`,
      userId,
      tokenHash,
      expiresAt,
      usedAt: null,
      createdAt: now,
    };

    const db = this.ensureInitialized(true);
    if (!db.passwordResetTokens) db.passwordResetTokens = [];
    db.passwordResetTokens = db.passwordResetTokens.filter((t) => t.userId !== userId || t.usedAt !== null);
    db.passwordResetTokens.push(newToken);
    this.save();

    if (isPostgresConfigured()) {
      try {
        const pool = getPostgresPool();
        await pool.query(
          `INSERT INTO password_reset_tokens (id, user_id, token_hash, expires_at, used_at, created_at)
           VALUES ($1, $2, $3, $4, NULL, $5)`,
          [newToken.id, newToken.userId, newToken.tokenHash, newToken.expiresAt, newToken.createdAt]
        );
      } catch (err) {
        console.error("[DatabaseService] createPasswordResetTokenAsync error:", err);
      }
    }

    return newToken;
  }

  public findPasswordResetTokenByHash(tokenHash: string): PasswordResetToken | undefined {
    const db = this.ensureInitialized(true);
    if (!db.passwordResetTokens) return undefined;
    return db.passwordResetTokens.find((t) => t.tokenHash === tokenHash || (t as any).token === tokenHash);
  }

  public async findPasswordResetTokenByHashAsync(tokenHash: string): Promise<PasswordResetToken | undefined> {
    if (isPostgresConfigured()) {
      try {
        const pool = getPostgresPool();
        const res = await pool.query(
          "SELECT * FROM password_reset_tokens WHERE token_hash = $1 ORDER BY created_at DESC LIMIT 1",
          [tokenHash]
        );
        if (res.rows && res.rows.length > 0) {
          return mapPasswordResetTokenRow(res.rows[0]);
        }
      } catch (err) {
        console.error("[DatabaseService] findPasswordResetTokenByHashAsync error:", err);
      }
    }
    return this.findPasswordResetTokenByHash(tokenHash);
  }

  public markPasswordResetTokenUsed(id: string): boolean {
    const db = this.ensureInitialized(true);
    if (!db.passwordResetTokens) return false;
    const index = db.passwordResetTokens.findIndex((t) => t.id === id || t.tokenHash === id);
    if (index === -1) return false;
    const now = new Date().toISOString();
    db.passwordResetTokens[index].usedAt = now;
    this.save();

    if (isPostgresConfigured()) {
      getPostgresPool().query(
        "UPDATE password_reset_tokens SET used_at = $1 WHERE id = $2 OR token_hash = $2",
        [now, id]
      ).catch(() => {});
    }

    return true;
  }

  public async markPasswordResetTokenUsedAsync(id: string): Promise<boolean> {
    const now = new Date().toISOString();
    this.markPasswordResetTokenUsed(id);

    if (isPostgresConfigured()) {
      try {
        const pool = getPostgresPool();
        await pool.query(
          "UPDATE password_reset_tokens SET used_at = $1 WHERE id = $2 OR token_hash = $2",
          [now, id]
        );
        return true;
      } catch (err) {
        console.error("[DatabaseService] markPasswordResetTokenUsedAsync error:", err);
      }
    }
    return true;
  }

  // ── CATEGORIES ───────────────────────────────────────────────────────────────
  public getCategories(publishedOnly = true): Category[] {
    const list = this.ensureInitialized().categories;
    const filtered = publishedOnly ? list.filter((c) => c.published) : list;
    return filtered.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public async getCategoriesAsync(publishedOnly = true): Promise<Category[]> {
    if (isPostgresConfigured()) {
      try {
        const pool = getPostgresPool();
        const sql = publishedOnly
          ? "SELECT * FROM categories WHERE published = TRUE ORDER BY sort_order ASC, name ASC"
          : "SELECT * FROM categories ORDER BY sort_order ASC, name ASC";
        const res = await pool.query(sql);
        if (res.rows && res.rows.length > 0) {
          return res.rows.map(mapCategoryRow);
        }
      } catch (err) {
        console.error("[DatabaseService] getCategoriesAsync error:", err);
      }
    }
    return this.getCategories(publishedOnly);
  }

  public getCategoryById(id: string): Category | undefined {
    return this.ensureInitialized().categories.find((c) => c.id === id);
  }

  public async getCategoryByIdAsync(id: string): Promise<Category | undefined> {
    if (isPostgresConfigured()) {
      try {
        const pool = getPostgresPool();
        const res = await pool.query("SELECT * FROM categories WHERE id = $1 LIMIT 1", [id]);
        if (res.rows && res.rows.length > 0) {
          return mapCategoryRow(res.rows[0]);
        }
      } catch (err) {
        console.error("[DatabaseService] getCategoryByIdAsync error:", err);
      }
    }
    return this.getCategoryById(id);
  }

  public getCategoryBySlug(slug: string): Category | undefined {
    return this.ensureInitialized().categories.find((c) => c.slug === slug);
  }

  public async getCategoryBySlugAsync(slug: string): Promise<Category | undefined> {
    if (isPostgresConfigured()) {
      try {
        const pool = getPostgresPool();
        const res = await pool.query("SELECT * FROM categories WHERE slug = $1 LIMIT 1", [slug]);
        if (res.rows && res.rows.length > 0) {
          return mapCategoryRow(res.rows[0]);
        }
      } catch (err) {
        console.error("[DatabaseService] getCategoryBySlugAsync error:", err);
      }
    }
    return this.getCategoryBySlug(slug);
  }

  public createCategory(cat: Omit<Category, "id" | "createdAt" | "updatedAt">): Category {
    const db = this.ensureInitialized();
    const now = new Date().toISOString();
    const newCategory: Category = {
      ...cat,
      id: `cat_${Date.now()}_${randomBytes(4).toString("hex")}`,
      createdAt: now,
      updatedAt: now,
    };
    db.categories.push(newCategory);
    this.save();

    if (isPostgresConfigured()) {
      getPostgresPool().query(
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
          newCategory.id,
          newCategory.name,
          newCategory.slug,
          newCategory.parentId || null,
          newCategory.description || null,
          newCategory.image || null,
          newCategory.sortOrder || 0,
          newCategory.published !== false,
          newCategory.createdAt,
          newCategory.updatedAt,
        ]
      ).catch(() => {});
    }

    return newCategory;
  }

  public updateCategory(id: string, updates: Partial<Category>): Category | undefined {
    const db = this.ensureInitialized();
    const index = db.categories.findIndex((c) => c.id === id);
    if (index === -1) return undefined;
    const now = new Date().toISOString();
    db.categories[index] = {
      ...db.categories[index],
      ...updates,
      updatedAt: now,
    };
    this.save();

    if (isPostgresConfigured()) {
      const c = db.categories[index];
      getPostgresPool().query(
        `UPDATE categories SET
           name = $1,
           slug = $2,
           parent_id = $3,
           description = $4,
           image = $5,
           sort_order = $6,
           published = $7,
           updated_at = $8
         WHERE id = $9`,
        [
          c.name,
          c.slug,
          c.parentId || null,
          c.description || null,
          c.image || null,
          c.sortOrder || 0,
          c.published !== false,
          c.updatedAt,
          c.id,
        ]
      ).catch(() => {});
    }

    return db.categories[index];
  }

  public deleteCategory(id: string): boolean {
    const db = this.ensureInitialized();
    const before = db.categories.length;
    db.categories = db.categories.filter((c) => c.id !== id);
    if (db.categories.length !== before) {
      this.save();
      if (isPostgresConfigured()) {
        getPostgresPool().query("DELETE FROM categories WHERE id = $1", [id]).catch(() => {});
      }
      return true;
    }
    return false;
  }

  // ── PRODUCTS ─────────────────────────────────────────────────────────────────
  public getProducts(options?: {
    categoryId?: string;
    subcategoryId?: string;
    categorySlug?: string;
    search?: string;
    featured?: boolean;
    publishedOnly?: boolean;
    page?: number;
    limit?: number;
  }): { products: Product[]; total: number; page: number; totalPages: number } {
    let list = this.ensureInitialized().products;
    if (options?.publishedOnly !== false) {
      list = list.filter((p) => p.published);
    }
    if (options?.categorySlug) {
      const cat = this.getCategoryBySlug(options.categorySlug);
      if (cat) {
        list = list.filter((p) => p.categoryId === cat.id);
      }
    }
    if (options?.categoryId) {
      list = list.filter((p) => p.categoryId === options.categoryId);
    }
    if (options?.subcategoryId) {
      list = list.filter((p) => p.subcategoryId === options.subcategoryId);
    }
    if (options?.featured !== undefined) {
      list = list.filter((p) => p.featured === options.featured);
    }
    if (options?.search) {
      const q = options.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }
    list.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    const total = list.length;
    const page = options?.page || 1;
    const limit = options?.limit || (options?.page ? 20 : 1000);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const paginated = options?.limit ? list.slice((page - 1) * limit, page * limit) : list;
    return {
      products: paginated,
      total,
      page,
      totalPages,
    };
  }

  public async getProductsAsync(options?: {
    categoryId?: string;
    subcategoryId?: string;
    categorySlug?: string;
    search?: string;
    featured?: boolean;
    publishedOnly?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ products: Product[]; total: number; page: number; totalPages: number }> {
    if (isPostgresConfigured()) {
      try {
        const pool = getPostgresPool();
        const conditions: string[] = [];
        const params: any[] = [];
        let pIndex = 1;

        if (options?.publishedOnly !== false) {
          conditions.push(`p.published = TRUE`);
        }

        if (options?.categorySlug) {
          conditions.push(`c.slug = $${pIndex}`);
          params.push(options.categorySlug);
          pIndex++;
        }

        if (options?.categoryId) {
          conditions.push(`p.category_id = $${pIndex}`);
          params.push(options.categoryId);
          pIndex++;
        }

        if (options?.subcategoryId) {
          conditions.push(`p.subcategory_id = $${pIndex}`);
          params.push(options.subcategoryId);
          pIndex++;
        }

        if (options?.featured !== undefined) {
          conditions.push(`p.featured = $${pIndex}`);
          params.push(options.featured);
          pIndex++;
        }

        if (options?.search) {
          conditions.push(`(LOWER(p.name) LIKE $${pIndex} OR LOWER(p.description) LIKE $${pIndex})`);
          params.push(`%${options.search.toLowerCase()}%`);
          pIndex++;
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

        // Count total
        const countSql = `
          SELECT COUNT(*) as count
          FROM products p
          LEFT JOIN categories c ON p.category_id = c.id
          ${whereClause}
        `;
        const countRes = await pool.query(countSql, params);
        const total = parseInt(countRes.rows[0]?.count || "0", 10);

        const page = options?.page || 1;
        const limit = options?.limit || (options?.page ? 20 : 1000);
        const totalPages = Math.max(1, Math.ceil(total / limit));
        const offset = (page - 1) * limit;

        const dataSql = `
          SELECT p.*
          FROM products p
          LEFT JOIN categories c ON p.category_id = c.id
          ${whereClause}
          ORDER BY p.sort_order ASC, p.created_at DESC
          LIMIT $${pIndex} OFFSET $${pIndex + 1}
        `;
        const dataParams = [...params, limit, offset];
        const dataRes = await pool.query(dataSql, dataParams);
        const products = dataRes.rows.map(mapProductRow);

        if (products.length > 0 || total > 0) {
          return {
            products,
            total,
            page,
            totalPages,
          };
        }
      } catch (err) {
        console.error("[DatabaseService] getProductsAsync error:", err);
      }
    }
    return this.getProducts(options);
  }

  public getProductById(id: string): Product | undefined {
    return this.ensureInitialized().products.find((p) => p.id === id);
  }

  public async getProductByIdAsync(id: string): Promise<Product | undefined> {
    if (isPostgresConfigured()) {
      try {
        const pool = getPostgresPool();
        const res = await pool.query("SELECT * FROM products WHERE id = $1 LIMIT 1", [id]);
        if (res.rows && res.rows.length > 0) {
          return mapProductRow(res.rows[0]);
        }
      } catch (err) {
        console.error("[DatabaseService] getProductByIdAsync error:", err);
      }
    }
    return this.getProductById(id);
  }

  public getProductBySlug(slug: string): Product | undefined {
    return this.ensureInitialized().products.find((p) => p.slug === slug);
  }

  public async getProductBySlugAsync(slug: string): Promise<Product | undefined> {
    if (isPostgresConfigured()) {
      try {
        const pool = getPostgresPool();
        const res = await pool.query("SELECT * FROM products WHERE slug = $1 LIMIT 1", [slug]);
        if (res.rows && res.rows.length > 0) {
          return mapProductRow(res.rows[0]);
        }
      } catch (err) {
        console.error("[DatabaseService] getProductBySlugAsync error:", err);
      }
    }
    return this.getProductBySlug(slug);
  }

  public createProduct(prod: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
    const db = this.ensureInitialized();
    const now = new Date().toISOString();
    const newProduct: Product = {
      ...prod,
      id: `prod_${Date.now()}_${randomBytes(4).toString("hex")}`,
      createdAt: now,
      updatedAt: now,
    };
    db.products.push(newProduct);
    this.save();

    if (isPostgresConfigured()) {
      getPostgresPool().query(
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
          newProduct.id,
          newProduct.name,
          newProduct.slug,
          newProduct.categoryId,
          newProduct.subcategoryId || null,
          newProduct.description || null,
          newProduct.image,
          JSON.stringify(newProduct.gallery || []),
          JSON.stringify(newProduct.specifications || {}),
          JSON.stringify(newProduct.minOrderQuantity || null),
          newProduct.leadTime || null,
          Boolean(newProduct.featured),
          newProduct.published !== false,
          newProduct.sortOrder || 0,
          newProduct.createdAt,
          newProduct.updatedAt,
        ]
      ).catch(() => {});
    }

    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | undefined {
    const db = this.ensureInitialized();
    const index = db.products.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    const now = new Date().toISOString();
    db.products[index] = {
      ...db.products[index],
      ...updates,
      updatedAt: now,
    };
    this.save();

    if (isPostgresConfigured()) {
      const p = db.products[index];
      getPostgresPool().query(
        `UPDATE products SET
           name = $1,
           slug = $2,
           category_id = $3,
           subcategory_id = $4,
           description = $5,
           image = $6,
           gallery = $7,
           specifications = $8,
           min_order_quantity = $9,
           lead_time = $10,
           featured = $11,
           published = $12,
           sort_order = $13,
           updated_at = $14
         WHERE id = $15`,
        [
          p.name,
          p.slug,
          p.categoryId,
          p.subcategoryId || null,
          p.description || null,
          p.image,
          JSON.stringify(p.gallery || []),
          JSON.stringify(p.specifications || {}),
          JSON.stringify(p.minOrderQuantity || null),
          p.leadTime || null,
          Boolean(p.featured),
          p.published !== false,
          p.sortOrder || 0,
          p.updatedAt,
          p.id,
        ]
      ).catch(() => {});
    }

    return db.products[index];
  }

  public deleteProduct(id: string): boolean {
    const db = this.ensureInitialized();
    const before = db.products.length;
    db.products = db.products.filter((p) => p.id !== id);
    if (db.products.length !== before) {
      this.save();
      if (isPostgresConfigured()) {
        getPostgresPool().query("DELETE FROM products WHERE id = $1", [id]).catch(() => {});
      }
      return true;
    }
    return false;
  }

  // ── ORDERS ───────────────────────────────────────────────────────────────────
  public findOrdersByCustomerId(customerId: string): Order[] {
    return this.ensureInitialized().orders.filter((o) => o.customerId === customerId);
  }

  public getOrders(customerId?: string): Order[] {
    const list = customerId
      ? this.findOrdersByCustomerId(customerId)
      : this.ensureInitialized().orders;
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return list;
  }

  public getOrderById(id: string): Order | undefined {
    return this.ensureInitialized().orders.find((o) => o.id === id);
  }

  public createOrder(order: Omit<Order, "id" | "createdAt" | "updatedAt">): Order {
    const db = this.ensureInitialized();
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...order,
      id: `ord_${Date.now()}_${randomBytes(4).toString("hex")}`,
      createdAt: now,
      updatedAt: now,
    };
    db.orders.push(newOrder);
    this.save();

    if (isPostgresConfigured()) {
      getPostgresPool().query(
        `INSERT INTO orders (id, customer_id, customer_name, customer_email, customer_phone, company_name, status, reference, notes, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          newOrder.id,
          newOrder.customerId || null,
          newOrder.customerName || null,
          newOrder.customerEmail || null,
          newOrder.customerPhone || null,
          newOrder.companyName || null,
          newOrder.status || "NEW",
          newOrder.reference || null,
          newOrder.notes || null,
          newOrder.createdAt,
          newOrder.updatedAt,
        ]
      ).catch(() => {});
    }

    return newOrder;
  }

  public updateOrderStatus(id: string, status: OrderStatus, notes?: string): Order | undefined {
    const db = this.ensureInitialized();
    const index = db.orders.findIndex((o) => o.id === id);
    if (index === -1) return undefined;
    const now = new Date().toISOString();
    db.orders[index] = {
      ...db.orders[index],
      status,
      notes: notes !== undefined ? notes : db.orders[index].notes,
      updatedAt: now,
    };
    this.save();

    if (isPostgresConfigured()) {
      getPostgresPool().query(
        "UPDATE orders SET status = $1, notes = $2, updated_at = $3 WHERE id = $4",
        [status, notes !== undefined ? notes : null, now, id]
      ).catch(() => {});
    }

    return db.orders[index];
  }

  // ── INQUIRIES ────────────────────────────────────────────────────────────────
  public findInquiriesByCustomerId(customerId: string): Inquiry[] {
    return this.ensureInitialized().inquiries.filter((i) => i.customerId === customerId);
  }

  public async findInquiriesByCustomerIdAsync(customerId: string): Promise<Inquiry[]> {
    if (isPostgresConfigured()) {
      try {
        const pool = getPostgresPool();
        const res = await pool.query(
          "SELECT * FROM inquiries WHERE customer_id = $1 ORDER BY created_at DESC",
          [customerId]
        );
        if (res.rows) {
          return res.rows.map(mapInquiryRow);
        }
      } catch (err) {
        console.error("[DatabaseService] findInquiriesByCustomerIdAsync error:", err);
      }
    }
    return this.findInquiriesByCustomerId(customerId);
  }

  public getInquiries(): Inquiry[] {
    return this.ensureInitialized().inquiries.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public async getInquiriesAsync(): Promise<Inquiry[]> {
    if (isPostgresConfigured()) {
      try {
        const pool = getPostgresPool();
        const res = await pool.query("SELECT * FROM inquiries ORDER BY created_at DESC");
        if (res.rows) {
          return res.rows.map(mapInquiryRow);
        }
      } catch (err) {
        console.error("[DatabaseService] getInquiriesAsync error:", err);
      }
    }
    return this.getInquiries();
  }

  public getInquiryById(id: string): Inquiry | undefined {
    return this.ensureInitialized().inquiries.find((i) => i.id === id);
  }

  public createInquiry(inq: any): Inquiry {
    const db = this.ensureInitialized();
    const now = new Date().toISOString();

    let finalFileRef: string | undefined = inq.fileReference || undefined;
    if (Array.isArray(inq.files) && inq.files.length > 0) {
      finalFileRef = JSON.stringify(inq.files);
    }

    const parsedFiles = parseInquiryFiles(finalFileRef || inq.files);

    const newInq: Inquiry = {
      id: "inq-" + randomBytes(6).toString("hex") + "-" + Date.now(),
      customerId: inq.customerId || undefined,
      name: inq.name,
      email: inq.email || undefined,
      phone: inq.phone || undefined,
      companyName: inq.companyName || inq.company || undefined,
      productCategory: inq.productCategory || undefined,
      message: inq.message || "",
      fileReference: finalFileRef,
      files: parsedFiles.length > 0 ? parsedFiles : undefined,
      status: inq.status || "NEW",
      createdAt: now,
      updatedAt: now,
    };
    db.inquiries.push(newInq);
    this.save();

    if (isPostgresConfigured()) {
      getPostgresPool().query(
        `INSERT INTO inquiries (id, customer_id, name, email, phone, company_name, product_category, message, file_reference, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          newInq.id,
          newInq.customerId || null,
          newInq.name,
          newInq.email || null,
          newInq.phone || null,
          newInq.companyName || null,
          newInq.productCategory || null,
          newInq.message || "",
          newInq.fileReference || null,
          newInq.status || "NEW",
          newInq.createdAt,
          newInq.updatedAt,
        ]
      ).catch(() => {});
    }

    return newInq;
  }

  public updateInquiryStatus(id: string, status: string): Inquiry | undefined {
    const db = this.ensureInitialized();
    const index = db.inquiries.findIndex((i) => i.id === id);
    if (index === -1) return undefined;
    const now = new Date().toISOString();
    db.inquiries[index] = {
      ...db.inquiries[index],
      status,
      updatedAt: now,
    };
    this.save();

    if (isPostgresConfigured()) {
      getPostgresPool().query(
        "UPDATE inquiries SET status = $1, updated_at = $2 WHERE id = $3",
        [status, now, id]
      ).catch(() => {});
    }

    return db.inquiries[index];
  }

  // ── AUDIT LOGS ───────────────────────────────────────────────────────────────
  public getAuditLogs(limit = 50): AuditLog[] {
    const logs = this.ensureInitialized().auditLogs;
    return logs
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  public logAction(log: Omit<AuditLog, "id" | "createdAt">): void {
    const db = this.ensureInitialized();
    const now = new Date().toISOString();
    const newLog: AuditLog = {
      ...log,
      id: `log_${Date.now()}_${randomBytes(4).toString("hex")}`,
      createdAt: now,
    };
    db.auditLogs.push(newLog);
    this.save();

    if (isPostgresConfigured()) {
      getPostgresPool().query(
        `INSERT INTO audit_logs (id, user_id, user_name, action, entity, entity_id, details, ip_address, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          newLog.id,
          newLog.userId || null,
          newLog.userName || null,
          newLog.action,
          newLog.entity,
          newLog.entityId || null,
          newLog.details || null,
          newLog.ipAddress || null,
          newLog.createdAt,
        ]
      ).catch(() => {});
    }
  }
}

export const db = new DatabaseService();

// Top-level exported database helper functions
export const findUserById = (id: string) => db.findUserById(id);
export const findUserByIdAsync = (id: string) => db.findUserByIdAsync(id);
export const findUserByEmail = (email: string) => db.findUserByEmail(email);
export const findUserByEmailAsync = (email: string) => db.findUserByEmailAsync(email);
export const getUserByEmailOrPhone = (identifier: string) => db.getUserByEmailOrPhone(identifier);
export const getUserByEmailOrPhoneAsync = (identifier: string) => db.getUserByEmailOrPhoneAsync(identifier);
export const createUser = (user: Omit<User, "id" | "createdAt" | "updatedAt">) => db.createUser(user);
export const updateUser = (id: string, updates: Partial<User>) => db.updateUser(id, updates);
export const updateUserAsync = (id: string, updates: Partial<User>) => db.updateUserAsync(id, updates);
export const createVerificationToken = (userId: string, tokenHash: string, expiresAt: string) =>
  db.createVerificationToken(userId, tokenHash, expiresAt);
export const createVerificationTokenAsync = (userId: string, tokenHash: string, expiresAt: string) =>
  db.createVerificationTokenAsync(userId, tokenHash, expiresAt);
export const findVerificationTokenByHash = (tokenHash: string) => db.findVerificationTokenByHash(tokenHash);
export const findVerificationTokenByHashAsync = (tokenHash: string) => db.findVerificationTokenByHashAsync(tokenHash);
export const markVerificationTokenUsed = (id: string) => db.markVerificationTokenUsed(id);
export const markVerificationTokenUsedAsync = (id: string) => db.markVerificationTokenUsedAsync(id);
export const createPasswordResetToken = (userId: string, tokenHash: string, expiresAt: string) =>
  db.createPasswordResetToken(userId, tokenHash, expiresAt);
export const createPasswordResetTokenAsync = (userId: string, tokenHash: string, expiresAt: string) =>
  db.createPasswordResetTokenAsync(userId, tokenHash, expiresAt);
export const findPasswordResetTokenByHash = (tokenHash: string) => db.findPasswordResetTokenByHash(tokenHash);
export const findPasswordResetTokenByHashAsync = (tokenHash: string) => db.findPasswordResetTokenByHashAsync(tokenHash);
export const markPasswordResetTokenUsed = (id: string) => db.markPasswordResetTokenUsed(id);
export const markPasswordResetTokenUsedAsync = (id: string) => db.markPasswordResetTokenUsedAsync(id);
export const findCustomerProfileByUserId = (userId: string) => db.findCustomerProfileByUserId(userId);
export const findOrdersByCustomerId = (customerId: string) => db.findOrdersByCustomerId(customerId);
export const findInquiriesByCustomerId = (customerId: string) => db.findInquiriesByCustomerId(customerId);
export const findInquiriesByCustomerIdAsync = (customerId: string) => db.findInquiriesByCustomerIdAsync(customerId);

export const createInquiry = (inq: any) => db.createInquiry(inq);
export const getInquiries = () => db.getInquiries();
export const getInquiriesAsync = () => db.getInquiriesAsync();
export const getProducts = (options?: Parameters<DatabaseService["getProducts"]>[0]) =>
  db.getProducts(options);
export const getProductsAsync = (options?: Parameters<DatabaseService["getProductsAsync"]>[0]) =>
  db.getProductsAsync(options);
export const getCategories = (publishedOnly?: boolean) => db.getCategories(publishedOnly);
export const getCategoriesAsync = (publishedOnly?: boolean) => db.getCategoriesAsync(publishedOnly);
export const getCategoryBySlug = (slug: string) => db.getCategoryBySlug(slug);
export const getCategoryBySlugAsync = (slug: string) => db.getCategoryBySlugAsync(slug);
export const getCategoryById = (id: string) => db.getCategoryById(id);
export const getCategoryByIdAsync = (id: string) => db.getCategoryByIdAsync(id);
export const getProductBySlug = (slug: string) => db.getProductBySlug(slug);
export const getProductBySlugAsync = (slug: string) => db.getProductBySlugAsync(slug);
export const getProductById = (id: string) => db.getProductById(id);
export const getProductByIdAsync = (id: string) => db.getProductByIdAsync(id);
