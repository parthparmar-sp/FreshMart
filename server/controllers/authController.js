import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 🛑 Security Check: Block public admin registration
    if (role === "admin") {
      return res.status(403).json({ message: "Registration of admin role is restricted" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Send Welcome Email
    try {
      await sendEmail({
        email: user.email,
        subject: "Welcome to FreshMart!",
        message: `Hi ${user.name},\n\nWelcome to FreshMart! We are excited to have you on board. Start shopping for fresh groceries now!\n\nBest Regards,\nThe FreshMart Team`,
        html: `
          <h1>Welcome to FreshMart!</h1>
          <p>Hi <strong>${user.name}</strong>,</p>
          <p>Welcome to FreshMart! We are excited to have you on board. Start shopping for fresh groceries now!</p>
          <br/>
          <p>Best Regards,<br/>The FreshMart Team</p>
        `,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
      // We don't return error here because user is already created
    }

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER PROFILE
export const getUserProfile = async (req, res) => {
  try {
    // req.user is set by the protect middleware
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      pincode: user.pincode,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE USER PROFILE
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      user.city = req.body.city || user.city;
      user.state = req.body.state || user.state;
      user.pincode = req.body.pincode || user.pincode;

      if (req.body.password) {
        // Hash password if needed, but bcrypt hashing is usually done in pre-save or separate setter
        // user.password = req.body.password; 
        // For now, let's skip password update here or assume pre-save hook handles it if you have one.
        // The original register controller hashed it manually.
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await user.save();

      res.json({
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        address: updatedUser.address,
        city: updatedUser.city,
        state: updatedUser.state,
        pincode: updatedUser.pincode,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};