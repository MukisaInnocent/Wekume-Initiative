# Render Deployment Setup

This guide helps you deploy the Wekume Initiative application to Render.com using the `render.yaml` Blueprint.

## Prerequisites
- A [Render](https://render.com) account.
- This repository connected to your Render account.

## Blueprint Configuration (Automatic)
The `render.yaml` file in the root directory defines the infrastructure:
1.  **Database**: Managed PostgreSQL instance.
2.  **Backend**: Node.js web service.
3.  **Frontend**: Static site (built with Vite).

## Manual Environment Variables
The Blueprint handles most variables automatically, but verify these in the Dashboard after deployment:

### Backend Service
- `FRONTEND_URL`: Should be automatically set to your frontend URL (e.g., `https://wekume-frontend.onrender.com`).
- `JWT_SECRET`: Automatically generated.
- `DATABASE_URL`: Automatically linked.

### Frontend Service
- `VITE_API_BASE_URL`: **CRITICAL**: This must be the **PUBLIC URL** of your Backend Service.
    - **Incorrect**: `http://wekume-backend:5050` or `wekume-backend` (Internal names don't work in the browser).
    - **Correct**: `https://wekume-backend.onrender.com` (Copy this from the Backend Service dashboard).
    - Checks: The code automatically appends `/api`, so just the root URL is fine (e.g. `https://your-app.onrender.com`).

## Troubleshooting
- **CORS Errors**: If you see CORS errors in the browser console, ensure the `FRONTEND_URL` environment variable in the Backend Service matches the actual URL of your Frontend Service.
- **404 on API Calls**: Ensure `VITE_API_BASE_URL` on the frontend is pointing to the correct backend URL.

## Deployment Steps
1.  In Render Dashboard, click **New +** -> **Blueprint**.
2.  Connect your repository.
3.  Rent will detect `render.yaml`.
4.  Approve the deployment.
