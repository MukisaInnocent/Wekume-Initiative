import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { LogIn, Eye, EyeOff, AlertCircle, Loader, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!formData.email || !formData.password) {
            setError('Please enter both email and password');
            setLoading(false);
            return;
        }

        try {
            const response = await authAPI.login(formData);
            const { token, user } = response.data;

            if (!token || !user) {
                throw new Error('Invalid response from server');
            }

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 500);

        } catch (err) {
            console.error('Login error:', err);
            let errorMessage = 'Something went wrong. Please try again in a moment.';
            if (err.response) {
                if (err.response.status === 401) {
                    errorMessage = 'We couldn’t log you in. Please check your email and password.';
                } else if (err.response.status === 404) {
                    errorMessage = 'We couldn’t connect to the login service right now. Please try again later.';
                }
            } else if (err.request) {
                errorMessage = 'Unable to connect. Check your internet connection and try again.';
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#010101] relative overflow-hidden font-sans">
            {/* Ambient Animated Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#9e00ff] rounded-full blur-[180px] opacity-20"
                />
                <motion.div 
                    animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#ea638c] rounded-full blur-[180px] opacity-20"
                />
            </div>

            <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden m-4">
                
                {/* Left Panel: Branding */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#9e00ff]/20 to-[#ea638c]/20 p-12 flex-col justify-between relative border-r border-white/10">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                    
                    <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group z-10 w-fit">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold tracking-wide text-sm">Back to Wekume</span>
                    </Link>

                    <div className="z-10 relative mt-16">
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#9e00ff] to-[#ea638c] p-1 shadow-2xl shadow-[#9e00ff]/30 mb-8"
                        >
                            <div className="w-full h-full rounded-xl bg-[#010101] flex items-center justify-center">
                                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">W</span>
                            </div>
                        </motion.div>
                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl font-black text-white mb-4 leading-tight"
                        >
                            Wekume <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea638c] to-[#9e00ff]">Initiative CMS</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-white/60 text-lg max-w-sm"
                        >
                            Empowering youth through scalable digital content management and analytics.
                        </motion.p>
                    </div>

                    <div className="z-10 flex items-center gap-2 mt-20">
                        <ShieldCheck size={16} className="text-[#ea638c]" />
                        <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Secure Administrator Portal</span>
                    </div>
                </div>

                {/* Right Panel: Form */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-[#010101]/60">
                    
                    <div className="lg:hidden flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9e00ff] to-[#ea638c] p-0.5">
                            <div className="w-full h-full rounded-lg bg-[#010101] flex items-center justify-center">
                                <span className="text-lg font-black text-white">W</span>
                            </div>
                        </div>
                        <h2 className="text-white font-bold text-xl">Wekume CMS</h2>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-white mb-2">Welcome Back</h2>
                        <p className="text-white/50 text-sm">Sign in with your administrator credentials.</p>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex items-start gap-3 bg-[#ea638c]/10 border border-[#ea638c]/30 text-[#f7b2d0] px-4 py-3 rounded-xl mb-6 shadow-lg shadow-[#ea638c]/5"
                            >
                                <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-[#ea638c]" />
                                <p className="text-sm font-medium">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#9e00ff]/50 focus:bg-white/10 transition-all shadow-inner"
                                placeholder="admin@wekume.org"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-5 py-4 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#9e00ff]/50 focus:bg-white/10 transition-all shadow-inner"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full relative overflow-hidden bg-gradient-to-r from-[#9e00ff] to-[#ea638c] text-white py-4 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(158,0,255,0.3)] hover:shadow-[0_0_30px_rgba(234,99,140,0.5)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group mt-4"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <Loader size={18} className="animate-spin" />
                                        Authenticating...
                                    </>
                                ) : (
                                    <>
                                        Sign In to Dashboard
                                        <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </span>
                        </motion.button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
