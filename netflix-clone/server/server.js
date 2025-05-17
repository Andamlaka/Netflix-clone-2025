const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ Step A: import cors
dotenv.config();

const app = express();

// ✅ Step B: define cors options
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,               // Allow cookies / auth headers
};

// ✅ Step C: use cors BEFORE defining routes
app.use(cors(corsOptions));

app.use(express.json());

// ✅ Step D: define your routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
console.log("✅ Auth routes registered successfully!");

// ✅ Step E: run the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
