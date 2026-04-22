import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { LogIn, Eye, EyeOff, AlertCircle, Loader, ShieldCheck, ArrowLeft } from 'lucide-react';

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

        // Simple validation
        if (!formData.email || !formData.password) {
            setError('Please enter both email and password');
            setLoading(false);
            return;
        }

        try {
            console.log('Attempting login...');

            const response = await authAPI.login(formData);
            console.log('Login successful');

            const { token, user } = response.data;

            if (!token || !user) {
                throw new Error('Invalid response from server');
            }

            // Store auth data
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Small delay to ensure storage is set
            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 100);

        } catch (err) {
            console.error('Login error:', err);

            // Handle different types of errors
            let errorMessage = 'Login failed. Please try again.';

            if (err.response) {
                // Server responded with an error
                if (err.response.status === 401) {
                    errorMessage = 'Invalid email or password';
                } else if (err.response.status === 404) {
                    errorMessage = 'Login service not found (404)';
                } else if (err.response.data && err.response.data.error) {
                    errorMessage = err.response.data.error;
                }
            } else if (err.request) {
                // Request made but no response
                errorMessage = 'Cannot connect to server. Please check your internet connection or if the backend is running.';
            } else {
                // Something else happened
                errorMessage = err.message;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden bg-[#010101]">
            {/* ── Left Panel: Brand Showcase ────────────────────── */}
            <div className="hidden lg:flex lg:w-[55%] relative items-center justify-center p-16">
                {/* Ambient Orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#9e00ff] rounded-full blur-[200px] opacity-25 -translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#ea638c] rounded-full blur-[180px] opacity-20 translate-x-1/4 translate-y-1/4"></div>
                    <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#f89d61] rounded-full blur-[120px] opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}></div>

                <div className="relative z-10 text-center max-w-lg">
                    {/* Logo */}
                    <div className="mb-10 flex justify-center">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#9e00ff] to-[#ea638c] p-1 shadow-2xl shadow-[#9e00ff]/30">
                                <div className="w-full h-full rounded-[1.25rem] bg-[#010101] flex items-center justify-center overflow-hidden">
                                    <img
                                        src="/assets/wekume-logo.png"
                                        alt="Wekume"
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#010101]"></div>
                        </div>
                    </div>

                    <h1 className="text-5xl font-heading font-black text-white mb-4 tracking-tight">
                        Wekume
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ea638c] via-[#9e00ff] to-[#f89d61]">
                            Initiative
                        </span>
                    </h1>
                    <p className="text-white/50 text-lg leading-relaxed mb-12">
                        Content Management System for empowering youth through education, innovation, and accessible health resources.
                    </p>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {['Event Management', 'Content Editor', 'AI Assistant', 'Analytics'].map((feature) => (
                            <span
                                key={feature}
                                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium backdrop-blur-sm"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Right Panel: Login Form ───────────────────────── */}
            <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-12 relative">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a12] via-[#010101] to-[#1a0a12] lg:rounded-l-[4rem] overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#9e00ff] rounded-full blur-[150px] opacity-10 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#ea638c] rounded-full blur-[120px] opacity-10 -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="relative z-10 w-full max-w-md">
                    {/* Back to site link */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm font-medium mb-10 transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to website
                    </Link>

                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9e00ff] to-[#ea638c] p-0.5">
                            <div className="w-full h-full rounded-[0.6rem] bg-[#010101] flex items-center justify-center overflow-hidden">
                                <img src="/assets/wekume-logo.png" alt="Wekume" className="w-8 h-8 object-contain" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-lg leading-tight">Wekume CMS</h2>
                            <p className="text-white/40 text-xs">Admin Dashboard</p>
                        </div>
                    </div>

                    {/* Login Header */}
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#9e00ff]/10 border border-[#9e00ff]/20 mb-5">
                            <ShieldCheck size={14} className="text-[#9e00ff]" />
                            <span className="text-xs font-bold text-[#9e00ff] uppercase tracking-widest">Secure Access</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-heading font-black text-white mb-2">
                            Welcome back
                        </h2>
                        <p className="text-white/40 text-base">
                            Sign in to manage your content and analytics.
                        </p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="flex items-start gap-3 bg-[#ea638c]/10 border border-[#ea638c]/20 text-[#f7b2d0] px-4 py-3.5 rounded-2xl mb-6 animate-fade-in">
                            <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-[#ea638c]" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-white/60 mb-2 uppercase tracking-wider">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-base focus:outline-none focus:border-[#9e00ff]/50 focus:ring-2 focus:ring-[#9e00ff]/20 transition-all"
                                placeholder="admin@wekume.org"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-bold text-white/60 mb-2 uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-5 py-4 pr-14 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-base focus:outline-none focus:border-[#9e00ff]/50 focus:ring-2 focus:ring-[#9e00ff]/20 transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative overflow-hidden bg-gradient-to-r from-[#9e00ff] to-[#ea638c] text-white py-4 rounded-2xl font-bold text-base hover:shadow-[0_8px_30px_rgba(158,0,255,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <Loader size={20} className="animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <LogIn size={20} />
                                        Sign In
                                    </>
                                )}
                            </span>
                            {/* Hover shimmer */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-10 pt-6 border-t border-white/5 text-center">
                        <p className="text-white/25 text-xs">
                            © {new Date().getFullYear()} Wekume Initiative. Secure admin portal.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
