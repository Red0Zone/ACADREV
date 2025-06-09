// app.js

const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes'); // Adjust the path as needed
const universityRoutes = require('./routes/universityRoutes'); // University routes
const collegeRoutes = require('./routes/collegeRoutes'); // collages routes
const departmentRoutes = require('./routes/departmentRoutes'); // department routes
const userRoutes = require('./routes/userRoutes'); // user routes
const programRoutes = require('./routes/programRoutes');
const authorityRoutes = require('./routes/authorityRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cors = require('cors'); // Import CORS middleware

// Evaluation routes
const qntRoutes = require('./routes/qntRoutes');     // Quantitative evaluation
const qualRoutes = require('./routes/qualRoutes');   // Qualitative evaluation
app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Enable CORS for all routes
// Mount the auth routes
app.use('/auth', authRoutes); // All auth routes will be prefixed with /auth
app.use('/authority', authorityRoutes);
app.use('/universities', universityRoutes); // University routes for adding universities
app.use('/colleges', collegeRoutes); // collages routes for adding universities
app.use('/departments', departmentRoutes); // department routes
app.use('/users', userRoutes); // user routes
app.use('/programs', programRoutes);
app.use('/profile', profileRoutes);
app.use('/qnt', qntRoutes);     // Quantitative
app.use('/qual', qualRoutes);   // Qualitative
// ... other routes and middleware ...

module.exports = app; // Export the configured app