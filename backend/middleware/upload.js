const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Helper function to generate unique filename: {timestamp}-{randomID}.{ext}
const generateUniqueFileName = (file) => {
    const timestamp = Date.now();
    const randomId = crypto.randomBytes(4).toString('hex');
    const ext = path.extname(file.originalname).toLowerCase();
    return `${timestamp}-${randomId}${ext}`;
};

// Disk storage with automatic unique naming
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Determine upload directory based on request path
        let uploadDir = path.join(__dirname, '../uploads');
        
        if (req.baseUrl.includes('backgrounds')) {
            uploadDir = path.join(__dirname, '../uploads/backgrounds');
        } else if (req.baseUrl.includes('media')) {
            uploadDir = path.join(__dirname, '../uploads/media');
        } else {
            uploadDir = path.join(__dirname, '../uploads');
        }
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueFileName = generateUniqueFileName(file);
        cb(null, uniqueFileName);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Allow only images (JPG, PNG, WEBP) as per mandatory requirement
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Upload failed. Only JPG, PNG, and WEBP images are supported.'));
        }
    }
});

module.exports = upload;
