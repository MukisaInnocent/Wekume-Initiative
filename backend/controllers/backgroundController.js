const { BackgroundImage } = require('../models');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');
const fs = require('fs');
const path = require('path');

exports.getAllBackgrounds = async (req, res) => {
    try {
        const backgrounds = await BackgroundImage.findAll({
            order: [
                ['is_active', 'DESC'],
                ['display_order', 'ASC'],
                ['created_at', 'DESC']
            ]
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
            return res.status(400).json({ error: 'Upload failed. No file selected.' });
        }

        // File is already saved to disk by Multer
        const fileName = req.file.filename;
        
        // Generate URL
        const protocol = req.protocol;
        const host = req.get('host');
        const fileUrl = `${protocol}://${host}/uploads/backgrounds/${fileName}`;

        // Save to DB
        const background = await BackgroundImage.create({
            image_url: fileUrl,
            public_id: fileName,
            is_active: true, // Default to active
            uploaded_by: req.user.id
        });

        res.status(201).json({ 
            message: 'Image uploaded successfully', 
            background 
        });
    } catch (error) {
        // If file was saved but DB error occurred, try to clean up
        if (req.file && req.file.path) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (e) {
                // Ignore cleanup errors
            }
        }
        console.error('Upload background error:', error);
        res.status(500).json({ error: 'Upload failed. Please try again.' });
    }
};

exports.deleteBackground = async (req, res) => {
    try {
        const { id } = req.params;
        const background = await BackgroundImage.findByPk(id);

        if (!background) {
            return res.status(404).json({ error: 'Background image not found' });
        }

        // Delete file from disk
        if (background.public_id) {
            const filePath = path.join(__dirname, '../uploads/backgrounds', background.public_id);
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            } catch (fileErr) {
                console.error('Failed to delete file from disk:', fileErr);
            }
        }

        // Delete from DB
        await background.destroy();

        res.json({ message: 'Background image deleted successfully' });
    } catch (error) {
        console.error('Delete background error:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
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
