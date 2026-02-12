const { BackgroundImage } = require('../models');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

exports.getAllBackgrounds = async (req, res) => {
    try {
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

        // Upload to Cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'wekume_backgrounds' },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        };

        const result = await streamUpload(req.file.buffer);

        // Save to DB
        const background = await BackgroundImage.create({
            image_url: result.secure_url,
            public_id: result.public_id,
            is_active: true, // Default to active
            uploaded_by: req.user.id
        });

        res.status(201).json({ message: 'Background uploaded successfully', background });
    } catch (error) {
        console.error('Upload background error:', error);
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

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(background.public_id);

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
