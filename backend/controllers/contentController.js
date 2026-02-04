const {
    ContentSection,
    Partner,
    Event,
    Testimonial,
    Report,
    Value,
    WekumeAppFeature,
    SocialLink
} = require('../models');

// ===== CONTENT SECTIONS =====

exports.getAllContentSections = async (req, res) => {
    try {
        const sections = await ContentSection.findAll({
            order: [['section_key', 'ASC']]
        });
        res.json({ sections });
    } catch (error) {
        console.error('Get content sections error:', error);
        res.status(500).json({ error: 'Failed to fetch content sections' });
    }
};

exports.getContentSection = async (req, res) => {
    try {
        const { key } = req.params;
        const section = await ContentSection.findOne({ where: { section_key: key } });

        if (!section) {
            return res.status(404).json({ error: 'Content section not found' });
        }

        res.json({ section });
    } catch (error) {
        console.error('Get content section error:', error);
        res.status(500).json({ error: 'Failed to fetch content section' });
    }
};

// ===== PARTNERS =====

exports.getAllPartners = async (req, res) => {
    try {
        const partners = await Partner.findAll({
            where: { is_active: true },
            order: [['display_order', 'ASC']]
        });
        res.json({ partners });
    } catch (error) {
        console.error('Get partners error:', error);
        res.status(500).json({ error: 'Failed to fetch partners' });
    }
};

// ===== EVENTS =====

exports.getPublishedEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            where: { is_published: true },
            order: [['event_date', 'DESC']]
        });
        res.json({ events });
    } catch (error) {
        console.error('Get events error:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findOne({
            where: { id, is_published: true }
        });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json({ event });
    } catch (error) {
        console.error('Get event error:', error);
        res.status(500).json({ error: 'Failed to fetch event' });
    }
};

// ===== TESTIMONIALS =====

exports.getApprovedTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll({
            where: { is_approved: true },
            order: [['is_featured', 'DESC'], ['created_at', 'DESC']]
        });
        res.json({ testimonials });
    } catch (error) {
        console.error('Get testimonials error:', error);
        res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
};

// ===== REPORTS =====

exports.getPublishedReports = async (req, res) => {
    try {
        const reports = await Report.findAll({
            where: { is_published: true },
            order: [['year', 'DESC']]
        });
        res.json({ reports });
    } catch (error) {
        console.error('Get reports error:', error);
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
};

// Increment download count
exports.downloadReport = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await Report.findByPk(id);

        if (!report || !report.is_published) {
            return res.status(404).json({ error: 'Report not found' });
        }

        // Increment download count
        report.download_count += 1;
        await report.save();

        res.json({ message: 'Download counted', file_url: report.file_url });
    } catch (error) {
        console.error('Download report error:', error);
        res.status(500).json({ error: 'Failed to process download' });
    }
};

// ===== VALUES =====

exports.getActiveValues = async (req, res) => {
    try {
        const values = await Value.findAll({
            where: { is_active: true },
            order: [['display_order', 'ASC']]
        });
        res.json({ values });
    } catch (error) {
        console.error('Get values error:', error);
        res.status(500).json({ error: 'Failed to fetch values' });
    }
};

// ===== WEKUME APP FEATURES =====

exports.getAppFeatures = async (req, res) => {
    try {
        const features = await WekumeAppFeature.findAll({
            where: { is_active: true },
            order: [['display_order', 'ASC']]
        });
        res.json({ features });
    } catch (error) {
        console.error('Get app features error:', error);
        res.status(500).json({ error: 'Failed to fetch app features' });
    }
};

// ===== SOCIAL LINKS =====

exports.getSocialLinks = async (req, res) => {
    try {
        const links = await SocialLink.findAll({
            where: { is_active: true },
            order: [['display_order', 'ASC']]
        });
        res.json({ links });
    } catch (error) {
        console.error('Get social links error:', error);
        res.status(500).json({ error: 'Failed to fetch social links' });
    }
};
