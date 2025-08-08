const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

// Use production database URL if provided
const databaseUrl = process.env.MONGODB_URI || process.env.DATABASE_URL;
console.log('🔗 Using database URL:', databaseUrl ? 'Set' : 'Not set');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl
        }
    }
});

async function createBlogDirect() {
    try {
        console.log('🚀 Starting direct blog creation...');

        // Check if blog content file exists
        if (!fs.existsSync('blog-content.html')) {
            console.error('❌ blog-content.html file not found!');
            process.exit(1);
        }

        // Read the blog content
        const blogContent = fs.readFileSync('blog-content.html', 'utf8');

        // Blog data
        const blogData = {
            title: 'Complete Guide: Deploying React Vite Frontend with Django Backend - A Full-Stack Production Deployment',
            content: blogContent,
            author: 'Varun Singh',
            image_public_id: 'next-cloudinary-uploads/deployment-guide-cover',
            createdAt: new Date(),
        };

        console.log('📝 Creating blog post...');
        console.log('📄 Title:', blogData.title);
        console.log('👤 Author:', blogData.author);
        console.log('📊 Content length:', blogData.content.length, 'characters');

        // Create the blog post
        const blog = await prisma.blog.create({
            data: blogData
        });

        console.log('🎉 Blog post created successfully!');
        console.log('🆔 Blog ID:', blog.id);
        console.log('📅 Created at:', blog.createdAt);
        console.log('🔗 You can view it at: /blogs/' + blog.id);

        return blog;

    } catch (error) {
        console.error('❌ Error creating blog post:', error.message);

        if (error.code === 'P1001') {
            console.log('💡 Database connection failed. Please check:');
            console.log('   - MongoDB is running');
            console.log('   - MONGODB_URI environment variable is set');
            console.log('   - Database credentials are correct');
        }

        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run the script
if (require.main === module) {
    createBlogDirect()
        .then(() => {
            console.log('✅ Script completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Script failed:', error.message);
            process.exit(1);
        });
}

module.exports = { createBlogDirect };
