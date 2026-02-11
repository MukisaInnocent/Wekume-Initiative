# Admin Login Troubleshooting - CORS & Connectivity

If you see: **"Cannot connect to server. Please check your internet connection..."**

This means the frontend cannot talk to the backend.

## ✅ Fix Applied (Refresh Required)
I have updated the backend to **explicitly allow connections** from your frontend.

### Try This First:
1. **Refresh** the login page
2. Try logging in again (Email: `admin@wekume.org`, Pwd: `WekumeAdmin2024!`)

## If It Still Fails:

### 1. Check Backend Terminal
Look at the terminal running the backend (where you see `npm run dev`).
- Do you see lines like: `[2024-...] POST /api/auth/login`?
- If YES: Connection is working! The error is inside the login logic.
- If NO: Request never reached backend.

### 2. Check for "CORS Blocked"
- Do you see `CORS Blocked Origin:` in the backend terminal?
- If so, tell me what URL it says was blocked.

### 3. Verify Ports
- Backend must be on: `http://localhost:5000` (check terminal)
- Frontend must be on: `http://localhost:5175` (check browser URL)

### 4. Direct Test
Open this link in a new tab:
[http://localhost:5000/health](http://localhost:5000/health)

- If it works: Backend is fine.
- If it fails: Backend is stopped. Run `npm run dev` in backend folder.
