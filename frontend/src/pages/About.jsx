import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-5xl font-heading font-bold text-center mb-8">About Wekume Initiative</h1>
                <div className="prose max-w-none">
                    <p className="text-lg text-gray-700 mb-6">
                        Content will be dynamically loaded from the CMS once admin creates it.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;
