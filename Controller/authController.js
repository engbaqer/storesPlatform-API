import User from "../model/users.js";
import VerificationToken from "../model/verificationToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendEmail from "../utils/sendEmail.js";
dotenv.config();

const user = {
  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const hash = await bcrypt.hash(password, 10);
      const userId = await User.create(name, email, hash, role);

      res.status(201).json({
        message: "User created",
        userId,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error12" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          role: user.role,
              
        },
        process.env.JWT_SECRET
      );

      res.json({
        message: "Login successful",
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  sendVerificationCode: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min

      await VerificationToken.create(user.id, code, expiresAt);

      await sendEmail(
        email,
        "Your Verification Code",
        `Your verification code is: ${code}`
      );

      res.json({
        message: "Verification code sent to your email.",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  verifyCode: async (req, res) => {
    try {
      const { email, code } = req.body;
      const user = await User.findByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const tokenEntry = await VerificationToken.findValidToken(user.id, code);

      if (!tokenEntry) {
        return res.status(400).json({ message: "Invalid or expired code." });
      }

      await VerificationToken.markAsUsed(tokenEntry.id);

      // Optional: generate login token
      const token = jwt.sign(
        {
          userId: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET
      );

      res.json({ message: "Code verified", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
};

export default user;
