# Wekume Initiative Backend API

A comprehensive REST API for the Wekume Initiative CMS platform, built with Node.js, Express, and PostgreSQL.

## Features

- 🔐 JWT-based authentication with role-based access control
- 📝 Dynamic content management system
- 🖼️ Media library with Cloudinary integration
- 🤖 AI assistant integration
- 📊 Analytics and reporting
- ✅ Form submissions (support, volunteer applications)

## Prerequisites

- Node.js >= 16.x
- PostgreSQL >= 13.x
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
cd backend
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
   - Database credentials
   - JWT secret
   - Cloudinary API keys
   - OpenAI API key

5. Create PostgreSQL database:
```sql
CREATE DATABASE wekume_db;
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `POST /api/auth/change-password` - Change password (protected)

### Public Content (`/api/content`)
- `GET /api/content/sections` - Get all content sections
- `GET /api/content/sections/:key` - Get specific section
- `GET /api/content/partners` - Get all partners
- `GET /api/content/events` - Get published events
- `GET /api/content/events/:id` - Get specific event
- `GET /api/content/testimonials` - Get approved testimonials
- `GET /api/content/reports` - Get published reports
- `GET /api/content/values` - Get organization values
- `GET /api/content/app-features` - Get Wekume App features
- `GET /api/content/social-links` - Get social media links
- `POST /api/content/forms/support` - Submit support form
- `POST /api/content/forms/volunteer` - Submit volunteer application

### Admin (`/api/admin`) - Coming Soon
- Content management CRUD operations
- Media library management
- Analytics dashboard
- User management

### AI Assistant (`/api/ai`) - Coming Soon
- Chat endpoint
- Conversation history

## Project Structure

```
backend/
├── config/              # Configuration files
│   ├── database.js     # Sequelize config
│   └── cloudinary.js   # Cloudinary config
├── controllers/        # Request handlers
│   ├── authController.js
│   ├── contentController.js
│   └── formController.js
├── middleware/         # Express middleware
│   ├── auth.js        # JWT authentication
│   └── roleCheck.js   # Role-based access control
├── models/ # Database models
│   ├── User.js
│   ├── ContentSection.js
│   ├── Event.js
│   └── ... (14 models total)
├── routes/             # Route definitions
│   ├── auth.js
│   └── content.js
├── .env.example        # Environment template
├── package.json
└── server.js           # Main application file
```

## Database Models

The system includes 14 database tables:
- `users` - User accounts and authentication
- `content_sections` - Dynamic website content
- `partners` - Partner organizations
- `events` - Events and programs
- `testimonials` - User testimonials
- `reports` - Annual/periodic reports
- `media_library` - Uploaded media files
- `values` - Organization values
- `wekume_app_features` - App features
- `support_forms` - Contact/support submissions
- `ai_assistant_logs` - AI interaction logs
- `page_analytics` - Page visit tracking
- `volunteer_applications` - Volunteer applications
- `social_links` - Social media links

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Environment Variables

See `.env.example` for all required configuration variables.

## Development

To run tests:
```bash
npm test
```

## Deployment

This backend is configured for deployment on:
- Render (recommended)
- Railway
- Heroku

## License

MIT
