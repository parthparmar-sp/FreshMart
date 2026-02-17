import mongoose from "mongoose";

const userScehma = new mongoose.Schema(

    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "vendor", "user"],
            default: "user",
        },
        phone: { type: String },
        address: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userScehma);
export default User;