import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-purple-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-heading font-bold mb-4 text-pink-300">Wekume Initiative</h3>
                        <p className="text-gray-300">
                            Empowering youth through education, innovation, and accessible health resources.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-heading font-bold mb-4 text-pink-300">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-gray-300 hover:text-primary-300 transition-colors">About Us</Link></li>
                            <li><Link to="/events" className="text-gray-300 hover:text-primary-300 transition-colors">Events</Link></li>
                            <li><Link to="/get-involved" className="text-gray-300 hover:text-primary-300 transition-colors">Get Involved</Link></li>
                            <li><Link to="/contact" className="text-gray-300 hover:text-primary-300 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-heading font-bold mb-4 text-pink-300">Contact Us</h3>
                        <p className="text-gray-300">Email: info@wekume.org</p>
                        <p className="text-gray-300">Phone: +256 XXX XXX XXX</p>
                    </div>
                </div>

                <div className="border-t border-purple-800 mt-8 pt-8 text-center text-gray-300">
                    <p>&copy; {new Date().getFullYear()} Wekume Initiative. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
