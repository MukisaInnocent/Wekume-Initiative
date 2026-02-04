import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import WekumeApp from './pages/WekumeApp';
import Events from './pages/Events';
import GetInvolved from './pages/GetInvolved';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    return (
        <div className="App">
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/wekume-app" element={<WekumeApp />} />
                <Route path="/events" element={<Events />} />
                <Route path="/get-involved" element={<GetInvolved />} />
                <Route path="/get-involved" element={<GetInvolved />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/donate" element={<Donate />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
        </div>
    );
}

export default App;
