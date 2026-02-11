const {
    ContentSection,
    Partner,
    Event,
    Testimonial,
    Report,
    Value,
    WekumeAppFeature,
    SocialLink,
    SupportForm,
    VolunteerApplication,
    AIAssistantLog,
    PageAnalytics,
    User
} = require('../models');

// ===== CONTENT SECTIONS MANAGEMENT =====

exports.updateContentSection = async (req, res) => {
    try {
        const { key } = req.params;
        const { section_title, content_type, content_text, image_url } = req.body;

        let section = await ContentSection.findOne({ where: { section_key: key } });

        if (!section) {
            // Create new section if it doesn't exist
            section = await ContentSection.create({
                section_key: key,
                section_title,
                content_type,
                content_text,
                image_url,
                last_updated_by: req.user.id
            });
        } else {
            // Update existing section
            await section.update({
                section_title: section_title || section.section_title,
                content_type: content_type || section.content_type,
                content_text: content_text !== undefined ? content_text : section.content_text,
                image_url: image_url !== undefined ? image_url : section.image_url,
                last_updated_by: req.user.id
            });
        }

        res.json({ message: 'Content section updated successfully', section });
    } catch (error) {
        console.error('Update content section error:', error);
        res.status(500).json({ error: 'Failed to update content section' });
    }
};

// ===== EVENTS MANAGEMENT =====

exports.createEvent = async (req, res) => {
    try {
        const { title, description, event_type, event_date, location, banner_image_url, registration_link } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Event title is required' });
        }

        const event = await Event.create({
            title,
            description,
            event_type,
            event_date,
            location,
            banner_image_url,
            registration_link,
            created_by: req.user.id,
            is_published: false
        });

        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        console.error('Create event error:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        await event.update(updateData);
        res.json({ message: 'Event updated successfully', event });
    } catch (error) {
        console.error('Update event error:', error);
        res.status(500).json({ error: 'Failed to update event' });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        await event.destroy();
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Delete event error:', error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            order: [['event_date', 'DESC']],
            include: [{ model: User, as: 'creator', attributes: ['id', 'fullname', 'email'] }]
        });
        res.json({ events });
    } catch (error) {
        console.error('Get all events error:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

// ===== PARTNERS MANAGEMENT =====

exports.createPartner = async (req, res) => {
    try {
        const { name, type, logo_url, website, description, display_order } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Partner name is required' });
        }

        const partner = await Partner.create({
            name,
            type,
            logo_url,
            website,
            description,
            display_order: display_order || 0,
            is_active: true
        });

        res.status(201).json({ message: 'Partner created successfully', partner });
    } catch (error) {
        console.error('Create partner error:', error);
        res.status(500).json({ error: 'Failed to create partner' });
    }
};

exports.updatePartner = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const partner = await Partner.findByPk(id);
        if (!partner) {
            return res.status(404).json({ error: 'Partner not found' });
        }

        await partner.update(updateData);
        res.json({ message: 'Partner updated successfully', partner });
    } catch (error) {
        console.error('Update partner error:', error);
        res.status(500).json({ error: 'Failed to update partner' });
    }
};

exports.deletePartner = async (req, res) => {
    try {
        const { id } = req.params;

        const partner = await Partner.findByPk(id);
        if (!partner) {
            return res.status(404).json({ error: 'Partner not found' });
        }

        await partner.destroy();
        res.json({ message: 'Partner deleted successfully' });
    } catch (error) {
        console.error('Delete partner error:', error);
        res.status(500).json({ error: 'Failed to delete partner' });
    }
};

exports.getAllPartners = async (req, res) => {
    try {
        const partners = await Partner.findAll({
            order: [['display_order', 'ASC']]
        });
        res.json({ partners });
    } catch (error) {
        console.error('Get all partners error:', error);
        res.status(500).json({ error: 'Failed to fetch partners' });
    }
};

// ===== TESTIMONIALS MANAGEMENT =====

exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll({
            order: [['created_at', 'DESC']]
        });
        res.json({ testimonials });
    } catch (error) {
        console.error('Get all testimonials error:', error);
        res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
};

exports.approveTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_approved, is_featured } = req.body;

        const testimonial = await Testimonial.findByPk(id);
        if (!testimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }

        await testimonial.update({
            is_approved: is_approved !== undefined ? is_approved : testimonial.is_approved,
            is_featured: is_featured !== undefined ? is_featured : testimonial.is_featured
        });

        res.json({ message: 'Testimonial updated successfully', testimonial });
    } catch (error) {
        console.error('Approve testimonial error:', error);
        res.status(500).json({ error: 'Failed to update testimonial' });
    }
};

exports.createTestimonial = async (req, res) => {
    try {
        const { author_name, author_role, content, rating, photo_url, is_featured, is_approved } = req.body;

        if (!author_name || !content) {
            return res.status(400).json({ error: 'Author name and content are required' });
        }

        const testimonial = await Testimonial.create({
            author_name,
            author_role,
            content,
            rating: rating || 5,
            photo_url,
            is_featured: is_featured || false,
            is_approved: is_approved !== undefined ? is_approved : true // Auto-approve if created by admin
        });

        res.status(201).json({ message: 'Testimonial created successfully', testimonial });
    } catch (error) {
        console.error('Create testimonial error:', error);
        res.status(500).json({ error: 'Failed to create testimonial' });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;

        const testimonial = await Testimonial.findByPk(id);
        if (!testimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }

        await testimonial.destroy();
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Delete testimonial error:', error);
        res.status(500).json({ error: 'Failed to delete testimonial' });
    }
};

