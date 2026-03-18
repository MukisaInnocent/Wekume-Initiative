const { Donation } = require('../models');

/**
 * Create a new donation
 * POST /api/donations
 */
exports.createDonation = async (req, res) => {
    try {
        const {
            donor_name,
            email,
            phone_number,
            amount,
            currency,
            payment_method,
            message,
            is_anonymous,
            donation_type
        } = req.body;

        // Comprehensive validation
        const errors = [];

        if (!donor_name || donor_name.trim() === '') {
            errors.push('Full name is required');
        }

        if (!email || email.trim() === '') {
            errors.push('Email is required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('Invalid email format');
        }

        if (!phone_number || phone_number.trim() === '') {
            errors.push('Phone number is required for transaction confirmation');
        } else if (!/^(\+256|0)[0-9]{9}$/.test(phone_number.replace(/\s/g, ''))) {
            errors.push('Invalid Ugandan phone number format. Use +256... or 07...');
        }

        if (!amount || amount < 1000) {
            errors.push('Minimum donation amount is UGX 1,000');
        }

        if (!payment_method || !['mobile_money', 'bank_transfer'].includes(payment_method)) {
            errors.push('Valid payment method is required (mobile_money or bank_transfer)');
        }

        if (errors.length > 0) {
            return res.status(400).json({
                error: 'Validation failed',
                details: errors
            });
        }

        // Generate unique transaction reference
        const transactionRef = `WKM-${Date.now()}`;

        // Create donation record
        const donation = await Donation.create({
            donor_name: is_anonymous ? 'Anonymous' : donor_name,
            email,
            phone_number,
            amount,
            currency: currency || 'UGX',
            payment_method,
            message: message || '',
            is_anonymous: is_anonymous || false,
            donation_type: donation_type || 'one-time',
            status: 'pending', // Pending actual payment confirmation
            transaction_reference: transactionRef
        });

        // Get payment instructions based on method
        const instructions = getPaymentInstructions(payment_method, transactionRef, amount);

        // TODO: Send confirmation email
        await sendConfirmationEmail(donation, instructions);

        // TODO: Send SMS notification
        await sendSMSNotification(donation, transactionRef);

        res.status(201).json({
            message: 'Donation initiated successfully',
            transaction_ref: transactionRef,
            instructions,
            donation: {
                id: donation.id,
                amount: donation.amount,
                currency: donation.currency,
                payment_method: donation.payment_method,
                donation_type: donation.donation_type,
                status: donation.status
            }
        });
    } catch (error) {
        console.error('Create donation error:', error);

        // Handle Sequelize validation errors
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Validation failed',
                details: error.errors.map(e => e.message)
            });
        }

        res.status(500).json({ error: 'Failed to process donation request' });
    }
};

/**
 * Get all donations (Admin only)
 * GET /api/donations
 */
exports.getAllDonations = async (req, res) => {
    try {
        const { status, payment_method, donation_type } = req.query;

        const whereClause = {};
        if (status) whereClause.status = status;
        if (payment_method) whereClause.payment_method = payment_method;
        if (donation_type) whereClause.donation_type = donation_type;

        const donations = await Donation.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']]
        });

        // Calculate statistics
        const stats = {
            total: donations.length,
            total_amount: donations.reduce((sum, d) => sum + parseFloat(d.amount), 0),
            pending: donations.filter(d => d.status === 'pending').length,
            completed: donations.filter(d => d.status === 'completed').length,
            monthly_donors: donations.filter(d => d.donation_type === 'monthly').length
        };

        res.json({ donations, stats });
    } catch (error) {
        console.error('Get donations error:', error);
        res.status(500).json({ error: 'Failed to fetch donations' });
    }
};

/**
 * Update donation status (Admin only)
 * PATCH /api/donations/:id
 */
