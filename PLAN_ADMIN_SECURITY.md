# Admin Security & Fixed Credentials Plan

This plan addresses the requirement to fix admin credentials and prevent unauthorized admin registration.

## User Review Required

> [!IMPORTANT]
> - I will be restricting the registration API so that no one can register with the `"admin"` role.
> - I will set the fixed admin credentials as:
>   - **Email**: `admin2711@gmail.com`
>   - **Password**: `admin11`

## Proposed Changes

### [server]
#### [MODIFY] [authController.js](file:///d:/FRESHMART/server/controllers/authController.js)
- Update `registerUser` to reject any registration attempt where `role === "admin"`.
- This ensures that only "user" and "vendor" roles can be created via the public signup form.

#### [MODIFY] [Register.jsx](file:///d:/FRESHMART/frontend/src/pages/Register.jsx)
- Remove the "Admin" option from the role selection dropdown.
- This prevents users from even trying to select the admin role during signup.

#### [MODIFY] [seed.js](file:///d:/FRESHMART/server/seed.js)
- Update the admin user creation block to use the specified email and password.
- This script can be run to initialize/ensure the admin account exists in the database.

## Verification Plan

### Manual Verification
1. **Test Registration**: Attempt to register a new user as an admin using a tool or the UI and verify it fails or defaults to "user".
2. **Run Seed Script**: Execute `node seed.js` in the `server` directory and verify the admin user is created.
3. **Test Login**: Log in with `admin2711@gmail.com` / `admin11` and verify access.

> [!NOTE]
> As per your request, I will **not** push these changes to git until you approve.
