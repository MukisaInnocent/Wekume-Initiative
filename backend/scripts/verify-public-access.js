const http = require('http');
const fs = require('fs');
const path = require('path');

const API_PORT = 5000;
const UPLOADS_DIR = path.join(__dirname, 'uploads/backgrounds');

function checkImageAccess(filename) {
    return new Promise((resolve) => {
        const path = `/uploads/backgrounds/${encodeURIComponent(filename)}`;
        const url = `http://localhost:${API_PORT}${path}`;

        console.log(`Testing access to: ${url}`);

        const req = http.get(url, (res) => {
            console.log(`Status Code: ${res.statusCode}`);
            console.log(`Content-Type: ${res.headers['content-type']}`);
            console.log(`Access-Control-Allow-Origin: ${res.headers['access-control-allow-origin']}`);
            console.log(`Cross-Origin-Resource-Policy: ${res.headers['cross-origin-resource-policy']}`);

            if (res.statusCode === 200 && res.headers['content-type'].startsWith('image/')) {
                console.log('✅ Image is ACCESSIBLE publicly.');
                resolve(true);
            } else {
                console.error('❌ Image access FAILED.');
                resolve(false);
            }
        });

        req.on('error', (e) => {
            console.error(`Request error: ${e.message}`);
            resolve(false);
        });
    });
}

async function run() {
    if (!fs.existsSync(UPLOADS_DIR)) {
        console.error('Uploads dir missing!');
        return;
    }

    const files = fs.readdirSync(UPLOADS_DIR).filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));

    if (files.length === 0) {
        console.log('No images found to test.');
        return;
    }

    const sample = files[0];
    console.log(`Found file on disk: ${sample}`);
    await checkImageAccess(sample);
}

run();
