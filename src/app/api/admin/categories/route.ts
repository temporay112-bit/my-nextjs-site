import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";

export async function GET() {
  try {
    await requireAdmin();
    const categories = await db.getCategoriesAsync(false);
    return NextResponse.json({ categories });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await request.json();
    const { name, slug, parentId, description, image, sortOrder, published } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Category name and slug are required." }, { status: 400 });
    }

    const existing = await db.getCategoryBySlugAsync(slug);
    if (existing) {
      return NextResponse.json({ error: "A category with this slug already exists." }, { status: 409 });
    }

    const newCategory = db.createCategory({
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
      parentId: parentId || null,
      description: description || "",
      image: image || "",
      sortOrder: Number(sortOrder) || 0,
      published: published !== false,
    });

    db.logAction({
      userId: admin.userId,
      userName: admin.name,
      action: "CREATE_CATEGORY",
      entity: "Category",
      entityId: newCategory.id,
      details: `Created category: ${newCategory.name} (${newCategory.slug})`,
    });

    return NextResponse.json({ success: true, category: newCategory });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await request.json();
    const { id, name, slug, parentId, description, image, sortOrder, published } = body;

    if (!id) {
      return NextResponse.json({ error: "Category ID is required." }, { status: 400 });
    }

    if (slug) {
      const existing = db.getCategoryBySlug(slug);
      if (existing && existing.id !== id) {
        return NextResponse.json({ error: "Another category already uses this slug." }, { status: 409 });
      }
    }

    const updated = db.updateCategory(id, {
      ...(name ? { name: name.trim() } : {}),
      ...(slug ? { slug: slug.trim().toLowerCase() } : {}),
      ...(parentId !== undefined ? { parentId: parentId || null } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(image !== undefined ? { image } : {}),
      ...(sortOrder !== undefined ? { sortOrder: Number(sortOrder) } : {}),
      ...(published !== undefined ? { published: Boolean(published) } : {}),
    });

    if (!updated) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }

    db.logAction({
      userId: admin.userId,
      userName: admin.name,
      action: "UPDATE_CATEGORY",
      entity: "Category",
      entityId: updated.id,
      details: `Updated category: ${updated.name}`,
    });

    return NextResponse.json({ success: true, category: updated });
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
      return NextResponse.json({ error: "Category ID is required." }, { status: 400 });
    }

    // Safety check: Don't delete if products are using this category
    const productsUsing = db.getProducts({ publishedOnly: false }).products.filter(
      (p) => p.categoryId === id || p.subcategoryId === id
    );
    if (productsUsing.length > 0) {
      return NextResponse.json(
        { error: `Cannot delete: ${productsUsing.length} product(s) are assigned to this category.` },
        { status: 400 }
      );
    }

    const success = db.deleteCategory(id);
    if (!success) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }

    db.logAction({
      userId: admin.userId,
      userName: admin.name,
      action: "DELETE_CATEGORY",
      entity: "Category",
      entityId: id,
      details: `Deleted category ID ${id}`,
    });

    return NextResponse.json({ success: true, message: "Category deleted." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unauthorized" }, { status: 401 });
  }
}