// ===== REPORTS MANAGEMENT =====

exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.findAll({
            order: [['year', 'DESC'], ['created_at', 'DESC']]
        });
        res.json({ reports });
    } catch (error) {
        console.error('Get all reports error:', error);
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
};

exports.createReport = async (req, res) => {
    try {
        const { title, description, year, file_url, category, is_published } = req.body;

        if (!title || !year) {
            return res.status(400).json({ error: 'Title and year are required' });
        }

        const report = await Report.create({
            title,
            description,
            year,
            file_url,
            category: category || 'annual',
            is_published: is_published !== undefined ? is_published : false,
            downloads: 0
        });

        res.status(201).json({ message: 'Report created successfully', report });
    } catch (error) {
        console.error('Create report error:', error);
        res.status(500).json({ error: 'Failed to create report' });
    }
};

exports.updateReport = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const report = await Report.findByPk(id);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }

        await report.update(updateData);
        res.json({ message: 'Report updated successfully', report });
    } catch (error) {
        console.error('Update report error:', error);
        res.status(500).json({ error: 'Failed to update report' });
    }
};

exports.deleteReport = async (req, res) => {
    try {
        const { id } = req.params;

        const report = await Report.findByPk(id);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }

        await report.destroy();
        res.json({ message: 'Report deleted successfully' });
    } catch (error) {
        console.error('Delete report error:', error);
        res.status(500).json({ error: 'Failed to delete report' });
    }
};

// ===== SUPPORT FORMS MANAGEMENT =====

exports.getAllSupportForms = async (req, res) => {
    try {
        const forms = await SupportForm.findAll({
            order: [['created_at', 'DESC']],
            include: [{ model: User, as: 'assignee', attributes: ['id', 'fullname'] }]
        });
        res.json({ forms });
    } catch (error) {
        console.error('Get support forms error:', error);
        res.status(500).json({ error: 'Failed to fetch support forms' });
    }
};

exports.updateSupportFormStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, assigned_to } = req.body;

        const form = await SupportForm.findByPk(id);
        if (!form) {
            return res.status(404).json({ error: 'Support form not found' });
        }

        await form.update({
            status: status || form.status,
            assigned_to: assigned_to || form.assigned_to
        });

        res.json({ message: 'Support form updated successfully', form });
    } catch (error) {
        console.error('Update support form error:', error);
        res.status(500).json({ error: 'Failed to update support form' });
    }
};

// ===== VOLUNTEER APPLICATIONS MANAGEMENT =====

exports.getAllVolunteerApplications = async (req, res) => {
    try {
        const applications = await VolunteerApplication.findAll({
            order: [['created_at', 'DESC']],
            include: [{ model: User, as: 'reviewer', attributes: ['id', 'fullname'] }]
        });
        res.json({ applications });
    } catch (error) {
        console.error('Get volunteer applications error:', error);
        res.status(500).json({ error: 'Failed to fetch volunteer applications' });
    }
};

exports.updateVolunteerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const application = await VolunteerApplication.findByPk(id);
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        await application.update({
            status,
            reviewed_by: req.user.id
        });

        res.json({ message: 'Application updated successfully', application });
    } catch (error) {
        console.error('Update volunteer status error:', error);
        res.status(500).json({ error: 'Failed to update application' });
    }
};

// ===== ANALYTICS =====

exports.getAnalytics = async (req, res) => {
    try {
        const stats = {
            totalEvents: await Event.count(),
            publishedEvents: await Event.count({ where: { is_published: true } }),
            totalPartners: await Partner.count({ where: { is_active: true } }),
            totalTestimonials: await Testimonial.count(),
            approvedTestimonials: await Testimonial.count({ where: { is_approved: true } }),
            supportForms: {
                total: await SupportForm.count(),
                new: await SupportForm.count({ where: { status: 'new' } }),
                inProgress: await SupportForm.count({ where: { status: 'in_progress' } }),
                resolved: await SupportForm.count({ where: { status: 'resolved' } })
            },
            volunteerApplications: {
                total: await VolunteerApplication.count(),
                pending: await VolunteerApplication.count({ where: { status: 'pending' } }),
                approved: await VolunteerApplication.count({ where: { status: 'approved' } })
            },
            aiInteractions: await AIAssistantLog.count()
        };

        res.json({ stats });
    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
};

const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// ... (previous code)

exports.uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Upload to Cloudinary using stream
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'wekume_cms' },
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

        // Return the file info provided by Cloudinary
        res.status(201).json({
            message: 'File uploaded successfully',
            file: {
                url: result.secure_url,
                public_id: result.public_id,
                format: result.format
            }
        });
    } catch (error) {
        console.error('Upload media error:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
};

module.exports = exports;
