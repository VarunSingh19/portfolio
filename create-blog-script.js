const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'http://localhost:3000'; // Change this to your deployed URL if needed
const LOGIN_CREDENTIALS = {
    email: 'varunsinghh2409@gmail.com',
    password: 'Varunsingh@25'
};

// Blog data
const BLOG_DATA = {
    title: 'Complete Guide: Deploying React Vite Frontend with Django Backend - A Full-Stack Production Deployment',
    author: 'Varun Singh'
};

// Create axios instance with cookie support
const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
});

// Function to simulate login and get session
async function loginAndGetSession() {
    try {
        console.log('🔐 Attempting to login...');
        
        // First, get the login page to establish session
        const loginPageResponse = await apiClient.get('/login');
        console.log('✅ Login page accessed successfully');

        // Attempt to login via API
        const loginResponse = await apiClient.post('/api/auth/signin/credentials', {
            email: LOGIN_CREDENTIALS.email,
            password: LOGIN_CREDENTIALS.password,
            redirect: false
        });

        console.log('✅ Login successful');
        return true;
    } catch (error) {
        console.error('❌ Login failed:', error.response?.data || error.message);
        return false;
    }
}

// Function to create a dummy image file for the blog
function createDummyImage() {
    const imagePath = path.join(__dirname, 'blog-image.jpg');
    
    // Create a simple text file as placeholder (you can replace with actual image)
    const imageContent = Buffer.from('Dummy image content for blog post');
    fs.writeFileSync(imagePath, imageContent);
    
    return imagePath;
}

// Function to create blog post
async function createBlogPost() {
    try {
        console.log('📝 Creating blog post...');

        // Read the blog content
        const blogContent = fs.readFileSync('blog-content.html', 'utf8');
        
        // Create form data
        const formData = new FormData();
        formData.append('title', BLOG_DATA.title);
        formData.append('content', blogContent);
        
        // Create and append dummy image
        const imagePath = createDummyImage();
        formData.append('file', fs.createReadStream(imagePath), {
            filename: 'blog-image.jpg',
            contentType: 'image/jpeg'
        });

        // Make the API request
        const response = await apiClient.post('/api/create-blog', formData, {
            headers: {
                ...formData.getHeaders(),
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.success) {
            console.log('🎉 Blog post created successfully!');
            console.log('📄 Title:', BLOG_DATA.title);
            console.log('📊 Content length:', blogContent.length, 'characters');
            
            // Clean up dummy image
            fs.unlinkSync(imagePath);
            
            return true;
        } else {
            console.error('❌ Failed to create blog post:', response.data.message);
            return false;
        }

    } catch (error) {
        console.error('❌ Error creating blog post:', error.response?.data || error.message);
        
        // Clean up dummy image if it exists
        const imagePath = path.join(__dirname, 'blog-image.jpg');
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
        
        return false;
    }
}

// Alternative method: Direct database insertion
async function createBlogDirectly() {
    try {
        console.log('🔄 Attempting direct blog creation...');
        
        const blogContent = fs.readFileSync('blog-content.html', 'utf8');
        
        // This would require a custom API endpoint that bypasses authentication
        const response = await apiClient.post('/api/create-blog-direct', {
            title: BLOG_DATA.title,
            content: blogContent,
            author: BLOG_DATA.author,
            image_public_id: 'default-blog-image' // Use a default image
        });

        if (response.data.success) {
            console.log('🎉 Blog created directly!');
            return true;
        }
        
        return false;
    } catch (error) {
        console.log('ℹ️ Direct creation not available, trying login method...');
        return false;
    }
}

// Main execution function
async function main() {
    console.log('🚀 Starting blog creation script...');
    console.log('📝 Blog Title:', BLOG_DATA.title);
    console.log('👤 Author:', BLOG_DATA.author);
    console.log('🌐 Target URL:', BASE_URL);
    console.log('─'.repeat(60));

    // Check if blog content file exists
    if (!fs.existsSync('blog-content.html')) {
        console.error('❌ blog-content.html file not found!');
        console.log('Please make sure the blog content file exists in the same directory.');
        process.exit(1);
    }

    try {
        // Method 1: Try direct creation (if endpoint exists)
        const directSuccess = await createBlogDirectly();
        if (directSuccess) {
            console.log('✅ Blog created successfully via direct method!');
            return;
        }

        // Method 2: Login and create
        const loginSuccess = await loginAndGetSession();
        if (!loginSuccess) {
            console.error('❌ Could not establish authenticated session');
            console.log('💡 Please check:');
            console.log('   - Your application is running on', BASE_URL);
            console.log('   - Login credentials are correct');
            console.log('   - NextAuth is properly configured');
            process.exit(1);
        }

        const createSuccess = await createBlogPost();
        if (createSuccess) {
            console.log('✅ Blog post created successfully!');
            console.log('🔗 You can view it at:', `${BASE_URL}/blogs`);
        } else {
            console.error('❌ Failed to create blog post');
            process.exit(1);
        }

    } catch (error) {
        console.error('❌ Unexpected error:', error.message);
        process.exit(1);
    }
}

// Handle script termination
process.on('SIGINT', () => {
    console.log('\n🛑 Script interrupted by user');
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught exception:', error.message);
    process.exit(1);
});

// Run the script
if (require.main === module) {
    main().catch(error => {
        console.error('❌ Script failed:', error.message);
        process.exit(1);
    });
}

module.exports = { main, createBlogPost, loginAndGetSession };
