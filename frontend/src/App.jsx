import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { RegionProvider } from './context/RegionContext';
import ScrollToTop from './components/ScrollToTop';
import Welcome from './pages/Welcome';
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
import KiraAIChat from './components/KiraAIChat';
import FounderBadge from './components/FounderBadge';
import Testimonials from './pages/Testimonials';
import USHome from './pages/us/USHome';
import USFunders from './pages/us/USFunders';
import USRewards from './pages/us/USRewards';
import USImpact from './pages/us/USImpact';
function AppContent() {
    const location = useLocation();
    // Hide AI chat on the landing welcome page and admin pages
    const hideChat = location.pathname === '/' || location.pathname.startsWith('/admin');

    return (
        <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Welcome />} />
                {/* Redirects for legacy URLs */}
                <Route path="/uganda" element={<Navigate to="/ug" replace />} />
                <Route path="/about" element={<Navigate to="/ug/about" replace />} />
                <Route path="/wekume-app" element={<Navigate to="/ug/wekume-app" replace />} />
                <Route path="/events" element={<Navigate to="/ug/events" replace />} />
                <Route path="/get-involved" element={<Navigate to="/ug/get-involved" replace />} />
                <Route path="/reports" element={<Navigate to="/ug/reports" replace />} />
                <Route path="/contact" element={<Navigate to="/ug/contact" replace />} />
                <Route path="/testimonials" element={<Navigate to="/ug/testimonials" replace />} />
                <Route path="/donate" element={<Navigate to="/us/donate" replace />} />

                {/* Uganda (UG) Routes */}
                <Route path="/ug" element={<Home />} />
                <Route path="/ug/about" element={<About />} />
                <Route path="/ug/wekume-app" element={<WekumeApp />} />
                <Route path="/ug/events" element={<Events />} />
                <Route path="/ug/get-involved" element={<GetInvolved />} />
                <Route path="/ug/reports" element={<Reports />} />
                <Route path="/ug/contact" element={<Contact />} />
                <Route path="/ug/testimonials" element={<Testimonials />} />

                {/* United States (US) Routes */}
                <Route path="/us" element={<USHome />} />
                <Route path="/us/funders" element={<USFunders />} />
                <Route path="/us/rewards" element={<USRewards />} />
                <Route path="/us/impact" element={<USImpact />} />
                {/* Shared routes for US */}
                <Route path="/us/about" element={<About />} />
                <Route path="/us/wekume-app" element={<WekumeApp />} />
                <Route path="/us/events" element={<Events />} />
                <Route path="/us/get-involved" element={<GetInvolved />} />
                <Route path="/us/reports" element={<Reports />} />
                <Route path="/us/contact" element={<Contact />} />
                <Route path="/us/testimonials" element={<Testimonials />} />
                <Route path="/us/donate" element={<Donate />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
            <FounderBadge />
            {!hideChat && <KiraAIChat />}
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <RegionProvider>
                <ScrollToTop />
                <AppContent />
            </RegionProvider>
        </ThemeProvider>
    );
}

export default App;
