const testBlogId = '68964e7e2606fb51e2fb8886';
const DEPLOYED_URL = 'https://varunsinghh09.vercel.app';

async function testUpdate() {
    console.log('🔄 Testing blog update with new blog ID...');
    
    // Test 1: Check if the new blog exists
    try {
        const response = await fetch(`${DEPLOYED_URL}/api/blogs/${testBlogId}`);
        const data = await response.json();
        console.log('✅ Blog exists:', data.success);
        if (data.success && data.message) {
            console.log('📝 Title:', data.message.title);
            console.log('👤 Author:', data.message.author);
        }
    } catch (error) {
        console.log('❌ Error checking blog:', error.message);
    }
    
    // Test 2: Try to update it with FormData
    try {
        const FormData = (await import('form-data')).default;
        const formData = new FormData();
        formData.append('title', 'Updated: Complete Guide to Full-Stack Deployment');
        formData.append('content', 'This is a test update to verify the API works correctly.');
        
        const response = await fetch(`${DEPLOYED_URL}/api/blogs/${testBlogId}/update`, {
            method: 'PUT',
            body: formData,
            headers: formData.getHeaders()
        });
        
        const data = await response.json();
        console.log('🔄 Update response:', data);
        console.log('📊 Status:', response.status);
    } catch (error) {
        console.log('❌ Update error:', error.message);
    }
}

testUpdate().catch(console.error);
