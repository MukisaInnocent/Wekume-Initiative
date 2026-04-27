# Wekume Initiative - System Integration Test

## Test Checklist

### 1. Backend Startup
- [ ] Server starts without errors
- [ ] Directories created: `/uploads`, `/uploads/backgrounds`, `/uploads/media`
- [ ] Database connection successful
- [ ] All tables created/synced
- [ ] Admin user exists

### 2. File Upload - Backgrounds
**Endpoint:** `POST /api/backgrounds`
- [ ] Login required (returns 401 without token)
- [ ] Accepts JPG, PNG, WEBP only
- [ ] Rejects other file types with error
- [ ] Rejects files > 5MB with error
- [ ] Saves file to `/uploads/backgrounds/`
- [ ] Filename format: `{timestamp}-{randomID}.{ext}`
- [ ] Returns URL in response
- [ ] File persists after server restart

### 3. File Upload - Media
**Endpoint:** `POST /api/admin/media/upload`
- [ ] Login required (returns 401 without token)
- [ ] Accepts JPG, PNG, WEBP only
- [ ] Rejects other file types with error
- [ ] Rejects files > 5MB with error
- [ ] Saves file to `/uploads/media/`
- [ ] Filename format: `{timestamp}-{randomID}.{ext}`
- [ ] Returns URL in response
- [ ] Multiple files can be uploaded without overwriting

### 4. File Serving
**Endpoint:** `GET /uploads/backgrounds/{filename}`
**Endpoint:** `GET /uploads/media/{filename}`
- [ ] Files are publicly accessible
- [ ] Images display correctly in browser
- [ ] CORS headers set correctly
- [ ] 404 returned for non-existent files

### 5. Login System
**Endpoint:** `POST /api/auth/login`
- [ ] Invalid email/password returns 401
- [ ] Valid credentials return token and user
- [ ] Token stored in localStorage
- [ ] Inactive users rejected
- [ ] Error messages are user-friendly

### 6. Frontend Upload Forms
- [ ] Background Manager - Can upload and display
- [ ] Testimonial Form - Can upload photo with validation
- [ ] Report Form - Can upload cover image
- [ ] Event Form - Can upload banner with validation
- [ ] Partner Form - Can upload logo with validation
- [ ] Content Section - Can upload section image
- [ ] Media Library - Can upload and see in gallery
- [ ] All show proper error messages to user

### 7. Error Handling
- [ ] "Please select an image file" - when wrong file type
- [ ] "File size must be less than 5MB" - when file too large
- [ ] "Upload failed. Please try again." - on network error
- [ ] "Unable to save changes. Please try again." - on save error
- [ ] No technical errors shown to users
- [ ] All errors logged to console for debugging

### 8. Database Persistence
- [ ] Uploaded files list in BackgroundImage table
- [ ] public_id field stores filename
- [ ] image_url field stores full URL
- [ ] created_at timestamp accurate
- [ ] uploaded_by references correct user

## Manual Test Steps

### Test 1: Upload Background
```
1. Login to admin panel
2. Go to Dashboard > Backgrounds
3. Click "Upload Image"
4. Select a JPG/PNG file
5. Verify: File appears in list with correct URL
6. Verify: File saved to backend/uploads/backgrounds/
7. Verify: Filename matches pattern {timestamp}-{randomID}.jpg
```

### Test 2: Upload & Display in Form
```
1. Login to admin panel
2. Go to Dashboard > Testimonials
3. Click "Add Testimonial"
4. Upload author photo
5. Verify: Photo appears as preview
6. Verify: URL field populated
7. Save testimonial
8. Verify: Testimonial displays with photo on frontend
```

### Test 3: No File Overwrite
```
1. Upload file named "test.jpg"
2. Upload another file named "test.jpg"
3. Verify: Both files exist in /uploads/
4. Verify: Different filenames (different timestamps/IDs)
5. Verify: Both files accessible via their URLs
```

### Test 4: Error Validation
```
1. Try uploading a .pdf file (should be rejected)
2. Try uploading 10MB file (should be rejected)
3. Try uploading without selecting file
4. Verify: User-friendly errors shown, not technical errors
```

### Test 5: Login Error Handling
```
1. Logout
2. Try login with wrong password
3. Verify: "We couldn't log you in. Please check your email and password."
4. Try with correct credentials
5. Verify: Redirects to dashboard
```

## Success Criteria
✅ All upload points work with unique filenames
✅ No file overwriting occurs
✅ All errors are user-friendly
✅ Files persist after restart
✅ Images display correctly
✅ Login works reliably
✅ No technical errors shown to users
