import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const result = await db.getProductsAsync({
      categorySlug,
      search,
      page,
      limit,
      publishedOnly: false, // Admins see all
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await request.json();
    const {
      name,
      slug,
      categoryId,
      subcategoryId,
      description,
      image,
      gallery,
      specifications,
      published,
      featured,
      sortOrder,
    } = body;

    if (!name || !categoryId || !image) {
      return NextResponse.json(
        { error: "Product Name, Category, and Main Image are required." },
        { status: 400 }
      );
    }

    const autoSlug =
      slug?.trim().toLowerCase() ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const existing = db.getProductBySlug(autoSlug);
    if (existing) {
      return NextResponse.json(
        { error: "A product with this URL slug already exists." },
        { status: 409 }
      );
    }

    const newProduct = db.createProduct({
      name: name.trim(),
      slug: autoSlug,
      categoryId,
      subcategoryId: subcategoryId || null,
      description: description || "",
      image,
      gallery: Array.isArray(gallery) ? gallery : [image],
      specifications: Array.isArray(specifications) ? specifications : [],
      published: published !== false,
      featured: Boolean(featured),
      sortOrder: Number(sortOrder) || 0,
    });

    db.logAction({
      userId: admin.userId,
      userName: admin.name,
      action: "CREATE_PRODUCT",
      entity: "Product",
      entityId: newProduct.id,
      details: `Created product: ${newProduct.name} (${newProduct.slug})`,
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await request.json();
    const {
      id,
      name,
      slug,
      categoryId,
      subcategoryId,
      description,
      image,
      gallery,
      specifications,
      published,
      featured,
      sortOrder,
    } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    if (slug) {
      const existing = db.getProductBySlug(slug);
      if (existing && existing.id !== id) {
        return NextResponse.json(
          { error: "Another product is already using this URL slug." },
          { status: 409 }
        );
      }
    }

    const updated = db.updateProduct(id, {
      ...(name ? { name: name.trim() } : {}),
      ...(slug ? { slug: slug.trim().toLowerCase() } : {}),
      ...(categoryId ? { categoryId } : {}),
      ...(subcategoryId !== undefined ? { subcategoryId: subcategoryId || null } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(image ? { image } : {}),
      ...(gallery ? { gallery: Array.isArray(gallery) ? gallery : [gallery] } : {}),
      ...(specifications ? { specifications: Array.isArray(specifications) ? specifications : [] } : {}),
      ...(published !== undefined ? { published: Boolean(published) } : {}),
      ...(featured !== undefined ? { featured: Boolean(featured) } : {}),
      ...(sortOrder !== undefined ? { sortOrder: Number(sortOrder) } : {}),
    });

    if (!updated) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    db.logAction({
      userId: admin.userId,
      userName: admin.name,
      action: "UPDATE_PRODUCT",
      entity: "Product",
      entityId: updated.id,
      details: `Updated product: ${updated.name}`,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const admin = await requireAdmin();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    const success = db.deleteProduct(id);
    if (!success) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    db.logAction({
      userId: admin.userId,
      userName: admin.name,
      action: "DELETE_PRODUCT",
      entity: "Product",
      entityId: id,
      details: `Deleted product ID ${id}`,
    });

    return NextResponse.json({ success: true, message: "Product deleted." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unauthorized" }, { status: 401 });
  }
}
