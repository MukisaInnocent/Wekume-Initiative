# Database Setup Troubleshooting Guide

## Problem: Database Connection Failed

You're getting an authentication error when trying to connect to PostgreSQL. Here's how to fix it:

---

## Step 1: Check if PostgreSQL is Installed

Open PowerShell and run:
```powershell
Get-Service -Name postgresql*
```

**If you see a service listed:**
- PostgreSQL is installed ✅
- Note the service name (e.g., `postgresql-x64-16`)

**If you see "No service found":**
- PostgreSQL is NOT installed ❌
- Go to Step 2

---

## Step 2: Install PostgreSQL (if needed)

### Download and Install:
1. Go to: https://www.postgresql.org/download/windows/
2. Download the installer (latest version)
3. Run the installer

### During Installation:
- **Password**: Set a password and REMEMBER IT (e.g., `postgres`)
- **Port**: Use default `5432`
- **Locale**: Use default

### After Installation:
PostgreSQL should start automatically. Verify with:
```powershell
Get-Service -Name postgresql*
```

---

## Step 3: Update Your `.env` File

Open `backend/.env` and update these lines with your PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=wekume_db
DB_USER=postgres
DB_PASSWORD=YOUR_ACTUAL_PASSWORD_HERE  # ← Change this!
```

**Common default passwords:**
- `postgres` (most common)
- Empty password (try leaving it blank)
- The password you set during installation

---

## Step 4: Create the Database

### Option A: Using pgAdmin (GUI)
1. Open pgAdmin (installed with PostgreSQL)
2. Connect to your server (use your password)
3. Right-click "Databases" → "Create" → "Database"
4. Name it: `wekume_db`
5. Click "Save"

### Option B: Using Command Line
```powershell
# Connect to PostgreSQL
psql -U postgres

# Enter your password when prompted

# Create database
CREATE DATABASE wekume_db;

# Exit
\q
```

---

## Step 5: Run Setup Again

After completing the above steps:

```bash
cd backend
node setup.js
```

You should see:
```
✅ Database connection successful
✅ Database models synchronized
✅ Super admin created successfully
```

---

## Step 6: Start the Server

```bash
npm run dev
```

Server should run on `http://localhost:5000`

---

## Alternative: Use SQLite for Quick Testing

If PostgreSQL is too complicated right now, you can use SQLite instead:

1. Install SQLite package:
```bash
npm install sqlite3
```

2. Update `backend/config/database.js`:
```javascript
dialect: 'sqlite',
storage: './database.sqlite'
```

3. Comment out DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD in `.env`

4. Run setup:
```bash
node setup.js
```

---

## Common Issues

### "Password authentication failed"
- Double-check your password in `.env`
- Make sure there are no extra spaces
- Try resetting PostgreSQL password

### "Connection refused"
- PostgreSQL service is not running
- Start it: `Start-Service postgresql-x64-16` (use your service name)

### "Database does not exist"
- Run Step 4 to create the database first

---

## Need Help?

If you're still stuck, let me know:
1. Is PostgreSQL installed? (Yes/No)
2. What password did you set during installation?
3. Can you connect using pgAdmin?

Then I can help you configure it properly!
