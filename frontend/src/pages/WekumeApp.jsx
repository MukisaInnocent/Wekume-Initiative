import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function WekumeApp() {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-5xl font-heading font-bold text-center mb-8">Wekume App</h1>
                <p className="text-center max-w-3xl mx-auto text-lg text-gray-700">
                    App details and download links will be dynamically loaded from CMS.
                </p>
            </div>
            <Footer />
        </>
    );
}

export default WekumeApp;