exports.updateDonationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'completed', 'failed'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const donation = await Donation.findByPk(id);
        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }

        donation.status = status;
        await donation.save();

        // If status changed to completed, send thank you email/SMS
        if (status === 'completed') {
            await sendThankYouEmail(donation);
            await sendThankYouSMS(donation);
        }

        res.json({
            message: 'Donation status updated successfully',
            donation
        });
    } catch (error) {
        console.error('Update donation error:', error);
        res.status(500).json({ error: 'Failed to update donation status' });
    }
};

/**
 * Get single donation by ID
 * GET /api/donations/:id
 */
exports.getDonation = async (req, res) => {
    try {
        const { id } = req.params;
        const donation = await Donation.findByPk(id);

        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }

        res.json({ donation });
    } catch (error) {
        console.error('Get donation error:', error);
        res.status(500).json({ error: 'Failed to fetch donation' });
    }
};

// ===== Helper Functions =====

/**
 * Generate payment instructions based on payment method
 */
const getPaymentInstructions = (method, ref, amount) => {
    if (method === 'mobile_money') {
        return `To complete your donation:
        
1. Dial *165# (MTN) or *185# (Airtel)
2. Select Send Money
3. Enter: +256 700 000 000
4. Enter amount: ${parseInt(amount).toLocaleString()} UGX
5. Use reference: ${ref}

Your donation will be confirmed via SMS once payment is received.`;
    } else if (method === 'bank_transfer') {
        return `To complete your donation via bank transfer:

Bank: Stanbic Bank Uganda
Account Name: Wekume Initiative
Account Number: 9030000000000
Branch: Kampala Main Branch
Reference: ${ref}

Please use the reference number when making your transfer. Confirmation will be sent once payment is received.`;
    }
    return '';
};

/**
 * Send confirmation email (TODO: Implement with actual email service)
 */
const sendConfirmationEmail = async (donation, instructions) => {
    // TODO: Integrate with Nodemailer or SendGrid
    console.log('📧 EMAIL CONFIRMATION:');
    console.log(`To: ${donation.email}`);
    console.log(`Subject: Donation Confirmation - ${donation.transaction_reference}`);
    console.log(`Body: Thank you ${donation.donor_name} for your ${donation.amount} UGX donation!`);
    console.log(`Instructions: ${instructions}`);
    console.log('---');

    // Example integration (uncomment when ready):
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail({
    //     from: 'donations@wekume.org',
    //     to: donation.email,
    //     subject: `Donation Confirmation - ${donation.transaction_reference}`,
    //     html: generateEmailHTML(donation, instructions)
    // });
};

/**
 * Send SMS notification (TODO: Implement with actual SMS service)
 */
const sendSMSNotification = async (donation, ref) => {
    // TODO: Integrate with Africa's Talking or Twilio
    console.log('📱 SMS NOTIFICATION:');
    console.log(`To: ${donation.phone_number}`);
    console.log(`Message: Thank you for your ${donation.amount} UGX donation to Wekume Initiative! Ref: ${ref}. Complete payment to confirm.`);
    console.log('---');

    // Example integration (uncomment when ready):
    // const africastalking = require('africastalking')({...});
    // await africastalking.SMS.send({
    //     to: [donation.phone_number],
    //     message: `Thank you for your ${donation.amount} UGX donation to Wekume Initiative! Ref: ${ref}. Complete payment to confirm.`
    // });
};

/**
 * Send thank you email after payment completion
 */
const sendThankYouEmail = async (donation) => {
    console.log('📧 THANK YOU EMAIL:');
    console.log(`To: ${donation.email}`);
    console.log(`Subject: Thank You for Your Donation!`);
    console.log(`Body: Dear ${donation.donor_name}, your payment of ${donation.amount} UGX has been confirmed. Thank you for your generous support!`);
    console.log('---');
};

/**
 * Send thank you SMS after payment completion
 */
const sendThankYouSMS = async (donation) => {
    console.log('📱 THANK YOU SMS:');
    console.log(`To: ${donation.phone_number}`);
    console.log(`Message: Payment confirmed! Thank you for your ${donation.amount} UGX donation to Wekume Initiative. You're making a difference!`);
    console.log('---');
};

module.exports = exports;
