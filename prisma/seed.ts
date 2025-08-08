import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME;

  if (!email || !password || !name) {
    throw new Error(
      "Missing required environment variables: ADMIN_EMAIL, ADMIN_PASSWORD, or ADMIN_NAME"
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email: email },
    update: {},
    create: {
      email: email,
      name: name,
      hashedPassword: hashedPassword,
    },
  });

  // Create a test blog post
  const blog = await prisma.blog.create({
    data: {
      title: "Getting Started with Full-Stack Development",
      author: "Varun Singh",
      createdAt: new Date(),
      image_public_id: "next-cloudinary-uploads/q3joxrqyjkbnoxlw1n61",
      content:
        "Welcome to my blog! Here I'll share my journey in full-stack development, tips, and insights about modern web technologies.",
    },
  });

  console.log("Created user:", user);
  console.log("Created blog:", blog);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
