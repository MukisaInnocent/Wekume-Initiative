const { SupportForm, VolunteerApplication } = require('../models');

// ===== SUPPORT FORMS =====

exports.submitSupportForm = async (req, res) => {
    try {
        const { name, email, phone, subject, message, form_type } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                error: 'Please provide name, email, and message'
            });
        }

        const form = await SupportForm.create({
            name,
            email,
            phone,
            subject,
            message,
            form_type: form_type || 'contact'
        });

        res.status(201).json({
            message: 'Form submitted successfully',
            form
        });
    } catch (error) {
        console.error('Submit support form error:', error);
        res.status(500).json({ error: 'Failed to submit form' });
    }
};

// ===== VOLUNTEER APPLICATIONS =====

exports.submitVolunteerApplication = async (req, res) => {
    try {
        const { fullname, email, phone, age, skills, availability, motivation } = req.body;

        if (!fullname || !email) {
            return res.status(400).json({
                error: 'Please provide fullname and email'
            });
        }

        const application = await VolunteerApplication.create({
            fullname,
            email,
            phone,
            age,
            skills,
            availability,
            motivation
        });

        res.status(201).json({
            message: 'Volunteer application submitted successfully',
            application
        });
    } catch (error) {
        console.error('Submit volunteer application error:', error);
        res.status(500).json({ error: 'Failed to submit application' });
    }
};
