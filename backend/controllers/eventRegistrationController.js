const { EventRegistration, Event } = require('../models');

// @desc    Register for an event
// @route   POST /api/content/events/:id/register
// @access  Public
exports.registerForEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { name, email, phone, university } = req.body;

        // Verify event exists
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Create the registration
        const registration = await EventRegistration.create({
            event_id: eventId,
            name,
            email,
            phone,
            university,
            status: 'pending' // default
        });

        res.status(201).json({
            message: 'Successfully registered for event',
            registration
        });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'Failed to process registration' });
    }
};

// @desc    Get all registrations for admin
// @route   GET /api/admin/event-registrations
// @access  Private/Admin
exports.getAllRegistrations = async (req, res) => {
    try {
        const registrations = await EventRegistration.findAll({
            include: [{ model: Event, as: 'event', attributes: ['title', 'event_date'] }],
            order: [['created_at', 'DESC']]
        });
        
        res.status(200).json({ registrations });
    } catch (error) {
        console.error('Fetch Registrations Error:', error);
        res.status(500).json({ error: 'Failed to fetch event registrations' });
    }
};
