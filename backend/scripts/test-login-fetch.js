
async function testLogin() {
    try {
        console.log('Testing backend health check...');
        try {
            const healthRes = await fetch('http://localhost:5050/health');
            const healthData = await healthRes.json();
            console.log('✅ Backend is running:', healthData);
        } catch (e) {
            console.error('❌ Health check failed:', e.message);
            return;
        }

        console.log('\nTesting admin login with default credentials...');
        const email = 'admin@wekume.org';
        const password = 'WekumeAdmin2024!';

        const response = await fetch('http://localhost:5050/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Login successful!');
            console.log('Role:', data.user.role);
            console.log('Token starts with:', data.token.substring(0, 20) + '...');
        } else {
            console.log('❌ Login failed!');
            console.log('Status:', response.status);
            console.log('Error:', data.error);
        }

    } catch (error) {
        console.error('❌ Script error:', error);
    }
}

testLogin();
