const { Donation } = require('../models');

exports.createDonation = async (req, res) => {
    try {
        const { donor_name, email, phone_number, amount, currency, payment_method, message, is_anonymous } = req.body;

        // Validation
        if (!amount || !payment_method) {
            return res.status(400).json({ error: 'Amount and payment method are required' });
        }

        // For mobile money/bank transfer, we create a "pending" record initially
        // In a real integration, we would initiate the payment gateway request here

        const donation = await Donation.create({
            donor_name: is_anonymous ? 'Anonymous' : donor_name,
            email,
            phone_number,
            amount,
            currency: currency || 'UGX',
            payment_method,
            message,
            is_anonymous,
            status: 'pending', // Pending actual payment confirmation
            transaction_reference: `WEK-${Date.now()}-${Math.floor(Math.random() * 1000)}`
        });

        // If this were Stripe/Flutterwave, we would return the payment link or client secret here

        res.status(201).json({
            message: 'Donation initiated successfully',
            donation,
            instructions: getPaymentInstructions(payment_method, donation.transaction_reference)
        });
    } catch (error) {
        console.error('Create donation error:', error);
        res.status(500).json({ error: 'Failed to process donation request' });
    }
};

exports.getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json({ donations });
    } catch (error) {
        console.error('Get donations error:', error);
        res.status(500).json({ error: 'Failed to fetch donations' });
    }
};

// Helper for manual payment instructions
const getPaymentInstructions = (method, ref) => {
    if (method === 'mobile_money') {
        return `Please send Money to +256 000 000 000 using Ref: ${ref}`;
    } else if (method === 'bank_transfer') {
        return `Transfer to Stanbic Bank A/C 9030000000000 using Ref: ${ref}`;
    }
    return '';
};
