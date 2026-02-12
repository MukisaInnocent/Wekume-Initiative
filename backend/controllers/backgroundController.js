const { BackgroundImage } = require('../models');
// const cloudinary = require('../config/cloudinary'); // Removed Cloudinary
// const streamifier = require('streamifier'); // Removed streamifier
const fs = require('fs');
const path = require('path');

exports.getAllBackgrounds = async (req, res) => {
    try {
        // --- SYNC LOGIC START ---
        const uploadDir = path.join(__dirname, '../uploads/backgrounds');

        // Ensure directory exists
        if (fs.existsSync(uploadDir)) {
            const files = fs.readdirSync(uploadDir);

            // Get all existing public_ids from DB
            const existingBackgrounds = await BackgroundImage.findAll({
                attributes: ['id', 'public_id']
            });
            const existingPublicIds = new Set(existingBackgrounds.map(bg => bg.public_id));

            // Find files that are not in DB
            const newFiles = files.filter(file => {
                // Filter for images only (basic check)
                const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
                return isImage && !existingPublicIds.has(file);
            });

            if (newFiles.length > 0) {
                console.log(`Found ${newFiles.length} new background images on disk. Syncing...`);

                const protocol = req.protocol;
                const host = req.get('host');

                const newRecords = newFiles.map(filename => ({
                    image_url: `${protocol}://${host}/uploads/backgrounds/${encodeURIComponent(filename)}`,
                    public_id: filename,
                    is_active: false, // Default to inactive for auto-discovered files
                    uploaded_by: req.user ? req.user.id : null // Use current admin if available, else null
                }));

                await BackgroundImage.bulkCreate(newRecords);
            }

            // --- CLEANUP ORPHANED RECORDS START ---
            // Identify and remove DB records where the file no longer exists on disk
            const filesSet = new Set(files);
            const orphanedRecords = existingBackgrounds.filter(bg => !filesSet.has(bg.public_id));

            if (orphanedRecords.length > 0) {
                console.log(`Found ${orphanedRecords.length} orphaned background records. Cleaning up...`);
                const orphanedIds = orphanedRecords.map(bg => bg.id);
                await BackgroundImage.destroy({ where: { id: orphanedIds } });
            }
            // --- CLEANUP ORPHANED RECORDS END ---
        }
        // --- SYNC LOGIC END ---

        // Fetch all backgrounds, active or not, ordered by display_order
        // Admins might want to see inactive ones too
        const backgrounds = await BackgroundImage.findAll({
            order: [['display_order', 'ASC'], ['created_at', 'DESC']]
        });
        res.json({ backgrounds });
    } catch (error) {
        console.error('Get all backgrounds error:', error);
        res.status(500).json({ error: 'Failed to fetch background images' });
    }
};

exports.getActiveBackgrounds = async (req, res) => {
    try {
        const backgrounds = await BackgroundImage.findAll({
            where: { is_active: true },
            order: [['display_order', 'ASC'], ['created_at', 'DESC']]
        });
        res.json({ backgrounds });
    } catch (error) {
        console.error('Get active backgrounds error:', error);
        res.status(500).json({ error: 'Failed to fetch active background images' });
    }
};

exports.uploadBackground = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Local file path (accessible via static route)
        // Ensure FRONTEND_URL or server base URL is used to construct full URL if needed,
        // or just store relative path. For simplicity and portability, let's store the full URL
        // assuming standard static serving setup.

        // Construct URL: http://localhost:5000/uploads/backgrounds/filename
        const protocol = req.protocol;
        const host = req.get('host');
        const fileUrl = `${protocol}://${host}/uploads/backgrounds/${encodeURIComponent(req.file.filename)}`;

        // Save to DB
        const background = await BackgroundImage.create({
            image_url: fileUrl,
            public_id: req.file.filename, // Store filename as public_id for local deletion
            is_active: true, // Default to active
            uploaded_by: req.user.id
        });

        res.status(201).json({ message: 'Background uploaded successfully', background });
    } catch (error) {
        console.error('Upload background error:', error);
        // Clean up uploaded file if DB save fails
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Failed to delete uploaded file after error:', err);
            });
        }
        res.status(500).json({ error: 'Failed to upload background image' });
    }
};

exports.deleteBackground = async (req, res) => {
    try {
        const { id } = req.params;
        const background = await BackgroundImage.findByPk(id);

        if (!background) {
            return res.status(404).json({ error: 'Background image not found' });
        }

        // Delete from Local Storage
        const filePath = path.join(__dirname, '../uploads/backgrounds', background.public_id);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.warn(`Failed to delete local file: ${filePath}. It may have already been deleted. Error: ${err.message}`);
            }
        });

        // Delete from DB
        await background.destroy();

        res.json({ message: 'Background image deleted successfully' });
    } catch (error) {
        console.error('Delete background error:', error);
        res.status(500).json({ error: 'Failed to delete background image' });
    }
};

exports.updateBackground = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_active, display_order } = req.body;

        const background = await BackgroundImage.findByPk(id);
        if (!background) {
            return res.status(404).json({ error: 'Background image not found' });
        }

        await background.update({
            is_active: is_active !== undefined ? is_active : background.is_active,
            display_order: display_order !== undefined ? display_order : background.display_order
        });

        res.json({ message: 'Background updated successfully', background });
    } catch (error) {
        console.error('Update background error:', error);
        res.status(500).json({ error: 'Failed to update background image' });
    }
};
