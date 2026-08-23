export type UserRole = "CUSTOMER" | "ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED";
export type OrderStatus =
  | "NEW"
  | "REVIEWING"
  | "CONTACTED"
  | "QUOTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  resetToken?: string;
  resetTokenExpiresAt?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface VerificationToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
  usedAt: string | null;
  createdAt: string;
  identifier: string;
  token: string;
  expires: string;
}

export interface PasswordResetToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
  usedAt: string | null;
  createdAt: string;
}

export interface CustomerProfile {
  id: string;
  userId: string;
  companyName?: string;
  phone?: string;
  country?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  description?: string;
  image?: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  subcategoryId?: string | null;
  description?: string;
  image: string;
  gallery?: string[];
  specifications?: any;
  minOrderQuantity?: any;
  leadTime?: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId?: string;
  description: string;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  companyName?: string;
  status: OrderStatus;
  reference?: string;
  notes?: string;
  items?: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  customerId?: string;
  name: string;
  email?: string;
  phone?: string;
  companyName?: string;
  company?: string;
  productCategory?: string;
  message: string;
  fileReference?: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId?: string;
  userName?: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  ipAddress?: string;
  createdAt: string;
}

export interface DatabaseSchema {
  users: User[];
  customerProfiles: CustomerProfile[];
  categories: Category[];
  products: Product[];
  orders: Order[];
  orderItems: OrderItem[];
  inquiries: Inquiry[];
  auditLogs: AuditLog[];
  verificationTokens?: VerificationToken[];
  passwordResetTokens?: PasswordResetToken[];
}

export type SlotsDB = DatabaseSchema;
