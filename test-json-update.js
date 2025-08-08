async function testJSONUpdate() {
    const testBlogId = '68964e7e2606fb51e2fb8886';
    const DEPLOYED_URL = 'https://varunsinghh09.vercel.app';
    
    console.log('🔄 Testing JSON update...');
    
    try {
        const response = await fetch(`${DEPLOYED_URL}/api/blogs/${testBlogId}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Updated: Complete Guide to Full-Stack Deployment (JSON Test)',
                content: 'This is a test update using JSON to verify the API works correctly. The update functionality should now work properly on the deployed version.'
            })
        });
        
        const data = await response.json();
        console.log('🔄 JSON Update response:', data);
        console.log('📊 Status:', response.status);
        
        if (data.success) {
            console.log('✅ Update successful!');
        } else {
            console.log('❌ Update failed:', data.message);
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
}

testJSONUpdate().catch(console.error);
