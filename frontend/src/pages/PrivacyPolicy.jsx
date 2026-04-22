import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { Download, Shield, Lock, Eye, Database, Globe, UserCheck, Mail } from 'lucide-react';

function PrivacyPolicy() {
    const handleDownloadPDF = () => {
        window.print();
    };

    const lastUpdated = 'April 22, 2026';

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen">
            <Navbar />
            <PageHeader
                badge="Legal"
                title="Privacy Policy"
                subtitle="How Wekume Initiative collects, uses, and protects your data."
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Download Button */}
                <div className="flex justify-end mb-8 print:hidden">
                    <button
                        onClick={handleDownloadPDF}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                    >
                        <Download size={16} />
                        Download PDF
                    </button>
                </div>

                {/* Policy Content */}
                <div className="bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-14 shadow-sm space-y-10">
                    <div className="text-center pb-8 border-b border-gray-100 dark:border-gray-800">
                        <h1 className="text-3xl font-heading font-black text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {lastUpdated}</p>
                    </div>

                    {/* Introduction */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Shield size={20} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. Introduction</h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Wekume Initiative ("we," "our," or "us") is committed to protecting the privacy and confidentiality of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services, including the Lina AI Safe Chat assistant.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We recognize that our primary audience includes young people seeking sensitive health information. We take this responsibility seriously and have designed our data practices with the highest standards of privacy and safety in mind.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                                <Database size={20} className="text-pink-600 dark:text-pink-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. Information We Collect</h2>
                        </div>
                        <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">2.1 Information You Provide Voluntarily</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li><strong>Contact Forms:</strong> Name, email address, phone number, and message content when you submit a support or contact form.</li>
                            <li><strong>Volunteer Applications:</strong> Name, email, phone, skills, availability, and motivation statement.</li>
                            <li><strong>Newsletter Subscription:</strong> Email address when you subscribe to our newsletter.</li>
                            <li><strong>Event Registration:</strong> Name, email, and any other details required for event participation.</li>
                            <li><strong>Testimonials:</strong> Name, role, photo (if provided), and testimonial content submitted with your consent.</li>
                        </ul>
                        <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">2.2 Information Collected Automatically</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li><strong>Usage Data:</strong> Pages visited, time spent, browser type, device information, and referring URLs.</li>
                            <li><strong>Cookies:</strong> We use essential cookies for site functionality and optional analytics cookies to improve user experience.</li>
                        </ul>
                        <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">2.3 Lina AI Safe Chat</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Conversations with Lina AI are designed to be <strong>anonymous and confidential</strong>. We do not require you to provide your name or any identifying information to use the Safe Chat. Chat conversations may be temporarily stored for the duration of your session to maintain context but are not linked to any personally identifiable information. Anonymized conversation data may be used to improve Lina's responses and understand common health concerns among youth.
                        </p>
                    </section>

                    {/* How We Use Your Information */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                <Eye size={20} className="text-orange-600 dark:text-orange-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. How We Use Your Information</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>To respond to your inquiries and support requests.</li>
                            <li>To process volunteer applications and event registrations.</li>
                            <li>To send newsletter updates (only with your explicit consent).</li>
                            <li>To improve our website, services, and AI assistant capabilities.</li>
                            <li>To generate anonymized analytics and impact reports.</li>
                            <li>To detect and prevent fraudulent or unauthorized activity.</li>
                        </ul>
                    </section>

                    {/* Data Sharing */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Globe size={20} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">4. Data Sharing & Third Parties</h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We <strong>do not sell, trade, or rent</strong> your personal information to third parties. We may share data in the following limited circumstances:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li><strong>Service Providers:</strong> Trusted partners who help operate our platform (e.g., hosting, email delivery) under strict data protection agreements.</li>
                            <li><strong>AI Services:</strong> Anonymized chat data may be processed by AI providers (e.g., Google) to generate responses. No personally identifiable information is shared.</li>
                            <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
                            <li><strong>Safety:</strong> When we believe disclosure is necessary to protect the safety of a user, particularly in crisis situations detected by Lina AI.</li>
                        </ul>
                    </section>

                    {/* Data Security */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                                <Lock size={20} className="text-pink-600 dark:text-pink-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">5. Data Security</h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We implement industry-standard security measures to protect your information, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>HTTPS encryption for all data in transit.</li>
                            <li>Secure database storage with access controls.</li>
                            <li>JWT-based authentication for admin access.</li>
                            <li>Regular security audits and updates.</li>
                        </ul>
                    </section>

                    {/* Children's Privacy */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                <UserCheck size={20} className="text-orange-600 dark:text-orange-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">6. Young Users & Children's Privacy</h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Wekume Initiative serves young people, including those under 18. We are committed to complying with applicable child privacy laws. We do not knowingly collect personal information from children under 13 without parental consent. The Lina AI Safe Chat is designed to be anonymous and does not require age verification, ensuring that young people can access vital health information safely.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <a href="mailto:admin@wekume.org" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">admin@wekume.org</a> so we can take appropriate action.
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">7. Your Rights</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Depending on your location, you may have the right to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Access, correct, or delete your personal data.</li>
                            <li>Withdraw consent for data processing at any time.</li>
                            <li>Opt out of marketing communications.</li>
                            <li>Request a copy of the data we hold about you.</li>
                            <li>Lodge a complaint with a data protection authority.</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            To exercise any of these rights, please contact us at <a href="mailto:admin@wekume.org" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">admin@wekume.org</a>.
                        </p>
                    </section>

                    {/* Changes */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">8. Changes to This Policy</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically. Continued use of our services after changes constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Mail size={20} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">9. Contact Us</h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <p><strong>Wekume Initiative</strong></p>
                            <p>Email: <a href="mailto:admin@wekume.org" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">admin@wekume.org</a></p>
                            <p>Phone: +256 766 344 603</p>
                            <p>PO BOX 180589, Kampala, Uganda</p>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default PrivacyPolicy;
