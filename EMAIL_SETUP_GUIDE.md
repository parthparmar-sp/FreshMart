# 📧 Email Setup Guide

To enable email notifications in FreshMart, you need to add the following variables to your `server/.env` file.

### Credentials Configuration
Add these to `server/.env`:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_FROM_NAME=FreshMart
```

### 💡 Using Gmail
If you are using Gmail, follow these steps:
1. Go to your **Google Account Settings**.
2. Search for **"App Passwords"** (Note: 2-Step Verification must be enabled).
3. Create an app password for "Mail" and "Windows Computer" (or "Other").
4. Copy the 16-character code and use it as `EMAIL_PASS`.

### Testing
Once configured, you will automatically receive emails when:
- A new user registers.
- An order is placed.
- An order is cancelled.
- An admin updates an order status.

*Note: The server will log "Email sending failed" to the console if these credentials are missing or incorrect, but it will not stop the application from working.*
