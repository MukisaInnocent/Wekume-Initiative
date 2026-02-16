const { BackgroundImage } = require('../models');
// const cloudinary = require('../config/cloudinary'); // Removed Cloudinary
// const streamifier = require('streamifier'); // Removed streamifier
const fs = require('fs');
const path = require('path');

exports.getAllBackgrounds = async (req, res) => {
    try {
        const uploadDir = path.join(__dirname, '../uploads/backgrounds');

        // 1. Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            // If no folder, no images. Return empty list.
            return res.json({ backgrounds: [] });
        }

        // 2. Read DIRECTORY - Source of Truth
        const files = fs.readdirSync(uploadDir).filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
        const protocol = req.protocol;
        const host = req.get('host');

        // 3. Fetch existing DB metadata
        const dbBackgrounds = await BackgroundImage.findAll();
        const dbMap = new Map(dbBackgrounds.map(bg => [bg.public_id, bg]));

        const currentBackgrounds = [];

        // 4. Build List from FILES
        for (const filename of files) {
            let bg = dbMap.get(filename);

            if (!bg) {
                // File exists but no DB record -> Create it immediately
                console.log(`Auto-creating record for found file: ${filename}`);
                bg = await BackgroundImage.create({
                    image_url: `${protocol}://${host}/uploads/backgrounds/${encodeURIComponent(filename)}`,
                    public_id: filename,
                    is_active: false,
                    uploaded_by: req.user ? req.user.id : null
                });
            } else {
                // Ensure URL is correct (in case of protocol change etc)
                const expectedUrl = `${protocol}://${host}/uploads/backgrounds/${encodeURIComponent(filename)}`;
                if (bg.image_url !== expectedUrl) {
                    // bg.image_url = expectedUrl; // Optional update if needed
                }
            }
            currentBackgrounds.push(bg);
        }

        // 5. Cleanup Ghosts (DB records with no file)
        const fileSet = new Set(files);
        const ghosts = dbBackgrounds.filter(bg => !fileSet.has(bg.public_id));

        if (ghosts.length > 0) {
            console.log(`Removing ${ghosts.length} ghost records.`);
            const ghostIds = ghosts.map(bg => bg.id);
            await BackgroundImage.destroy({ where: { id: ghostIds } });
        }

        // 6. Return the FILE-BASED list
        // Sort by active first, then display order, then new
        currentBackgrounds.sort((a, b) => {
            // (Sorting logic can remain simple or same as DB)
            return (a.display_order - b.display_order) || (new Date(b.created_at) - new Date(a.created_at));
        });

        res.json({ backgrounds: currentBackgrounds });

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
