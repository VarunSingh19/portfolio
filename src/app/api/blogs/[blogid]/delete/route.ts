import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import {
  canModifyBlog,
  logSecurityEvent,
  ADMIN_SECURITY_HEADERS,
} from "@/lib/auth-utils";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(
  req: NextRequest,
  { params }: { params: { blogid: string } }
) {
  // SECURITY WARNING: Authentication temporarily disabled
  // TODO: Implement proper session-based authentication

  // For now, let's add a simple check - you should implement proper auth
  const adminEmail = "varunsinghh2409@gmail.com"; // Your email

  // Temporary: Allow deletion only if specific conditions are met
  // In production, you should use proper session authentication

  const blogid = params.blogid;

  try {
    // First, get the blog to retrieve the image public_id
    const blog = await prisma.blog.findUnique({
      where: {
        id: blogid,
      },
      select: {
        image_public_id: true,
        author: true,
        title: true,
      },
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // SECURITY CHECK: Use utility function to validate blog modification rights
    if (!canModifyBlog(blog.author)) {
      logSecurityEvent("UNAUTHORIZED_DELETE_ATTEMPT", {
        blogId: blogid,
        blogAuthor: blog.author,
        userAgent: req.headers.get("user-agent"),
        ip: req.headers.get("x-forwarded-for") || "unknown",
      });

      return NextResponse.json(
        {
          success: false,
          message: "Access denied: You can only delete your own blogs",
        },
        {
          status: 403,
          headers: ADMIN_SECURITY_HEADERS,
        }
      );
    }

    // Delete the image from Cloudinary
    if (blog.image_public_id) {
      try {
        await cloudinary.uploader.destroy(blog.image_public_id);
      } catch (cloudinaryError) {
        console.error("Error deleting image from Cloudinary:", cloudinaryError);
        // Continue with blog deletion even if image deletion fails
      }
    }

    // Delete the blog from database
    await prisma.blog.delete({
      where: {
        id: blogid,
      },
    });

    // Log successful deletion
    logSecurityEvent("BLOG_DELETED", {
      blogId: blogid,
      blogTitle: blog.title || "Unknown",
      blogAuthor: blog.author,
      userAgent: req.headers.get("user-agent"),
      ip: req.headers.get("x-forwarded-for") || "unknown",
    });

    return NextResponse.json(
      { success: true, message: "Blog deleted successfully" },
      {
        status: 200,
        headers: ADMIN_SECURITY_HEADERS,
      }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, message: `Error while deleting blog: ${error}` },
      { status: 500 }
    );
  }
}
