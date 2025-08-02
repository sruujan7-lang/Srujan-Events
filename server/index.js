const express = require("express");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files
app.use("/uploads", express.static(uploadsDir));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// In-memory storage (replace with database in production)
let contacts = [];
let galleryImages = [];
let blogPosts = [];
let testimonials = [];

// Admin credentials (use environment variables in production)
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "srujan2024",
};

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Email configuration
const emailTransporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

// Routes

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Contact form submission
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, eventType, eventDate, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !eventType || !message) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }

    // Create contact entry
    const contact = {
      id: Date.now(),
      name,
      email,
      phone,
      eventType,
      eventDate,
      message,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    contacts.push(contact);

    // Send email notification (if configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await emailTransporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `New Contact Form Submission - ${eventType}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Event Type:</strong> ${eventType}</p>
            <p><strong>Event Date:</strong> ${eventDate || "Not specified"}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
          `,
        });

        // Send confirmation email to client
        await emailTransporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Thank you for contacting Srujan Events",
          html: `
            <h2>Thank you for your inquiry!</h2>
            <p>Dear ${name},</p>
            <p>We have received your message about your ${eventType.toLowerCase()} event. Our team will get back to you within 24 hours.</p>
            <p>Here's a summary of your submission:</p>
            <ul>
              <li><strong>Event Type:</strong> ${eventType}</li>
              <li><strong>Event Date:</strong> ${
                eventDate || "Not specified"
              }</li>
            </ul>
            <p>Best regards,<br>Srujan Events Team</p>
          `,
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Continue execution even if email fails
      }
    }

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Get gallery images
app.get("/api/gallery", (req, res) => {
  const { category } = req.query;

  let filteredImages = galleryImages.filter(
    (img) => img.status === "published"
  );

  if (category && category !== "all") {
    filteredImages = filteredImages.filter((img) => img.category === category);
  }

  res.json(filteredImages);
});

// Admin login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "24h" });
      res.json({ token, message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all contacts (admin only)
app.get("/api/admin/contacts", verifyToken, (req, res) => {
  res.json(
    contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  );
});

// Update contact status (admin only)
app.put("/api/admin/contacts/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const contactIndex = contacts.findIndex((c) => c.id === parseInt(id));

  if (contactIndex === -1) {
    return res.status(404).json({ message: "Contact not found" });
  }

  contacts[contactIndex].status = status;
  contacts[contactIndex].updatedAt = new Date().toISOString();

  res.json(contacts[contactIndex]);
});

// Upload gallery image (admin only)
app.post(
  "/api/admin/gallery",
  verifyToken,
  upload.single("image"),
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      const { title, description, category } = req.body;

      const image = {
        id: Date.now(),
        url: `/uploads/${req.file.filename}`,
        title: title || "Untitled",
        description: description || "",
        category: category || "other",
        status: "published",
        createdAt: new Date().toISOString(),
      };

      galleryImages.push(image);

      res.status(201).json(image);
    } catch (error) {
      console.error("Gallery upload error:", error);
      res.status(500).json({ message: "Failed to upload image" });
    }
  }
);

// Get dashboard statistics (admin only)
app.get("/api/admin/stats", verifyToken, (req, res) => {
  const stats = {
    totalContacts: contacts.length,
    newContacts: contacts.filter((c) => c.status === "new").length,
    totalGalleryImages: galleryImages.length,
    totalBlogPosts: blogPosts.length,
    totalTestimonials: testimonials.length,
    recentContacts: contacts
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5),
  };

  res.json(stats);
});

// Get published blog posts
app.get("/api/blog", (req, res) => {
  const publishedPosts = blogPosts
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(publishedPosts);
});

// Create blog post (admin only)
app.post("/api/admin/blog", verifyToken, (req, res) => {
  try {
    const { title, content, excerpt, category } = req.body;

    const post = {
      id: Date.now(),
      title,
      content,
      excerpt,
      category: category || "general",
      status: "published",
      createdAt: new Date().toISOString(),
    };

    blogPosts.push(post);

    res.status(201).json(post);
  } catch (error) {
    console.error("Blog post creation error:", error);
    res.status(500).json({ message: "Failed to create blog post" });
  }
});

// Get testimonials
app.get("/api/testimonials", (req, res) => {
  const approvedTestimonials = testimonials
    .filter((t) => t.status === "approved")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(approvedTestimonials);
});

// Add testimonial (admin only)
app.post("/api/admin/testimonials", verifyToken, (req, res) => {
  try {
    const { name, message, rating, event } = req.body;

    const testimonial = {
      id: Date.now(),
      name,
      message,
      rating: parseInt(rating),
      event: event || "",
      status: "approved",
      createdAt: new Date().toISOString(),
    };

    testimonials.push(testimonial);

    res.status(201).json(testimonial);
  } catch (error) {
    console.error("Testimonial creation error:", error);
    res.status(500).json({ message: "Failed to create testimonial" });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large" });
    }
  }

  console.error("Server error:", error);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
