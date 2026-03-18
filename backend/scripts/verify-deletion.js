const http = require('http');
const fs = require('fs');
const path = require('path');

const API_PORT = 5000;
const ADMIN_EMAIL = 'admin@wekume.org';
const ADMIN_PASSWORD = 'WekumeAdmin2024!';

// Setup test file
const TEST_FILENAME = 'delete-test-image.txt'; // Using txt for simple test, though controller checks extension for sync, upload accepts images. 
// Wait, upload middleware checks for images? controller uploadBackground doesn't seem to force check in the provided snippet, but client side does.
// Let's use a .jpg to be safe.
// Target an existing file with spaces that likely exists from the import
const TEST_FILENAME_JPG = 'WhatsApp Image 2026-02-10 at 10.31.36 AM.jpeg';
const UPLOADS_DIR = path.join(__dirname, 'uploads/backgrounds');
const TEST_FILE_PATH = path.join(UPLOADS_DIR, TEST_FILENAME_JPG);

// if (!fs.existsSync(UPLOADS_DIR)) {
//    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
// }
// fs.writeFileSync(TEST_FILE_PATH, 'dummy content');

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

async function verifyDeletion() {
    try {
        console.log('1. Logging in...');
        const login = await request('POST', '/auth/login', { email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
        const token = login.data.token;

        console.log('2. Triggering Sync to find the new file...');
        const syncRes = await request('GET', '/backgrounds', null, { Authorization: `Bearer ${token}` });
        const bg = syncRes.data.backgrounds.find(b => b.public_id === TEST_FILENAME_JPG);

        if (!bg) {
            console.error('❌ Sync did not pick up the test file.');
            console.log('Available backgrounds:', syncRes.data.backgrounds.map(b => b.public_id));
            return;
        }
        console.log(`✅ File found in DB: ID=${bg.id}, PublicID="${bg.public_id}"`);

        console.log('3. Deleting via API...');
        await request('DELETE', `/backgrounds/${bg.id}`, null, { Authorization: `Bearer ${token}` });

        console.log('4. Checking disk...');
        if (fs.existsSync(TEST_FILE_PATH)) {
            console.error('❌ File STILL EXISTS on disk!');
        } else {
            console.log('✅ File successfully removed from disk.');
        }

    } catch (e) {
        console.error('Error:', e.message);
    }
}

verifyDeletion();
