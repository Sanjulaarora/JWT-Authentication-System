import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export const passwordReset = async (req, res) => {
    try {

        const { email, oldPassword, newPassword, newPasswordAgain } = req.body;

        // validate input fields
        if(!email || !oldPassword || !newPassword || !newPasswordAgain) {
            return res.status(422).json({ message: "All fields are required", success: false });
        }

        // check if new password and password again match
        if(newPassword !== newPasswordAgain) {
            return res.status(422).json({ message: "New password and password again do not match", success: false });
        }

        // find user by email
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // compare old password with stored hash
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if(!isMatch) {
            return res.status(401).json({ message: "Incorrect old password", success: false });
        }

        // check if the new password is the same as the old password
        const isSamePassword = await bcrypt.compare(newPassword, user.password);

        if(isSamePassword) {
            return res.status(400).json({ message: "New password cannot be the same as the old password", success: false });
        }

        // hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // update the password in the database
        user.password = hashedPassword;
        await user.save();

        console.log("Password Reset successfully");
        return res.status(200).json({ message: "Password Reset Successfully", success: true });
    } catch (error) {
        console.log("Error in password reset:", error.message);
        return res.status(500).json({ message: "Server error", success: false });
    }
};
