# Admin Login Troubleshooting

## Quick Test

**Default Credentials:**
- Email: `admin@wekume.org`
- Password: `WekumeAdmin2024!`

## Common Issues & Solutions

### Issue 1: Network Error / Cannot Connect
**Symptoms:** Error message like "Network Error" or "ERR_CONNECTION_REFUSED"

**Solution:**
1. Make sure backend is running:
   - Check terminal running `npm run dev` in backend folder
   - Should see `Server running on port 5000`

2. Test backend health:
   - Open http://localhost:5000/health in browser
   - Should see `{"status":"OK",...}`

### Issue 2: Invalid Credentials
**Symptoms:** Error message "Invalid credentials"

**Solution:**
1. Verify admin user exists:
```bash
cd backend
node setup.js
```

2. This will recreate the admin user if needed

### Issue 3: CORS Error
**Symptoms:** Console shows "CORS policy" error

**Solution:**
- Backend should already have CORS enabled for `http://localhost:5173`
- Restart backend server

### Issue 4: Token/Auth Error
**Symptoms:** Login succeeds but dashboard fails

**Solution:**
1. Clear browser localStorage:
   - Open DevTools (F12)
   - Go to Application → Local Storage
   - Delete all items
   - Try login again

## How to Debug

### Step 1: Check Browser Console
1. Open login page: http://localhost:5173/admin/login
2. Press F12 to open DevTools
3. Go to "Console" tab
4. Try to login
5. Look for error messages - they will show:
   - API URL being called
   - Exact error from backend
   - Status code (401, 500, etc.)

### Step 2: Check Backend Logs
Look at the terminal running backend server. You should see:
- `POST /api/auth/login` when you try to login
- Any error messages

### Step 3: Manual API Test
Open a new terminal and run:
```powershell
# Windows PowerShell
Invoke-WebRequest -Uri http://localhost:5000/health -Method GET

# Should return: {"status":"OK","message":"..."}
```

### Step 4: Verify Password
The password is case-sensitive and includes special characters:
- Capital W: `W`
- Capital A: `A`
- Number: `2024`
- Exclamation mark: `!`

Full password: `WekumeAdmin2024!`

## Still Not Working?

**Tell me:**
1. What error message do you see (exact text)?
2. What does browser console show? (F12 → Console tab)
3. Is backend server running? (check terminal)
4. Can you access http://localhost:5000/health in browser?

This will help me identify the exact problem!
