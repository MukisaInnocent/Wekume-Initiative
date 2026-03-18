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

async function checkIntegrity() {
    try {
        console.log('Logging in...');
        const login = await request('POST', '/auth/login', { email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
        const token = login.data.token;

        console.log('Fetching backgrounds...');
        const res = await request('GET', '/backgrounds', null, { Authorization: `Bearer ${token}` });
        const bgs = res.data.backgrounds;

        console.log(`\nChecking ${bgs.length} records against ${UPLOADS_DIR}`);

        bgs.forEach(bg => {
            const filePath = path.join(UPLOADS_DIR, bg.public_id);
            const exists = fs.existsSync(filePath);

            console.log(`[${bg.id}] "${bg.public_id}"`);
            console.log(`      Path: ${filePath}`);
            if (exists) {
                console.log(`      ✅ Exists on disk.`);
            } else {
                console.log(`      ❌ MISSING from disk!`);
            }
        });

    } catch (e) {
        console.error('Error:', e.message);
        if (e.response) console.error('Response:', e.response);
        console.error(e);
    }
}

checkIntegrity();
