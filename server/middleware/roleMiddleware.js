// Generic role-based authorization (flexible)
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: You don't have permission to access this resource",
      });
    }
    next();
  };
};

// Admin-only middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Access denied: Admin resource",
    });
  }
};

// Vendor-only middleware
const isVendor = (req, res, next) => {
  if (req.user && req.user.role === "vendor") {
    next();
  } else {
    res.status(403).json({
      message: "Access denied: Vendor resource",
    });
  }
};

export { isAdmin, isVendor };
export default authorizeRoles;
