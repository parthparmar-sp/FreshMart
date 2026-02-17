import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected for admin creation...");

        const admins = [
            { email: "admin2711@gmail.com", password: "admin11", name: "Super Admin" },
            { email: "admin123@gmail.com", password: "admin11", name: "Admin 123" }
        ];

        for (const admin of admins) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(admin.password, salt);

            const user = await User.findOneAndUpdate(
                { email: admin.email },
                {
                    name: admin.name,
                    email: admin.email,
                    password: hashedPassword,
                    role: "admin"
                },
                { upsert: true, new: true }
            );
            console.log(`Admin account [${user.email}] updated successfully.`);
        }

        process.exit();
    } catch (error) {
        console.error("Error creating admin:", error.message);
        process.exit(1);
    }
};

createAdmin();
