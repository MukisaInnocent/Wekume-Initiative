# Wekume Initiative Frontend

Modern, responsive web application for the Wekume Initiative CMS platform, built with React and Vite.

## Features

- 🎨 Modern, youth-friendly design with TailwindCSS
- 📱 Fully responsive (mobile-first)
- ⚡ Fast performance with Vite
- 🔐 Admin authentication and dashboard
- 🎯 Dynamic content from CMS API
- 🤖 AI assistant integration (coming soon)

## Prerequisites

- Node.js >= 16.x
- npm or yarn

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Development mode:
```bash
npm run dev
```

The app will run on `http://localhost:5173`

### Production build:
```bash
npm run build
npm run preview
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/     # Reusable components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── WekumeApp.jsx
│   │   ├── Events.jsx
│   │   ├── GetInvolved.jsx
│   │   ├── Contact.jsx
│   │   ├── AdminLogin.jsx
│   │   └── AdminDashboard.jsx
│   ├── services/       # API services
│   │   └── api.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Available Pages

### Public Pages
- `/` - Homepage
- `/about` - About Wekume Initiative
- `/wekume-app` - Wekume App information
- `/events` - Events and programs
- `/get-involved` - Volunteer and partnership
- `/contact` - Contact form and AI assistant

### Admin Pages
- `/admin/login` - Admin authentication
- `/admin/dashboard` - Admin CMS dashboard

## Design System

### Colors
- **Primary**: Blue shades (#0ea5e9 to #0c4a6e)
- **Secondary**: Purple/Pink shades (#d946ef to #701a75)

### Typography
- **Headings**: Outfit font family
- **Body**: Inter font family

### Utilities
- `glass` - Glassmorphism effect
- `gradient-primary` - Primary gradient background
- `gradient-secondary` - Secondary gradient background
- `animate-fade-in` - Fade in animation

## API Integration

All API calls are centralized in `src/services/api.js`. The Axios instance automatically:
- Adds JWT tokens to requests
- Handles 401 unauthorized responses
- Provides consistent error handling

## Development

To add a new page:
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation if needed

## Deployment

This frontend is configured for deployment on:
- Vercel (recommended)
- Netlify
- Cloudflare Pages

## License

MIT
