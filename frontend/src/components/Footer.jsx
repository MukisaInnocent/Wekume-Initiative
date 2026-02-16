import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-purple-900 dark:bg-black text-white mt-12 sm:mt-16 md:mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-lg sm:text-xl font-heading font-bold mb-3 sm:mb-4 text-pink-300 dark:text-pink-400">Wekume Initiative</h3>
                        <p className="text-sm sm:text-base text-gray-300 dark:text-gray-400">
                            Empowering youth through education, innovation, and accessible health resources.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg sm:text-xl font-heading font-bold mb-3 sm:mb-4 text-pink-300 dark:text-pink-400">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-sm sm:text-base text-gray-300 dark:text-gray-400 hover:text-primary-300 dark:hover:text-primary-400 transition-colors">About Us</Link></li>
                            <li><Link to="/events" className="text-sm sm:text-base text-gray-300 dark:text-gray-400 hover:text-primary-300 dark:hover:text-primary-400 transition-colors">Events</Link></li>
                            <li><Link to="/testimonials" className="text-sm sm:text-base text-gray-300 dark:text-gray-400 hover:text-primary-300 dark:hover:text-primary-400 transition-colors">Testimonials</Link></li>
                            <li><Link to="/get-involved" className="text-sm sm:text-base text-gray-300 dark:text-gray-400 hover:text-primary-300 dark:hover:text-primary-400 transition-colors">Get Involved</Link></li>
                            <li><Link to="/contact" className="text-sm sm:text-base text-gray-300 dark:text-gray-400 hover:text-primary-300 dark:hover:text-primary-400 transition-colors">Contact</Link></li>
                            <li><Link to="/admin" className="text-sm sm:text-base text-gray-300 dark:text-gray-400 hover:text-primary-300 dark:hover:text-primary-400 transition-colors">Admin Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg sm:text-xl font-heading font-bold mb-3 sm:mb-4 text-pink-300 dark:text-pink-400">Contact Us</h3>
                        <p className="text-sm sm:text-base text-gray-300 dark:text-gray-400">Email: info@wekume.org</p>
                        <p className="text-sm sm:text-base text-gray-300 dark:text-gray-400">Phone: +256 XXX XXX XXX</p>
                    </div>
                </div>

                <div className="border-t border-purple-800 dark:border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm sm:text-base text-gray-300 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Wekume Initiative. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
