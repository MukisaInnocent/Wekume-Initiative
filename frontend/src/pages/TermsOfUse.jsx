import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { Download, FileText, Scale, AlertTriangle, Bot, Gavel, Shield, Mail } from 'lucide-react';

function TermsOfUse() {
    const handleDownloadPDF = () => {
        window.print();
    };

    const lastUpdated = 'April 22, 2026';

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen">
            <Navbar />
            <PageHeader
                badge="Legal"
                title="Terms of Use"
                subtitle="Terms and conditions governing your use of Wekume Initiative services."
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

                {/* Terms Content */}
                <div className="bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-14 shadow-sm space-y-10">
                    <div className="text-center pb-8 border-b border-gray-100 dark:border-gray-800">
                        <h1 className="text-3xl font-heading font-black text-gray-900 dark:text-white mb-2">Terms of Use</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {lastUpdated}</p>
                    </div>

                    {/* Acceptance of Terms */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <FileText size={20} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            By accessing or using the Wekume Initiative website, mobile application, and related services (collectively, the "Services"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our Services.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            These Terms apply to all visitors, users, volunteers, and any person who accesses or uses the Services.
                        </p>
                    </section>

                    {/* Description of Services */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. Description of Services</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Wekume Initiative provides educational resources, community programs, and digital tools focused on sexual and reproductive health (SRH) education and mental health support for young people. Our Services include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Informational content on sexual and reproductive health.</li>
                            <li>The Lina AI Safe Chat assistant for anonymous health-related inquiries.</li>
                            <li>Event listings, volunteer programs, and community engagement features.</li>
                            <li>The Wekume Rewards program.</li>
                            <li>Support and contact forms.</li>
                        </ul>
                    </section>

                    {/* User Responsibilities */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                                <Shield size={20} className="text-pink-600 dark:text-pink-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. User Responsibilities</h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            When using our Services, you agree to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Provide accurate and truthful information when submitting forms or applications.</li>
                            <li>Not use the Services for any unlawful or prohibited purpose.</li>
                            <li>Not attempt to gain unauthorized access to any part of the Services.</li>
                            <li>Not harass, abuse, or harm other users or staff members.</li>
                            <li>Not submit false testimonials or misleading information.</li>
                            <li>Not use automated tools (bots, scrapers) to access the Services without authorization.</li>
                            <li>Respect the confidentiality and safety of the community.</li>
                        </ul>
                    </section>

                    {/* AI Disclaimer */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                <Bot size={20} className="text-orange-600 dark:text-orange-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">4. Lina AI Disclaimer</h2>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-2xl p-6">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                                <strong>Lina AI is not a medical professional.</strong> The information provided by Lina is for educational and informational purposes only and does not constitute medical advice, diagnosis, or treatment.
                            </p>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Always consult a qualified healthcare professional for medical concerns.</li>
                            <li>In case of a medical emergency, contact your local emergency services immediately.</li>
                            <li>Lina AI may detect crisis situations and provide emergency contact information, but this does not replace professional intervention.</li>
                            <li>AI-generated responses may occasionally be inaccurate or incomplete. Wekume Initiative is not liable for decisions made based on Lina's responses.</li>
                        </ul>
                    </section>

                    {/* Intellectual Property */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Scale size={20} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">5. Intellectual Property</h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            All content on the Wekume Initiative platform—including text, graphics, logos, images, videos, and software—is the property of Wekume Initiative or its content suppliers and is protected by applicable intellectual property laws.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>You may not reproduce, distribute, or create derivative works from our content without written permission.</li>
                            <li>Content shared for educational purposes may be referenced with proper attribution to Wekume Initiative.</li>
                            <li>User-submitted content (testimonials, forms) remains the property of the submitter, with a non-exclusive license granted to Wekume for display and promotional purposes.</li>
                        </ul>
                    </section>

                    {/* Limitation of Liability */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                                <AlertTriangle size={20} className="text-pink-600 dark:text-pink-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">6. Limitation of Liability</h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            To the fullest extent permitted by law, Wekume Initiative shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Your use or inability to use the Services.</li>
                            <li>Any information or advice provided by the Lina AI assistant.</li>
                            <li>Unauthorized access to or alteration of your data.</li>
                            <li>Service interruptions or technical failures.</li>
                            <li>Any third-party content or links accessible through our Services.</li>
                        </ul>
                    </section>

                    {/* Termination */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">7. Termination</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We reserve the right to terminate or suspend your access to our Services at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.
                        </p>
                    </section>

                    {/* Governing Law */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Gavel size={20} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">8. Governing Law</h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            These Terms shall be governed by and construed in accordance with the laws of the Republic of Uganda. For users accessing services through Friends of Wekume (USA), applicable US federal and state laws may also apply. Any disputes arising from these Terms shall be resolved through good-faith negotiation, and if necessary, through the courts of competent jurisdiction in Kampala, Uganda.
                        </p>
                    </section>

                    {/* Changes to Terms */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">9. Changes to These Terms</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this page with an updated "Last Updated" date. Your continued use of the Services after any changes constitutes your acceptance of the revised Terms.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Mail size={20} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">10. Contact Us</h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            If you have any questions about these Terms of Use, please contact us at:
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

export default TermsOfUse;
