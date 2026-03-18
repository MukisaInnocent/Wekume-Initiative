const {
    ContentSection,
    Partner,
    Event,
    Testimonial,
    Report,
    Value,
    WekumeAppFeature,
    SocialLink,
    TeamMember,
    ImpactMetric,
    ConfigurableBlock,
    Resource
} = require('../models');
const { Op } = require('sequelize');

// ===== CONTENT SECTIONS =====

exports.getAllContentSections = async (req, res) => {
    try {
        const { region } = req.query;
        const where = {};
        if (region && (region === 'ug' || region === 'us')) {
            where.region = { [Op.in]: [region, 'global'] };
        }

        const sections = await ContentSection.findAll({
            where,
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
        const { region } = req.query;
        const where = { is_active: true };
        if (region && (region === 'ug' || region === 'us')) {
            where.region = { [Op.in]: [region, 'global'] };
        }

        const partners = await Partner.findAll({
            where,
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
        const { region, category } = req.query;
        const where = { is_published: true };
        if (region && (region === 'ug' || region === 'us')) {
            where.region = { [Op.in]: [region, 'global'] };
        }
        if (category) {
            where.category = category;
        }

        const events = await Event.findAll({
            where,
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
        const { region } = req.query;
        const where = { is_approved: true };
        if (region && (region === 'ug' || region === 'us')) {
            where.region = { [Op.in]: [region, 'global'] };
        }

        const testimonials = await Testimonial.findAll({
            where,
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
// ===== NEW REGIONAL MODELS =====

exports.getTeamMembers = async (req, res) => {
    try {
        const { region } = req.query;
        const where = { is_active: true };
        if (region && (region === 'ug' || region === 'us')) {
            where.region = { [Op.in]: [region, 'global'] };
        }
        const members = await TeamMember.findAll({ where, order: [['display_order', 'ASC']] });
        res.json({ members });
    } catch (error) {
        console.error('Get team members error:', error);
        res.status(500).json({ error: 'Failed to fetch team members' });
    }
};

exports.getImpactMetrics = async (req, res) => {
    try {
        const { region } = req.query;
        const where = {};
        if (region && (region === 'ug' || region === 'us')) {
            where.region = { [Op.in]: [region, 'global'] };
        }
        const metrics = await ImpactMetric.findAll({ where, order: [['display_order', 'ASC']] });
        res.json({ metrics });
    } catch (error) {
        console.error('Get impact metrics error:', error);
        res.status(500).json({ error: 'Failed to fetch impact metrics' });
    }
};

exports.getConfigurableBlocks = async (req, res) => {
    try {
        const { region, type } = req.query;
        const where = { is_active: true };
        if (region && (region === 'ug' || region === 'us')) {
            where.region = { [Op.in]: [region, 'global'] };
        }
        if (type) {
            where.block_type = type;
        }
        const blocks = await ConfigurableBlock.findAll({ where, order: [['display_order', 'ASC']] });
        res.json({ blocks });
    } catch (error) {
        console.error('Get configurable blocks error:', error);
        res.status(500).json({ error: 'Failed to fetch blocks' });
    }
};

exports.getResources = async (req, res) => {
    try {
        const { region, type } = req.query;
        const where = { is_published: true };
        if (region && (region === 'ug' || region === 'us')) {
            where.region = { [Op.in]: [region, 'global'] };
        }
        if (type) {
            where.resource_type = type;
        }
        const resources = await Resource.findAll({ where, order: [['created_at', 'DESC']] });
        res.json({ resources });
    } catch (error) {
        console.error('Get resources error:', error);
        res.status(500).json({ error: 'Failed to fetch resources' });
    }
};
