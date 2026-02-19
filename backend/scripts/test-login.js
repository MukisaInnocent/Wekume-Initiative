const axios = require('axios');

// Test the login endpoint
async function testLogin() {
    try {
        console.log('Testing backend health check...');
        const healthResponse = await axios.get('http://localhost:5050/health');
        console.log('✅ Backend is running:', healthResponse.data);

        console.log('\nTesting admin login...');
        const loginResponse = await axios.post('http://localhost:5050/api/auth/login', {
            email: 'admin@wekume.org',
            password: 'WekumeAdmin2024!'
        });

        console.log('✅ Login successful!');
        console.log('Token:', loginResponse.data.token);
        console.log('User:', loginResponse.data.user);

    } catch (error) {
        console.error('\n❌ Error:', error.response?.data || error.message);

        if (error.response) {
            console.log('\nStatus:', error.response.status);
            console.log('Details:', error.response.data);
        }
    }
}

testLogin();
