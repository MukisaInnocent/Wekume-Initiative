import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Events() {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-5xl font-heading font-bold text-center mb-8">Events & Programs</h1>
                <p className="text-center text-lg text-gray-700">
                    Events will be dynamically loaded from CMS.
                </p>
            </div>
            <Footer />
        </>
    );
}

export default Events;
