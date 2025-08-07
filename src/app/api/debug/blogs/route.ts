import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("🔍 Debug: Checking database connection...");
    
    // Test database connection
    const blogCount = await prisma.blog.count();
    console.log(`📊 Total blogs in database: ${blogCount}`);
    
    // Get all blogs with basic info
    const blogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log("📝 Blogs found:", blogs);
    
    return NextResponse.json({
      success: true,
      environment: process.env.NODE_ENV,
      databaseUrl: process.env.MONGODB_URI ? "✅ Set" : "❌ Missing",
      blogCount: blogCount,
      blogs: blogs,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("❌ Database connection error:", error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      environment: process.env.NODE_ENV,
      databaseUrl: process.env.MONGODB_URI ? "✅ Set" : "❌ Missing",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
