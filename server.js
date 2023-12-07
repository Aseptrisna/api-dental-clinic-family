const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const commonRoutes = require("./routes/commonRoutes");
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const path = require('path');

const connectDB = require("./config/db");

dotenv.config();
connectDB();
app.use(express.json());
app.use("*", cors());

// app.get("/", (req, res) => {
//   res.send("API is Running");
// });

app.use(express.static(path.join(__dirname, './build')));

app.use("/user", commonRoutes);
app.use("/user/admin", adminRoutes);
app.use("/user/doctor", doctorRoutes);
app.use("/user/patient", patientRoutes);

// Catch-all route for serving React.js build
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on port ${PORT}....`));
