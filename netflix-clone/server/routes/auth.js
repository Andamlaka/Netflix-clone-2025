const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();
console.log("🔹 Auth routes file loaded...");

const SECRET_KEY = process.env.JWT_SECRET || "yourSuperSecretKey";

// 🔹 Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, secretQuestion, secretAnswer } = req.body;

  if (!name || !email || !password || !secretQuestion || !secretAnswer) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedAnswer = await bcrypt.hash(secretAnswer.toLowerCase(), 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        secretQuestion,
        secretAnswer: hashedAnswer,
      },
    });

    res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(400).json({ error: "Email already exists!" });
  }
});

// 🔹 Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: normalizedEmail,
        mode: "insensitive",
      },
    },
  });

  if (!user)
    return res.status(401).json({ error: "Invalid email or password!" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(401).json({ error: "Invalid email or password!" });

  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login successful!", token });
});

// 🔹 Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  console.log("📩 Forgot password request for:", normalizedEmail);

  // TEMP: Log all users
  const allUsers = await prisma.user.findMany();
  console.log("📦 All Users:", allUsers.map(u => u.email));

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: normalizedEmail,
          mode: "insensitive",
        },
      },
    });

    if (!user) {
      console.log("❌ No user found for:", normalizedEmail);
      return res.status(404).json({ error: "User not found!" });
    }

    console.log("✅ User found:", user.email);
    res.json({ question: user.secretQuestion });
  } catch (err) {
    console.error("🔥 Error in forgot-password:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Reset Password
router.post("/reset-password", async (req, res) => {
   console.log("🔔 Reset-password route hit with body:", req.body);
  const { email, secretAnswer, newPassword } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: normalizedEmail,
          mode: "insensitive",
        },
      },
    });

    if (!user) {
      console.log("❌ User not found:", normalizedEmail);
      return res.status(404).json({ error: "User not found!" });
    }

    console.log("🔐 Comparing secret answers...");
    console.log("Provided answer:", secretAnswer.toLowerCase());
    console.log("Stored hashed answer:", user.secretAnswer);

    const isAnswerCorrect = await bcrypt.compare(
      secretAnswer.toLowerCase(),
      user.secretAnswer
    );

    if (!isAnswerCorrect) {
      console.log("❌ Secret answer did not match for:", normalizedEmail);
      return res.status(403).json({ error: "Incorrect secret answer!" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    console.log("✅ Password reset successfully for:", normalizedEmail);
    return res.json({ message: "Password reset successfully!" });

  } catch (err) {
    console.error("🔥 Reset password error:", err);
    res.status(500).json({ error: "Server error" });
  }
});



// 🔹 Log registered routes
console.log("✅ Auth Routes Initialized:");
router.stack.forEach((layer) => {
  if (layer.route) {
    const methods = Object.keys(layer.route.methods)
      .map((m) => m.toUpperCase())
      .join(", ");
    console.log(`  ${methods} /api/auth${layer.route.path}`);
  }
});

module.exports = router;
