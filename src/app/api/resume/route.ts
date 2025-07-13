import { NextResponse } from "next/server";
import { join } from "path";
import { promises as fs } from "fs";

export async function GET() {
  
  const pdfPath = join(process.cwd(), "public", "Dev_Chawla_Resume.pdf");
  try {
    const pdfBuffer = await fs.readFile(pdfPath);
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Disposition": "inline; filename=Dev_Chawla_Resume.pdf",
      },
    });
  } catch {
    return new NextResponse("PDF not found", { status: 404 });
  }
}
