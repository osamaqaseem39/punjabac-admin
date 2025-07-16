import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
// Removed: import { MongoClient } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const details = formData.get("details") as string;
    const image = formData.get("image") as File | null;

    if (!name || !email || !phone || !details) {
      return NextResponse.json({ error: "All fields except image are required." }, { status: 400 });
    }

    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public", "uploads", "quotes");
      await fs.mkdir(uploadDir, { recursive: true });
      const ext = path.extname(image.name) || ".jpg";
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`;
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
    }

    // Simulate saving the quote (no database)
    // Optionally, you could write to a local file or just return success
    // For static export, just return success

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json({ error: "Failed to submit quote." }, { status: 500 });
  }
} 