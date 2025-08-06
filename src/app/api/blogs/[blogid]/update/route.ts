import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";
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

interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: unknown;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { blogid: string } }
) {
  // Simplified authentication - you can add back session check later
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json(
  //     { success: false, message: "You are Unauthorized!" },
  //     { status: 401 }
  //   );
  // }

  const blogid = params.blogid;

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const file = formData.get("file") as File | null;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: "Title and content are required" },
        { status: 400 }
      );
    }

    // Get the existing blog
    const existingBlog = await prisma.blog.findUnique({
      where: { id: blogid },
      select: {
        author: true,
        image_public_id: true,
      },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // SECURITY CHECK: Use utility function to validate blog modification rights
    if (!canModifyBlog(existingBlog.author)) {
      logSecurityEvent("UNAUTHORIZED_UPDATE_ATTEMPT", {
        blogId: blogid,
        blogAuthor: existingBlog.author,
        userAgent: req.headers.get("user-agent"),
        ip: req.headers.get("x-forwarded-for") || "unknown",
      });

      return NextResponse.json(
        {
          success: false,
          message: "Access denied: You can only edit your own blogs",
        },
        {
          status: 403,
          headers: ADMIN_SECURITY_HEADERS,
        }
      );
    }

    let imagePublicId = existingBlog.image_public_id;

    // If a new file is uploaded, handle image update
    if (file && file.size > 0) {
      // Delete old image from Cloudinary if it exists
      if (existingBlog.image_public_id) {
        try {
          await cloudinary.uploader.destroy(existingBlog.image_public_id);
        } catch (error) {
          console.error("Error deleting old image:", error);
        }
      }

      // Upload new image
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise<CloudinaryUploadResult>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "next-cloudinary-uploads" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as CloudinaryUploadResult);
            }
          );
          uploadStream.end(buffer);
        }
      );

      imagePublicId = result.public_id;
    }

    // Update the blog in database
    const updatedBlog = await prisma.blog.update({
      where: { id: blogid },
      data: {
        title: title,
        content: content,
        image_public_id: imagePublicId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog updated successfully!",
        blog: updatedBlog,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);

    // More specific error handling
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: `Error while updating blog: ${error.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while updating the blog",
      },
      { status: 500 }
    );
  }
}
