import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ContributionAPI } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CreditCard, Smartphone, Check, ArrowRight, Mail, Phone, User, MessageSquare, AlertCircle, Copy, CheckCircle, Globe, ChevronRight, Activity, DollarSign, ArrowLeft } from 'lucide-react';

const COMMON_CURRENCIES = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'UGX', name: 'Ugandan Shilling', symbol: 'UGX' },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KES' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' }
];

const FUND_CATEGORIES = ['Testing Kits', 'Salaries', 'Events', 'Internet', 'Cost of Treatment'];

function Support() {
    const [currentStep, setCurrentStep] = useState(1);
    const [status, setStatus] = useState('idle');
    const [errors, setErrors] = useState({});
    
    // Wizard State
    const [currency, setCurrency] = useState(null);
    const [contributionType, setContributionType] = useState('one-time');
    const [fundCategory, setFundCategory] = useState('Testing Kits');
    const [amount, setAmount] = useState('');
    const [isCustomAmount, setIsCustomAmount] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    
    const [details, setDetails] = useState({
        donor_name: '', email: '', phone_number: '', message: '', is_anonymous: false
    });
    
    const [instructions, setInstructions] = useState(null);
    const [transactionRef, setTransactionRef] = useState(null);
    const [copied, setCopied] = useState(false);

    // Derived preset amounts based on currency
    const presetAmounts = useMemo(() => {
        if (!currency) return [];
        if (currency.code === 'UGX') return ['20000', '50000', '100000', '250000'];
        if (currency.code === 'KES') return ['500', '1500', '3000', '10000'];
        return ['25', '50', '100', '250']; // Default global tiers
    }, [currency]);

    // Derived payment methods based on currency
    const availablePaymentMethods = useMemo(() => {
        if (!currency) return [];
        if (['UGX', 'KES'].includes(currency.code)) {
            return [
                { id: 'mobile_money', name: 'Mobile Money', icon: <Smartphone size={24}/>, desc: 'MTN / Airtel / M-Pesa' },
                { id: 'bank_transfer', name: 'Bank Transfer', icon: <CreditCard size={24}/>, desc: 'Local Direct Deposit' }
            ];
        }
        return [
            { id: 'paypal', name: 'PayPal', icon: <Globe size={24}/>, desc: 'Fast & Secure' },
            { id: 'card', name: 'Debit / Credit Card', icon: <CreditCard size={24}/>, desc: 'Stripe Secure Checkout' },
            { id: 'bank_transfer', name: 'Wire Transfer', icon: <ArrowRight size={24}/>, desc: 'International Transfer' }
        ];
    }, [currency]);

    // Set defaults when moving steps
    const handleNextStep = (step) => {
        if (step === 3 && amount === '') {
            setAmount(presetAmounts[1]); // Default to 2nd tier
        }
        if (step === 3 && paymentMethod === '' && availablePaymentMethods.length > 0) {
            setPaymentMethod(availablePaymentMethods[0].id);
        }
        setErrors({});
        setCurrentStep(step);
    };

    const validateFinalStep = () => {
        const newErrors = {};
        if (!details.donor_name.trim()) newErrors.donor_name = 'Required';
        if (!details.email.trim() || !/^\S+@\S+\.\S+$/.test(details.email)) newErrors.email = 'Valid email required';
        if (['UGX', 'KES'].includes(currency?.code) && !details.phone_number.trim()) newErrors.phone_number = 'Required for SMS';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSupportSubmit = async (e) => {
        e.preventDefault();
        if (!validateFinalStep()) return;

        setStatus('submitting');
        try {
            const payload = {
                ...details,
                amount: parseFloat(amount),
                currency: currency.code,
                payment_method: paymentMethod,
                contribution_type: contributionType,
                fund_category: fundCategory
            };

            const response = await ContributionAPI.create(payload);
            setInstructions(response.data.instructions || 'Thank you! You will be redirected securely to complete your transaction shortly.');
            setTransactionRef(response.data.transaction_ref || `WK-${Date.now().toString(36).toUpperCase()}`);
            setStatus('success');
            
            // Advance to Success Step
            setCurrentStep(5);
        } catch (error) {
            console.error(error);
            setErrors({ submit: 'Transaction simulation failed. Please try again.' });
            setStatus('error');
        }
    };

    const resetWizard = () => {
        setCurrentStep(1);
        setStatus('idle');
        setCurrency(null);
        setAmount('');
        setDetails({ donor_name: '', email: '', phone_number: '', message: '', is_anonymous: false });
    };

    // Rendering smaller components for steps
    const renderStepProgressBar = () => (
        <div className="flex justify-between items-center mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700 -z-10 rounded-full overflow-hidden">
                <div className="h-full bg-pink-500 transition-all duration-500" style={{ width: `${((currentStep-1)/3)*100}%` }}></div>
            </div>
            {[1, 2, 3, 4].map(num => (
                <div key={num} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-all duration-300 shadow-sm ${currentStep >= num ? 'bg-pink-500 border-white dark:border-gray-800 text-white shadow-pink-500/30' : 'bg-gray-100 dark:bg-gray-800 border-white dark:border-gray-800 text-gray-400'}`}>
                    {currentStep > num ? <Check size={16} strokeWidth={3} /> : num}
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            
            {/* Minimalist Header */}
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[100px]"></div>
                
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-pink-300 font-semibold tracking-wide text-sm mb-6 inline-flex items-center gap-2 backdrop-blur-md">
                        <Heart size={16} className="animate-pulse" /> Wekume Support Foundation
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Empower the Next Generation</h1>
                    <p className="text-lg text-purple-100 max-w-2xl mx-auto">Stand with us seamlessly. Choose your currency, focus your impact, and make a difference securely.</p>
                </div>
            </div>

            {/* Wizard Container */}
            <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-20 pb-24">
                <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl shadow-purple-900/5 border border-gray-100 dark:border-gray-700/50 p-6 sm:p-10 backdrop-blur-xl">
                    
                    {currentStep < 5 && renderStepProgressBar()}

                    <div className="min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {/* STEP 1: Currency Selection */}
                            {currentStep === 1 && (
                                <motion.div key="step1" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="space-y-6">
                                    <div className="text-center mb-10">
                                        <h2 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white">Let's start. Where are you from?</h2>
                                        <p className="text-gray-500 flex items-center justify-center gap-2 mt-3"><Globe size={18}/> Choose your preferred currency to proceed.</p>
                                    </div>
                                    
                                    <div className="max-w-md mx-auto relative group">
                                        <select 
                                            value={currency?.code || ''}
                                            onChange={(e) => setCurrency(COMMON_CURRENCIES.find(c => c.code === e.target.value))}
                                            className="w-full appearance-none bg-gray-50 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-5 text-lg font-bold text-gray-900 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all cursor-pointer shadow-sm group-hover:border-pink-300 dark:group-hover:border-pink-700"
                                        >
                                            <option value="" disabled>Select a currency...</option>
                                            {COMMON_CURRENCIES.map(curr => (
                                                <option key={curr.code} value={curr.code}>{curr.symbol} &mdash;  {curr.code} ({curr.name})</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center px-2 text-gray-400 group-hover:text-pink-500 transition-colors">
                                            <ChevronRight className="rotate-90" size={24} />
                                        </div>
                                    </div>

                                    <div className="pt-10 flex flex-col items-center">
                                        <button disabled={!currency} onClick={() => handleNextStep(2)} className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 text-white dark:text-gray-900 px-10 py-4 rounded-full font-bold shadow-lg disabled:opacity-50 disabled:scale-100 hover:scale-105 transition-all flex items-center gap-3">
                                            Continue <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: Impact & Type */}
                            {currentStep === 2 && (
                                <motion.div key="step2" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="space-y-8">
                                    <button onClick={() => setCurrentStep(1)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex items-center gap-1 text-sm font-semibold mb-2"><ArrowLeft size={16}/> Back</button>
                                    
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How often would you like to give?</h2>
                                        <div className="flex rounded-xl p-1 bg-gray-100 dark:bg-gray-700/50">
                                            <button onClick={() => setContributionType('one-time')} className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all shadow-sm ${contributionType === 'one-time' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>One-Time</button>
                                            <button onClick={() => setContributionType('monthly')} className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all shadow-sm ${contributionType === 'monthly' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>Monthly (Recommended)</button>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Direct your impact</h2>
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                            {FUND_CATEGORIES.map(cat => (
                                                <button key={cat} onClick={() => setFundCategory(cat)} className={`px-4 py-3 border-2 rounded-xl text-sm font-bold transition-all text-left group flex items-center justify-between ${fundCategory === cat ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'}`}>
                                                    {cat}
                                                    {fundCategory === cat && <CheckCircle size={16} className="text-purple-500" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <button onClick={() => handleNextStep(3)} className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3.5 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg flex items-center gap-2">
                                            Next Step: Amount <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: Amount & Payment Method */}
                            {currentStep === 3 && (
                                <motion.div key="step3" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="space-y-8">
                                    <button onClick={() => setCurrentStep(2)} className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm font-semibold"><ArrowLeft size={16}/> Back</button>
                                    
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
                                            Select Amount 
                                            <span className="text-sm font-normal text-pink-500 bg-pink-50 dark:bg-pink-900/20 px-2 py-1 rounded-md">{currency.code}</span>
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                                            {presetAmounts.map(preset => (
                                                <button key={preset} onClick={() => { setAmount(preset); setIsCustomAmount(false); }} className={`py-4 rounded-xl font-black text-lg border-2 transition-all ${amount === preset && !isCustomAmount ? 'bg-pink-500 border-pink-500 text-white shadow-md scale-105' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-pink-300'}`}>
                                                    {currency.symbol}{parseFloat(preset).toLocaleString()}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => { setIsCustomAmount(true); setAmount(''); }} className={`px-4 py-3 rounded-xl border-2 font-bold text-sm ${isCustomAmount ? 'border-pink-500 text-pink-600 bg-pink-50' : 'border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400'}`}>
                                                Custom Amount
                                            </button>
                                            {isCustomAmount && (
                                                <div className="relative flex-1">
                                                    <span className="absolute left-4 top-[14px] text-gray-500 font-bold">{currency.symbol}</span>
                                                    <input type="number" autoFocus value={amount} onChange={e => setAmount(e.target.value)} className="w-full pl-10 pr-4 py-3 border-2 border-pink-500 bg-white dark:bg-gray-800 rounded-xl outline-none font-bold text-gray-900 dark:text-white shadow-sm" placeholder="Enter amount..." />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Payment Method</h2>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {availablePaymentMethods.map(method => (
                                                <button key={method.id} onClick={() => setPaymentMethod(method.id)} className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left hover:scale-[1.02] ${paymentMethod === method.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                                                    <div className={`p-2 rounded-lg ${paymentMethod === method.id ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                                                        {method.icon}
                                                    </div>
                                                    <div>
                                                        <h4 className={`font-bold ${paymentMethod === method.id ? 'text-indigo-900 dark:text-indigo-300' : 'text-gray-900 dark:text-white'}`}>{method.name}</h4>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{method.desc}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <button disabled={!amount} onClick={() => handleNextStep(4)} className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3.5 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg disabled:opacity-50 flex items-center gap-2">
                                            Final Step <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4: Details & Confirm */}
                            {currentStep === 4 && (
                                <motion.div key="step4" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="space-y-6">
                                    <button onClick={() => setCurrentStep(3)} className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm font-semibold mb-4"><ArrowLeft size={16}/> Back</button>
                                    
                                    <div className="flex items-start gap-6 flex-col md:flex-row">
                                        {/* Review Canvas */}
                                        <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Pledge Summary</h3>
                                            <div className="mb-4">
                                                <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{currency.symbol}{parseFloat(amount).toLocaleString()}</div>
                                                <div className="inline-flex items-center gap-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 px-2 py-0.5 rounded text-xs font-bold uppercase">{contributionType}</div>
                                            </div>
                                            <div className="space-y-2 text-sm border-t border-gray-200 dark:border-gray-600 pt-4">
                                                <div className="flex justify-between items-center"><span className="text-gray-500 truncate mr-2">Impact:</span> <span className="font-semibold text-gray-900 dark:text-white truncate">{fundCategory}</span></div>
                                                <div className="flex justify-between items-center"><span className="text-gray-500">Gateway:</span> <span className="font-semibold text-gray-900 dark:text-white truncate">{availablePaymentMethods.find(m => m.id === paymentMethod)?.name}</span></div>
                                            </div>
                                        </div>

                                        {/* Contact Form */}
                                        <div className="flex-1 w-full space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                                <input type="text" value={details.donor_name} onChange={e => setDetails({...details, donor_name: e.target.value})} className="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-600 focus:border-pink-500 px-2 py-2 outline-none font-medium text-gray-900 dark:text-white placeholder-gray-400" placeholder="Jane Doe" required />
                                                {errors.donor_name && <p className="text-red-500 text-xs mt-1">{errors.donor_name}</p>}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                                    <input type="email" value={details.email} onChange={e => setDetails({...details, email: e.target.value})} className="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-600 focus:border-pink-500 px-2 py-2 outline-none font-medium text-gray-900 dark:text-white placeholder-gray-400" placeholder="jane@example.com" required />
                                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                                                    <input type="tel" value={details.phone_number} onChange={e => setDetails({...details, phone_number: e.target.value})} className="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-600 focus:border-pink-500 px-2 py-2 outline-none font-medium text-gray-900 dark:text-white placeholder-gray-400" placeholder="+123..." />
                                                    {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>}
                                                </div>
                                            </div>
                                            <div className="pt-2 flex items-center gap-2">
                                                <input type="checkbox" id="anon" checked={details.is_anonymous} onChange={e => setDetails({...details, is_anonymous: e.target.checked})} className="rounded border-gray-300 text-pink-500 focus:ring-pink-500" />
                                                <label htmlFor="anon" className="text-sm text-gray-500">Keep my identity strictly anonymous</label>
                                            </div>

                                            {errors.submit && <div className="text-red-500 text-sm font-medium mt-4 p-3 bg-red-50 rounded-lg">{errors.submit}</div>}

                                            <button onClick={handleSupportSubmit} disabled={status==='submitting'} className="w-full mt-6 bg-gradient-to-r from-pink-500 to-orange-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:scale-100 flex justify-center items-center gap-2">
                                                {status === 'submitting' ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><CheckCircle size={20}/> Complete Secure Transaction</>}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 5: Success State */}
                            {currentStep === 5 && (
                                <motion.div key="step5" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} className="text-center py-10 space-y-6">
                                    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner shadow-green-500/20">
                                        <Check size={50} strokeWidth={3} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Thank you, {details.is_anonymous ? 'Friend' : details.donor_name.split(' ')[0]}!</h2>
                                        <p className="text-gray-500 max-w-md mx-auto">Your generous pledge of {currency.symbol}{amount} towards {fundCategory} is initiated.</p>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-2xl p-6 text-left max-w-md mx-auto relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full blur-xl"></div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2"><ArrowRight size={14}/> Next Steps Configuration</p>
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed mb-4">{instructions}</p>
                                        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                                            <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Ref ID</span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">{transactionRef}</span>
                                                <button onClick={() => { navigator.clipboard.writeText(transactionRef); setCopied(true); setTimeout(()=>setCopied(false),2000); }} className="text-pink-500 hover:bg-pink-50 p-1.5 rounded-md transition-colors">{copied ? <Check size={14}/> : <Copy size={14}/>}</button>
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={resetWizard} className="text-pink-500 font-bold text-sm tracking-wide hover:underline inline-flex items-center gap-1 mt-4">Start Over / Back to Home</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default Support;
