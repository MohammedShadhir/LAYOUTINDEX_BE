const express = require("express");
const mongoose = require("mongoose");
const locationRoutes = require("./src/routes/locationRoutes");
const deviceRoutes = require("./src/routes/deviceRoutes");

const cors = require("cors");
require("dotenv").config();

// Create Express app
const app = express();
app.use(express.static("public"));
// Middleware
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  "http://localhost:4000",
  "http://localhost:3000",
  "https://layoutindex-front.onrender.com",
]; // Define allowed origins
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is allowed
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add OPTIONS method
};

app.use(cors(corsOptions)); // Use cors middleware with options

// Connect to MongoDB
const mongodbUrl = process.env.MONGODB_URL;

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/locations", locationRoutes);
app.use("/devices", deviceRoutes);
app.use("/api/token", (req, res) => {
  const options = {
    method: "POST",
    url: "https://dev-3uriluzll4q5ecyt.us.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: "https://dev-3uriluzll4q5ecyt.us.auth0.com/api/v2/",
      grant_type: "client_credentials",
    }),
  };

  request(options, (error, response, body) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(JSON.parse(body));
  });
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Location and Device Management API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
