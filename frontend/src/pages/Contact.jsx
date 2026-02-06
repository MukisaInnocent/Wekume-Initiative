import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { formAPI } from '../services/api';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader } from 'lucide-react';

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await formAPI.submitSupport(formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus('error');
        }
    };

    return (
        <>
            <Navbar />

            <div className="bg-primary-900 text-white py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Contact Us</h1>
                <p className="text-xl opacity-90">We'd love to hear from you. Get in touch with us.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 gap-12">

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary-50 p-3 rounded-lg text-primary-600"><Mail size={24} /></div>
                                <div><h3 className="font-semibold text-gray-900">Email Us</h3><p className="text-gray-600">info@wekume.org</p></div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-pink-50 p-3 rounded-lg text-pink-600"><Phone size={24} /></div>
                                <div><h3 className="font-semibold text-gray-900">Call Us</h3><p className="text-gray-600">+256 000 000 000</p></div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary-50 p-3 rounded-lg text-secondary-600"><MapPin size={24} /></div>
                                <div><h3 className="font-semibold text-gray-900">Visit Us</h3><p className="text-gray-600">Kampala, Uganda</p></div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-primary-100">
                        {status === 'success' ? (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 text-accent-600 rounded-full mb-4">
                                    <CheckCircle size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-primary-900 mb-2">Message Sent!</h3>
                                <p className="text-gray-600">Thank you for reaching out. We'll get back to you shortly.</p>
                                <button onClick={() => setStatus('idle')} className="mt-6 text-primary-600 font-semibold hover:underline">Send another message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text" required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow"
                                        value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email" required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow"
                                        value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <input
                                        type="text" required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow"
                                        value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        required rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow resize-none"
                                        value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                {status === 'error' && <p className="text-secondary-600 text-sm">Something went wrong. Please try again.</p>}

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    {status === 'submitting' ? <Loader className="animate-spin" size={20} /> : <><Send size={20} /> Send Message</>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Contact;
