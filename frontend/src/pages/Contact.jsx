import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Contact() {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-5xl font-heading font-bold text-center mb-8">Contact Us</h1>
                <p className="text-center text-lg text-gray-700">
                    Contact form and AI assistant will be integrated here.
                </p>
            </div>
            <Footer />
        </>
    );
}

export default Contact;
