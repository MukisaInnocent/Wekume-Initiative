import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, Heart, Users, Lightbulb } from 'lucide-react';

function Home() {
    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="gradient-primary text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in">
                        Empowering Youth Through Education & Innovation
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                        Learn. Unlearn. Relearn. Building a healthier, more informed future for young people.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link
                            to="/wekume-app"
                            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                            Download App <ArrowRight size={20} />
                        </Link>
                        <Link
                            to="/get-involved"
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                        >
                            Get Involved
                        </Link>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-heading font-bold text-center mb-12">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100">
                            <Heart className="mx-auto mb-4 text-primary-600" size={48} />
                            <h3 className="text-2xl font-heading font-bold mb-2">Learn, Unlearn, Relearn</h3>
                            <p className="text-gray-600">
                                Embracing continuous growth and adaptation in an ever-changing world.
                            </p>
                        </div>
                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-secondary-50 to-secondary-100">
                            <Users className="mx-auto mb-4 text-secondary-600" size={48} />
                            <h3 className="text-2xl font-heading font-bold mb-2">Innovation</h3>
                            <p className="text-gray-600">
                                Using technology and creative solutions to solve real problems.
                            </p>
                        </div>
                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100">
                            <Lightbulb className="mx-auto mb-4 text-primary-600" size={48} />
                            <h3 className="text-2xl font-heading font-bold mb-2">Accessibility</h3>
                            <p className="text-gray-600">
                                Making education and health resources available to everyone.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="gradient-secondary text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-heading font-bold mb-6">Ready to Make a Difference?</h2>
                    <p className="text-xl mb-8">
                        Join us in empowering the next generation through education, health, and innovation.
                    </p>
                    <Link
                        to="/contact"
                        className="bg-white text-secondary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                    >
                        Contact Us Today
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Home;
