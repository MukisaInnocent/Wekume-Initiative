import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { RegionProvider } from './context/RegionContext';
import { SidebarProvider } from './context/SidebarContext';
import ScrollToTop from './components/ScrollToTop';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import About from './pages/About';
import WekumeApp from './pages/WekumeApp';
import Reports from './pages/Reports';
import Contact from './pages/Contact';
import Support from './pages/Support';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import LinaAIChat from './components/LinaAIChat';

import Activities from './pages/Activities';
import Team from './pages/Team';
import USHome from './pages/us/USHome';
import USFunders from './pages/us/USFunders';
import USImpact from './pages/us/USImpact';
import Rewards from './pages/Rewards';
function AppContent() {
    const location = useLocation();
    
    // Hide AI chat on the landing welcome page and admin pages
    const hideChat = location.pathname === '/' || location.pathname.startsWith('/admin');

    return (
        <div className="App min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Welcome />} />
                {/* Redirects for legacy URLs */}
                <Route path="/uganda" element={<Navigate to="/ug" replace />} />
                <Route path="/about" element={<Navigate to="/ug/about" replace />} />
                <Route path="/wekume-app" element={<Navigate to="/ug/wekume-app" replace />} />
                <Route path="/events" element={<Navigate to="/ug/activities" replace />} />
                <Route path="/get-involved" element={<Navigate to="/ug/activities" replace />} />
                <Route path="/reports" element={<Navigate to="/ug/reports" replace />} />
                <Route path="/contact" element={<Navigate to="/ug/contact" replace />} />
                <Route path="/testimonials" element={<Navigate to="/ug/activities" replace />} />
                <Route path="/support" element={<Navigate to="/us/support" replace />} />

                {/* Uganda (UG) Routes */}
                <Route path="/ug" element={<Home />} />
                <Route path="/ug/about" element={<About />} />
                <Route path="/ug/team" element={<Team />} />
                <Route path="/ug/wekume-app" element={<WekumeApp />} />
                <Route path="/ug/events" element={<Navigate to="/ug/activities" replace />} />
                <Route path="/ug/get-involved" element={<Navigate to="/ug/activities" replace />} />
                <Route path="/ug/reports" element={<Reports />} />
                <Route path="/ug/contact" element={<Contact />} />
                <Route path="/ug/testimonials" element={<Navigate to="/ug/activities" replace />} />
                <Route path="/ug/activities" element={<Activities />} />
                <Route path="/ug/rewards" element={<Rewards />} />

                {/* United States (US) Routes */}
                <Route path="/us" element={<USHome />} />
                <Route path="/us/funders" element={<USFunders />} />
                <Route path="/us/impact" element={<USImpact />} />
                {/* Shared routes for US */}
                <Route path="/us/about" element={<About />} />
                <Route path="/us/team" element={<Team />} />
                <Route path="/us/wekume-app" element={<WekumeApp />} />
                <Route path="/us/events" element={<Navigate to="/us/activities" replace />} />
                <Route path="/us/get-involved" element={<Navigate to="/us/activities" replace />} />
                <Route path="/us/reports" element={<Reports />} />
                <Route path="/us/contact" element={<Contact />} />
                <Route path="/us/testimonials" element={<Navigate to="/us/activities" replace />} />
                <Route path="/us/activities" element={<Activities />} />
                <Route path="/us/support" element={<Support />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
            {!hideChat && <LinaAIChat />}
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <RegionProvider>
                <SidebarProvider>
                    <ScrollToTop />
                    <AppContent />
                </SidebarProvider>
            </RegionProvider>
        </ThemeProvider>
    );
}

export default App;
