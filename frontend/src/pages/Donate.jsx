import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { donationAPI } from '../services/api';
import { Heart, CreditCard, Smartphone, Check, ArrowRight, X } from 'lucide-react';

function Donate() {
    const [donationType, setDonationType] = useState('one-time');
    const [amount, setAmount] = useState('50000');
    const [showCustomAmount, setShowCustomAmount] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('mobile_money');

    // Form State
    const [details, setDetails] = useState({
        donor_name: '',
        email: '',
        phone_number: '',
        message: '',
        is_anonymous: false
    });

    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [instructions, setInstructions] = useState(null);

    const handleDonate = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const payload = {
                ...details,
                amount: parseInt(amount, 10),
                currency: 'UGX',
                payment_method: paymentMethod
            };

            const response = await donationAPI.create(payload);
            setInstructions(response.data.instructions);
            setStatus('success');
        } catch (error) {
            console.error("Donation failed:", error);
            setStatus('error');
        }
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-900 text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
                        Support Our Mission
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Your contribution directly impacts the lives of youth in Uganda through health education.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-5 gap-12">

                    {/* Donation Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Heart className="text-accent-500 fill-current" size={24} />
                                    Make a Donation
                                </h2>
                            </div>

                            {status === 'success' ? (
                                <div className="p-10 text-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Check className="text-green-600" size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you for your pledge!</h3>
                                    <p className="text-gray-600 mb-6">We have verified your details. Please complete the transfer using the instructions below:</p>

                                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8 text-left">
                                        <h4 className="font-bold text-yellow-800 mb-2 uppercase text-xs tracking-wider">Payment Instructions</h4>
                                        <p className="text-lg font-medium text-gray-900">{instructions}</p>
                                    </div>

                                    <button
                                        onClick={() => { setStatus('idle'); setDetails({ donor_name: '', email: '', phone_number: '', message: '', is_anonymous: false }); }}
                                        className="text-primary-600 font-semibold hover:underline"
                                    >
                                        Make another donation
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleDonate} className="p-6 md:p-8 space-y-8">

                                    {/* Amount Selection */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Select Amount (UGX)</label>
                                        <div className="grid grid-cols-3 gap-3 mb-3">
                                            {['20000', '50000', '100000', '250000', '500000'].map((amt) => (
                                                <button
                                                    key={amt}
                                                    type="button"
                                                    onClick={() => { setAmount(amt); setShowCustomAmount(false); }}
                                                    className={`py-3 px-2 rounded-lg font-bold border transition-all ${amount === amt && !showCustomAmount ? 'bg-primary-600 text-white border-primary-600 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-primary-400'}`}
                                                >
                                                    {parseInt(amt).toLocaleString()}
                                                </button>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => setShowCustomAmount(true)}
                                                className={`py-3 px-2 rounded-lg font-bold border transition-all ${showCustomAmount ? 'bg-primary-600 text-white border-primary-600 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-primary-400'}`}
                                            >
                                                Custom
                                            </button>
                                        </div>
                                        {showCustomAmount && (
                                            <div className="mt-2 relative">
                                                <span className="absolute left-4 top-3 text-gray-500 font-semibold">UGX</span>
                                                <input
                                                    type="number"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    className="w-full pl-16 pr-4 py-3 border-2 border-primary-100 rounded-lg focus:ring-4 focus:ring-primary-50 focus:border-primary-500 font-bold text-lg"
                                                    placeholder="Enter amount"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Payment Method */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Payment Method</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod('mobile_money')}
                                                className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${paymentMethod === 'mobile_money' ? 'border-accent-500 bg-accent-50 ring-1 ring-accent-500' : 'border-gray-200 hover:border-gray-300'}`}
                                            >
                                                <div className="bg-white p-2 rounded-full shadow-sm text-accent-600"><Smartphone size={24} /></div>
                                                <div className="text-left">
                                                    <span className="block font-bold text-gray-900">Mobile Money</span>
                                                    <span className="block text-xs text-gray-500">MTN / Airtel</span>
                                                </div>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod('bank_transfer')}
                                                className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${paymentMethod === 'bank_transfer' ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500' : 'border-gray-200 hover:border-gray-300'}`}
                                            >
                                                <div className="bg-white p-2 rounded-full shadow-sm text-primary-600"><CreditCard size={24} /></div>
                                                <div className="text-left">
                                                    <span className="block font-bold text-gray-900">Bank Transfer</span>
                                                    <span className="block text-xs text-gray-500">Direct Deposit</span>
                                                </div>
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2 ml-1">* VISA / Mastercard coming soon</p>
                                    </div>

                                    {/* Donor Details */}
                                    <div className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                <input
                                                    type="text" required
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                    value={details.donor_name} onChange={e => setDetails({ ...details, donor_name: e.target.value })}
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                                <input
                                                    type="email" required
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                    value={details.email} onChange={e => setDetails({ ...details, email: e.target.value })}
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                                            <input
                                                type="tel"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                value={details.phone_number} onChange={e => setDetails({ ...details, phone_number: e.target.value })}
                                                placeholder="+256..."
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 pt-2">
                                            <input
                                                type="checkbox" id="anon"
                                                className="rounded text-primary-600 focus:ring-primary-500"
                                                checked={details.is_anonymous} onChange={e => setDetails({ ...details, is_anonymous: e.target.checked })}
                                            />
                                            <label htmlFor="anon" className="text-sm text-gray-700">Make my donation anonymous</label>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full bg-accent-500 text-primary-900 py-4 rounded-xl font-bold text-lg hover:bg-accent-400 transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
                                    >
                                        {status === 'submitting' ? 'Processing...' : `Donate ${parseInt(amount).toLocaleString()} UGX`}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Sidebar / Impact */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Donate?</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <Check className="text-green-500 shrink-0" size={20} />
                                    <span className="text-gray-700">Support verified health education.</span>
                                </li>
                                <li className="flex gap-3">
                                    <Check className="text-green-500 shrink-0" size={20} />
                                    <span className="text-gray-700">Expand our reach to more schools.</span>
                                </li>
                                <li className="flex gap-3">
                                    <Check className="text-green-500 shrink-0" size={20} />
                                    <span className="text-gray-700">Develop the Wekume App further.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Donation</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                All transactions are secure and encrypted. We use standard banking and mobile money protocols to ensure your data is safe.
                            </p>
                            <div className="flex gap-2 opacity-50 grayscale">
                                {/* Placeholders for Visa/Mastercard logos if we add images later */}
                                <div className="h-8 w-12 bg-gray-200 rounded"></div>
                                <div className="h-8 w-12 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Donate;
