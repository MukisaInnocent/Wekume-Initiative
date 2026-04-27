# Wekume Initiative Platform - Technical Documentation

## 🏗️ Technology Stack

**Frontend:**
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS (with custom 9-color brand palette & glassmorphism)
- **Routing:** React Router DOM (with `/:region/*` parameter mapping)
- **State Management:** React Context API (Theme, Auth, Content data)
- **Animation:** Framer Motion

**Backend:**
- **Framework:** Node.js with Express.js
- **Database:** PostgreSQL (with Sequelize ORM)
- **AI Integration:** OpenAI API (`gpt-4o-mini`) via custom `openaiService.js`
- **File Uploads:** Multer & direct path configurations
- **Authentication:** JSON Web Tokens (JWT) & bcrypt
- **Deployment & Hosting:** Render (Web Services & Postgres Database)

---

## 🧠 Backend API & Services

### API Endpoints
The backend provides a RESTful API grouped into several core domains:

#### **Authentication (`/api/auth`)**
- `POST /login` - Authenticate admin users, returning JWT token.
- `POST /register` - Register a new admin user (Restricted).
- `GET /profile` - Retrieve the current authenticated user's profile.

#### **Content Management (`/api/content` & `/api/admin`)**
- `GET /content/sections` - Fetch active content blocks for frontend display (region aware).
- `PUT /admin/sections/:key` - Update content blocks via CMS.
- `GET /admin/events` | `POST /admin/events` - Manage upcoming events.
- `GET /content/team` | `GET /content/reports` | `GET /content/testimonials` - Fetch respective module data for frontend.

#### **Forms & Contributions (`/api/forms` & `/api/donations`)**
- `POST /content/forms/support` - Submit "Get Involved" and Partnership forms.
- `POST /donations` - Create a simulation contribution intent.

#### **AI Chat (`/api/ai`)**
- `POST /chat` - Process chat message history. Internally checks for Crisis keywords to log a high-priority ticket and respond immediately without querying OpenAI, or requests completion from OpenAI for SRH issues.
- `GET /conversations` - Admin endpoint to read historical user chat logs.
- `GET /analytics` - Return AI usage statistics and escalation rates.

### Database Models
- **User:** Admin accounts for the CMS.
- **Event:** Event details (webinars, outreaches).
- **Report:** Uploaded PDF resources.
- **TeamMember:** Personnel listings (categorized by department).
- **Testimonial:** Success stories.
- **SupportForm:** Captured form submissions from the frontend.
- **AIAssistantLog:** Logs of all AI interactions and escalated support threads.
- **ContentSection:** Dynamic JSON text blocks for page configuration without code changes.

---

## 🎨 Frontend Architecture

### Page Structure
The frontend divides user-facing pages into `src/pages/` under specific route contexts (Global, `ug/`, `us/`).
- **`Welcome.jsx` / `Home.jsx`:** The landing pages pulling from `ContentSections`.
- **`About.jsx` / `Team.jsx`:** Organizational mission and staff.
- **`Activities.jsx`:** Event listings and AI Chat promotion.
- **`Reports.jsx`:** Published document archive.
- **`Support.jsx`:** Wizard-driven contribution/volunteer form.
- **`AdminLogin.jsx` & `AdminDashboard.jsx`:** Protected CMS routes.

### Design System
- Centered on `src/index.css` via custom CSS variable tokenization.
- Defined primary colors: `primary` (Pink), `secondary` (Purple), `accent` (Orange), with respective scaling from `50` to `900`.
- All user-facing components strictly consume these semantic Tailwind classes rather than hardcoded hex values to support dynamic dark/light mode switching (`bg-gray-900` vs `bg-white`).

### Component Breakdown
- **`LinaAIChat.jsx`:** Floating chat assistant component utilizing Framer Motion for entrance/exit. Handles session storage of chat threads.
- **`Modal.jsx`:** Accessible, body-locking, Esc-dismissable generic modal system.
- **`Accordion.jsx`:** Accessible interactive FAQ lists with `aria-expanded` properties.

---

## 🛠️ Security & Error Handling
- The frontend features human-friendly error handling. Axios interceptors watch for 401 statuses, automatically scrubbing localStorage and gracefully redirecting to `/admin/login`.
- Form errors never surface technical stack traces; instead, they map HTTP exceptions to user-centric phrases like "We couldn’t log you in. Please check your email and password."
