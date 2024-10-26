import mongoose from "mongoose";

const trialModel = new mongoose.Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    isVerified: { type: Boolean, default: false }, 
});

export const Users = mongoose.models.users || mongoose.model("users", trialModel);
