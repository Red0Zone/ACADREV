// app.js
const db = require("./config/db");
const path = require("path"); // ← make sure this line is present

const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes"); // Adjust the path as needed
const universityRoutes = require("./routes/universityRoutes"); // University routes
const collegeRoutes = require("./routes/collegeRoutes"); // collages routes
const departmentRoutes = require("./routes/departmentRoutes"); // department routes
const userRoutes = require("./routes/userRoutes"); // user routes
const programRoutes = require("./routes/programRoutes");
const authorityRoutes = require("./routes/authorityRoutes");
const cors = require("cors"); // Import CORS middleware

// Evaluation routes
const qntRoutes = require("./routes/qntRoutes"); // Quantitative evaluation
const qualRoutes = require("./routes/qualRoutes"); // Qualitative evaluation

const adminRoutes = require("./routes/adminRoutes"); // For Admin
const reportRoutes = require("./routes/reportRoutes");
const qualitativeRoutes = require("./routes/qualitativeScoreRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes"); // Statistics routes

app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Enable CORS for all routes
// Mount the auth routes
app.use("/auth", authRoutes); // All auth routes will be prefixed with /auth
app.use("/authority", authorityRoutes);
app.use("/universities", universityRoutes); // University routes for adding universities
app.use("/colleges", collegeRoutes); // collages routes for adding universities
app.use("/departments", departmentRoutes); // department routes
app.use("/users", userRoutes); // user routes
app.use("/programs", programRoutes);
app.use("/qnt", qntRoutes); // Quantitative
app.use("/qual", qualRoutes); // Qualitative
app.use("/admin", adminRoutes);
app.use("/report", reportRoutes);
app.use("/qualitative", qualitativeRoutes);
app.use("/statistics", statisticsRoutes); // Statistics routes

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ... other routes and middleware ...

module.exports = app; // Export the configured app
