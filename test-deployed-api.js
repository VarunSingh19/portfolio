// Test script to check deployed API endpoints
const DEPLOYED_URL = 'https://varunsinghh09.vercel.app';

async function testDeployedAPI() {
    console.log('🔍 Testing deployed API endpoints...\n');

    // Test 1: Check if blogs API works
    try {
        console.log('1️⃣ Testing GET /api/blogs');
        const blogsResponse = await fetch(`${DEPLOYED_URL}/api/blogs`);
        const blogsData = await blogsResponse.json();
        console.log('✅ Blogs API Response:', blogsData);
        console.log(`📊 Found ${blogsData.message?.length || 0} blogs\n`);
    } catch (error) {
        console.log('❌ Blogs API Error:', error.message, '\n');
    }

    // Test 2: Check debug endpoint
    try {
        console.log('2️⃣ Testing GET /api/debug/blogs');
        const debugResponse = await fetch(`${DEPLOYED_URL}/api/debug/blogs`);
        const debugData = await debugResponse.json();
        console.log('✅ Debug API Response:', debugData);
        console.log(`🔗 Database URL: ${debugData.databaseUrl}`);
        console.log(`🌍 Environment: ${debugData.environment}`);
        console.log(`📊 Blog Count: ${debugData.blogCount}\n`);
    } catch (error) {
        console.log('❌ Debug API Error:', error.message, '\n');
    }

    // Test 3: Check if a specific blog exists (using the blog ID from your local)
    const testBlogId = '68925515be436946af55c83d'; // Your deployment guide blog ID
    try {
        console.log(`3️⃣ Testing GET /api/blogs/${testBlogId}`);
        const blogResponse = await fetch(`${DEPLOYED_URL}/api/blogs/${testBlogId}`);
        const blogData = await blogResponse.json();
        console.log('✅ Individual Blog Response:', blogData);
        
        if (blogData.success) {
            console.log(`📝 Blog Title: ${blogData.message.title}`);
            console.log(`👤 Blog Author: ${blogData.message.author}\n`);
        }
    } catch (error) {
        console.log('❌ Individual Blog API Error:', error.message, '\n');
    }

    // Test 4: Test update endpoint (without actually updating)
    try {
        console.log(`4️⃣ Testing PUT /api/blogs/${testBlogId}/update (dry run)`);
        const updateResponse = await fetch(`${DEPLOYED_URL}/api/blogs/${testBlogId}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Test Update - Do Not Save',
                content: 'This is a test update to check if the API endpoint works'
            })
        });
        
        const updateData = await updateResponse.json();
        console.log('✅ Update API Response:', updateData);
        console.log(`🔒 Update Status: ${updateResponse.status}\n`);
    } catch (error) {
        console.log('❌ Update API Error:', error.message, '\n');
    }

    console.log('🏁 API testing complete!');
}

// Run the test
testDeployedAPI().catch(console.error);
