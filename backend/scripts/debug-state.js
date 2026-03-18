const http = require('http');
const fs = require('fs');
const path = require('path');

const API_PORT = 5000;
const ADMIN_EMAIL = 'admin@wekume.org';
const ADMIN_PASSWORD = 'WekumeAdmin2024!';
const UPLOADS_DIR = path.join(__dirname, 'uploads/backgrounds');

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

async function debugState() {
    try {
        console.log('--- FILE SYSTEM STATE ---');
        if (fs.existsSync(UPLOADS_DIR)) {
            const files = fs.readdirSync(UPLOADS_DIR);
            console.log(`Total Files: ${files.length}`);
            files.forEach(f => console.log(`[FILE] "${f}"`));
        } else {
            console.log('Uploads directory does not exist.');
        }

        console.log('\n--- DATABASE STATE ---');
        console.log('Logging in...');
        const login = await request('POST', '/auth/login', { email: ADMIN_EMAIL, password: ADMIN_PASSWORD });

        // Use a direct SQL query or simply fetch via API if trusted
        // Let's use API since that's what the frontend sees
        const res = await request('GET', '/backgrounds', null, { Authorization: `Bearer ${login.data.token}` });
        const bgs = res.data.backgrounds;

        console.log(`Total DB Records: ${bgs.length}`);
        bgs.forEach(b => console.log(`[DB]   id:${b.id} public_id:"${b.public_id}"`));

    } catch (e) {
        console.error('Error:', e.message);
    }
}

debugState();
