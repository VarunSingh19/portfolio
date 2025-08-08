import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log('🔍 Testing FormData parsing...');
    console.log('Content-Type:', req.headers.get('content-type'));
    
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    
    console.log('📝 Parsed data:', { title, content });
    
    return NextResponse.json({
      success: true,
      message: "FormData parsed successfully",
      data: { title, content }
    });
    
  } catch (error) {
    console.error("❌ FormData parsing error:", error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    console.log('🔍 Testing PUT FormData parsing...');
    console.log('Content-Type:', req.headers.get('content-type'));
    
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    
    console.log('📝 Parsed PUT data:', { title, content });
    
    return NextResponse.json({
      success: true,
      message: "PUT FormData parsed successfully",
      data: { title, content }
    });
    
  } catch (error) {
    console.error("❌ PUT FormData parsing error:", error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
