import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { donationAPI } from '../services/api';
import { Heart, CreditCard, Smartphone, Check, ArrowRight, Mail, Phone, User, MessageSquare, AlertCircle, Copy, CheckCircle } from 'lucide-react';

function Donate() {
    const [donationType, setDonationType] = useState('one-time');
    const [amount, setAmount] = useState('50000');
    const [showCustomAmount, setShowCustomAmount] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('mobile_money');
    const [copied, setCopied] = useState(false);

    // Form State with enhanced contact details
    const [details, setDetails] = useState({
        donor_name: '',
        email: '',
        phone_number: '',
        message: '',
        is_anonymous: false
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [instructions, setInstructions] = useState(null);
    const [transactionRef, setTransactionRef] = useState(null);

    // Form validation
    const validateForm = () => {
        const newErrors = {};

        if (!details.donor_name.trim()) {
            newErrors.donor_name = 'Full name is required';
        }

        if (!details.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!details.phone_number.trim()) {
            newErrors.phone_number = 'Phone number is required for transaction confirmation';
        } else if (!/^(\+256|0)[0-9]{9}$/.test(details.phone_number.replace(/\s/g, ''))) {
            newErrors.phone_number = 'Please enter a valid Ugandan phone number (+256... or 07...)';
        }

        if (parseInt(amount) < 1000) {
            newErrors.amount = 'Minimum donation amount is UGX 1,000';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleDonate = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setStatus('submitting');
        setErrors({});

        try {
            const payload = {
                ...details,
                amount: parseInt(amount, 10),
                currency: 'UGX',
                payment_method: paymentMethod,
                donation_type: donationType
            };

            const response = await donationAPI.create(payload);
            setInstructions(response.data.instructions);
            setTransactionRef(response.data.transaction_ref || `WKM-${Date.now()}`);
            setStatus('success');

            // Simulate sending confirmation email/SMS
            console.log('Confirmation sent to:', details.email, details.phone_number);
        } catch (error) {
            console.error("Donation failed:", error);
            setStatus('error');
            setErrors({ submit: error.response?.data?.error || 'Something went wrong. Please try again.' });
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const resetForm = () => {
        setStatus('idle');
        setDetails({ donor_name: '', email: '', phone_number: '', message: '', is_anonymous: false });
        setAmount('50000');
        setShowCustomAmount(false);
        setErrors({});
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-purple-900 via-primary-800 to-orange-500 text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500 opacity-10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
                        <Heart className="text-pink-300 mr-2 animate-pulse" fill="currentColor" size={24} />
                        <span className="font-semibold tracking-wide uppercase text-sm">Support Our Cause</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 animate-fade-in">
                        Make an Impact Today
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in">
                        Your contribution directly empowers youth in Uganda through quality health education and innovative programs.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-900">
                <div className="grid lg:grid-cols-5 gap-12">

                    {/* Donation Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-primary-100 dark:border-gray-700 overflow-hidden">
                            <div className="bg-gradient-to-r from-primary-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 p-6 border-b border-primary-100 dark:border-gray-700">
                                <h2 className="text-2xl font-bold text-primary-900 dark:text-white flex items-center gap-2">
                                    <Heart className="text-pink-500 fill-current" size={28} />
                                    Complete Your Donation
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">All fields are required for transaction processing</p>
                            </div>

                            {status === 'success' ? (
                                <div className="p-10 text-center animate-fade-in">
                                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                        <Check className="text-white" size={48} strokeWidth={3} />
                                    </div>
                                    <h3 className="text-3xl font-heading font-bold text-primary-900 dark:text-white mb-2">Thank You, {details.donor_name.split(' ')[0]}!</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">Your generosity makes a real difference in young lives.</p>

                                    {/* Confirmation Details */}
                                    <div className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 border-2 border-primary-200 dark:border-gray-600 rounded-2xl p-6 mb-6 text-left">
                                        <div className="flex items-center gap-2 mb-4">
                                            <CheckCircle className="text-green-600" size={24} />
                                            <h4 className="font-bold text-primary-900 dark:text-white text-lg">Donation Confirmed</h4>
                                        </div>

                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between items-center py-2 border-b border-primary-100 dark:border-gray-600">
                                                <span className="text-gray-600 dark:text-gray-400">Transaction Reference:</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-primary-900 dark:text-white">{transactionRef}</span>
                                                    <button
                                                        onClick={() => copyToClipboard(transactionRef)}
                                                        className="text-primary-600 hover:text-primary-800"
                                                    >
                                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-primary-100 dark:border-gray-600">
                                                <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                                                <span className="font-bold text-gray-900 dark:text-white">UGX {parseInt(amount).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-primary-100 dark:border-gray-600">
                                                <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                                                <span className="font-medium text-gray-900 dark:text-white">{paymentMethod === 'mobile_money' ? 'Mobile Money' : 'Bank Transfer'}</span>
                                            </div>
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-600 dark:text-gray-400">Confirmation sent to:</span>
                                                <span className="font-medium text-gray-900 dark:text-white">{details.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Instructions */}
                                    <div className="bg-gradient-to-r from-secondary-50 to-orange-50 dark:from-gray-700 dark:to-gray-700 border-2 border-secondary-200 dark:border-gray-600 rounded-2xl p-6 mb-8 text-left">
                                        <h4 className="font-bold text-secondary-800 dark:text-secondary-300 mb-3 uppercase text-sm tracking-wider flex items-center gap-2">
                                            <ArrowRight className="text-secondary-600" size={20} />
                                            Next Steps - Complete Payment
                                        </h4>
                                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                                            <p className="text-base font-medium text-gray-900 dark:text-white leading-relaxed">{instructions}</p>
                                        </div>
                                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex gap-3">
                                            <AlertCircle className="text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" size={20} />
                                            <div className="text-sm text-yellow-900 dark:text-yellow-200">
                                                <p className="font-semibold mb-1">Important:</p>
                                                <p>Please use the transaction reference <span className="font-bold">{transactionRef}</span> when making your payment. A confirmation SMS will be sent to <span className="font-bold">{details.phone_number}</span> once payment is received.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={resetForm}
                                        className="text-primary-600 font-semibold hover:text-primary-800 transition-colors flex items-center gap-2 mx-auto"
                                    >
                                        <ArrowRight size={16} />
                                        Make another donation
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleDonate} className="p-6 md:p-8 space-y-6">

                                    {/* Donation Type */}
                                    <div>
                                        <label className="block text-sm font-bold text-primary-700 dark:text-primary-400 mb-3 uppercase tracking-wide">Donation Type</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setDonationType('one-time')}
                                                className={`py-3 px-4 rounded-xl font-semibold border-2 transition-all ${donationType === 'one-time' ? 'bg-primary-600 text-white border-primary-600 shadow-md' : 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-300 border-primary-200 dark:border-gray-600 hover:border-primary-400'}`}
                                            >
                                                One-Time
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDonationType('monthly')}
                                                className={`py-3 px-4 rounded-xl font-semibold border-2 transition-all ${donationType === 'monthly' ? 'bg-primary-600 text-white border-primary-600 shadow-md' : 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-300 border-primary-200 dark:border-gray-600 hover:border-primary-400'}`}
                                            >
                                                Monthly
                                            </button>
                                        </div>
                                    </div>

                                    {/* Amount Selection */}
                                    <div>
                                        <label className="block text-sm font-bold text-primary-700 dark:text-primary-400 mb-3 uppercase tracking-wide">Select Amount (UGX)</label>
                                        <div className="grid grid-cols-3 gap-3 mb-3">
                                            {['20000', '50000', '100000', '250000', '500000', '1000000'].map((amt) => (
                                                <button
                                                    key={amt}
                                                    type="button"
                                                    onClick={() => { setAmount(amt); setShowCustomAmount(false); setErrors({ ...errors, amount: '' }) }}
                                                    className={`py-3 px-2 rounded-xl font-bold border-2 transition-all hover:scale-105 ${amount === amt && !showCustomAmount ? 'bg-secondary-500 text-white border-secondary-500 shadow-lg' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:border-secondary-400'}`}
                                                >
                                                    {parseInt(amt).toLocaleString()}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowCustomAmount(true)}
                                            className={`w-full py-3 px-4 rounded-xl font-bold border-2 transition-all ${showCustomAmount ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'bg-white dark:bg-gray-700 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-gray-600 hover:border-pink-400'}`}
                                        >
                                            Enter Custom Amount
                                        </button>
                                        {showCustomAmount && (
                                            <div className="mt-3 relative">
                                                <span className="absolute left-4 top-3.5 text-primary-600 font-bold text-lg">UGX</span>
                                                <input
                                                    type="number"
                                                    value={amount}
                                                    onChange={(e) => { setAmount(e.target.value); setErrors({ ...errors, amount: '' }) }}
                                                    className="w-full pl-20 pr-4 py-3 border-2 border-primary-200 dark:border-gray-600 dark:bg-gray-700 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 font-bold text-xl text-primary-900 dark:text-white"
                                                    placeholder="Enter amount"
                                                    min="1000"
                                                />
                                            </div>
                                        )}
                                        {errors.amount && <p className="text-red-600 text-sm mt-2 flex items-center gap-1"><AlertCircle size={14} /> {errors.amount}</p>}
                                    </div>

                                    {/* Payment Method */}
                                    <div>
                                        <label className="block text-sm font-bold text-primary-700 dark:text-primary-400 mb-3 uppercase tracking-wide">Payment Method</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod('mobile_money')}
                                                className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all hover:scale-105 ${paymentMethod === 'mobile_money' ? 'border-secondary-500 bg-secondary-50 dark:bg-secondary-900/30 ring-2 ring-secondary-500 shadow-lg' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'}`}
                                            >
                                                <div className="bg-white p-2 rounded-full shadow-sm text-secondary-600"><Smartphone size={24} /></div>
                                                <div className="text-left">
                                                    <span className="block font-bold text-gray-900 dark:text-white">Mobile Money</span>
                                                    <span className="block text-xs text-gray-500 dark:text-gray-400">MTN / Airtel</span>
                                                </div>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod('bank_transfer')}
                                                className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all hover:scale-105 ${paymentMethod === 'bank_transfer' ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30 ring-2 ring-pink-500 shadow-lg' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'}`}
                                            >
                                                <div className="bg-white p-2 rounded-full shadow-sm text-pink-600"><CreditCard size={24} /></div>
                                                <div className="text-left">
                                                    <span className="block font-bold text-gray-900 dark:text-white">Bank Transfer</span>
                                                    <span className="block text-xs text-gray-500 dark:text-gray-400">Direct Deposit</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Contact Details - All Required */}
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-4 border border-gray-200 dark:border-gray-600">
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Your Contact Details</h3>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                                <User size={16} className="text-primary-600" />
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-primary-100 transition-all dark:bg-gray-800 dark:text-white ${errors.donor_name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-primary-500'}`}
                                                value={details.donor_name}
                                                onChange={e => { setDetails({ ...details, donor_name: e.target.value }); setErrors({ ...errors, donor_name: '' }) }}
                                                placeholder="Enter your full name"
                                            />
                                            {errors.donor_name && <p className="text-red-600 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {errors.donor_name}</p>}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                                    <Mail size={16} className="text-primary-600" />
                                                    Email Address <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-primary-100 transition-all dark:bg-gray-800 dark:text-white ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-primary-500'}`}
                                                    value={details.email}
                                                    onChange={e => { setDetails({ ...details, email: e.target.value }); setErrors({ ...errors, email: '' }) }}
                                                    placeholder="your@email.com"
                                                />
                                                {errors.email && <p className="text-red-600 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {errors.email}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                                    <Phone size={16} className="text-primary-600" />
                                                    Phone Number <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-primary-100 transition-all dark:bg-gray-800 dark:text-white ${errors.phone_number ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-primary-500'}`}
                                                    value={details.phone_number}
                                                    onChange={e => { setDetails({ ...details, phone_number: e.target.value }); setErrors({ ...errors, phone_number: '' }) }}
                                                    placeholder="+256 700 000 000"
                                                />
                                                {errors.phone_number && <p className="text-red-600 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {errors.phone_number}</p>}
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Required for SMS confirmation</p>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                                <MessageSquare size={16} className="text-primary-600" />
                                                Message (Optional)
                                            </label>
                                            <textarea
                                                rows="3"
                                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all resize-none"
                                                value={details.message}
                                                onChange={e => setDetails({ ...details, message: e.target.value })}
                                                placeholder="Share why you're supporting us (optional)"
                                            ></textarea>
                                        </div>

                                        <div className="flex items-center gap-3 pt-2">
                                            <input
                                                type="checkbox"
                                                id="anon"
                                                className="w-5 h-5 rounded text-primary-600 focus:ring-primary-500 border-gray-300"
                                                checked={details.is_anonymous}
                                                onChange={e => setDetails({ ...details, is_anonymous: e.target.checked })}
                                            />
                                            <label htmlFor="anon" className="text-sm text-gray-700 dark:text-gray-300 font-medium">Make my donation anonymous</label>
                                        </div>
                                    </div>

                                    {errors.submit && (
                                        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
                                            <AlertCircle className="text-red-600 dark:text-red-400 shrink-0" size={20} />
                                            <p className="text-red-800 dark:text-red-200 text-sm">{errors.submit}</p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full bg-gradient-to-r from-secondary-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:from-secondary-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-2xl hover:scale-105 disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2"
                                    >
                                        {status === 'submitting' ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Heart fill="currentColor" size={20} />
                                                Donate {parseInt(amount).toLocaleString()} UGX
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Sidebar / Impact */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 border-2 border-primary-200 dark:border-gray-700 shadow-lg">
                            <h3 className="text-xl font-bold text-primary-900 dark:text-white mb-6 flex items-center gap-2">
                                <Heart className="text-pink-500" fill="currentColor" size={24} />
                                Your Impact
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <Check className="text-secondary-500 shrink-0 mt-0.5" size={20} strokeWidth={3} />
                                    <span className="text-primary-800 dark:text-gray-200 font-medium">Support verified sexual and reproductive health education</span>
                                </li>
                                <li className="flex gap-3">
                                    <Check className="text-secondary-500 shrink-0 mt-0.5" size={20} strokeWidth={3} />
                                    <span className="text-primary-800 dark:text-gray-200 font-medium">Expand our reach to more schools across Uganda</span>
                                </li>
                                <li className="flex gap-3">
                                    <Check className="text-secondary-500 shrink-0 mt-0.5" size={20} strokeWidth={3} />
                                    <span className="text-primary-800 dark:text-gray-200 font-medium">Develop the Wekume App with new features</span>
                                </li>
                                <li className="flex gap-3">
                                    <Check className="text-secondary-500 shrink-0 mt-0.5" size={20} strokeWidth={3} />
                                    <span className="text-primary-800 dark:text-gray-200 font-medium">Train more peer educators and mentors</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-primary-100 dark:border-gray-700 shadow-md">
                            <h3 className="text-xl font-bold text-primary-900 dark:text-white mb-4">Secure & Transparent</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                All transactions are secure and encrypted. We use standard banking and mobile money protocols. You'll receive detailed confirmation via email and SMS.
                            </p>
                            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <CheckCircle className="text-green-600" size={18} />
                                <span>SSL Encrypted</span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 border-2 border-yellow-200 dark:border-gray-700">
                            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                <span className="text-secondary-600 dark:text-secondary-400 font-bold">💡 Tip:</span> Monthly donations help us plan better programs and create sustainable impact.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Donate;
