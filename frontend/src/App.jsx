import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import About from './pages/About';
import WekumeApp from './pages/WekumeApp';
import Events from './pages/Events';
import GetInvolved from './pages/GetInvolved';
import Reports from './pages/Reports';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ChatWidget from './components/ChatWidget';
import Testimonials from './pages/Testimonials';

function App() {
    return (
        <ThemeProvider>
            <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/wekume-app" element={<WekumeApp />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/get-involved" element={<GetInvolved />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/donate" element={<Donate />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
                <ChatWidget />
            </div>
        </ThemeProvider>
    );
}

export default App;
