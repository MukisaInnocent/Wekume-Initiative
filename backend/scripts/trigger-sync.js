const http = require('http');

const API_PORT = 5000;
const ADMIN_EMAIL = 'admin@wekume.org';
const ADMIN_PASSWORD = 'WekumeAdmin2024!';

function request(method, path, body = null, headers = {}) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: API_PORT,
            path: '/api' + path,
            method: method,
            headers: { 'Content-Type': 'application/json', ...headers }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
                catch (e) { resolve({ status: res.statusCode, data }); }
            });
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function triggerSync() {
    try {
        console.log('Logging in...');
        const login = await request('POST', '/auth/login', { email: ADMIN_EMAIL, password: ADMIN_PASSWORD });

        console.log('Triggering Sync (GET /backgrounds)...');
        const res = await request('GET', '/backgrounds', null, { Authorization: `Bearer ${login.data.token}` });

        const bgs = res.data.backgrounds;
        console.log(`\nSync complete. New total images in DB: ${bgs.length}`);

        // Log filenames just to be sure
        // bgs.forEach(b => console.log(`- ${b.public_id}`));

    } catch (e) {
        console.error('Error:', e.message);
    }
}

triggerSync();
