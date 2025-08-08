import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check which environment variables are set (without exposing values)
    const envCheck = {
      MONGODB_URI: !!process.env.MONGODB_URI,
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: !!process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET,
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
      ADMIN_NAME: !!process.env.ADMIN_NAME,
      ALLOWED_AUTHORS: !!process.env.ALLOWED_AUTHORS,
      NEXT_PUBLIC_BASE_URL: !!process.env.NEXT_PUBLIC_BASE_URL,
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: !!process.env.VERCEL,
      VERCEL_URL: process.env.VERCEL_URL || 'Not set',
    };

    return NextResponse.json({
      success: true,
      environment: process.env.NODE_ENV,
      platform: process.env.VERCEL ? 'Vercel' : 'Other',
      envVariables: envCheck,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("❌ Environment check error:", error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
