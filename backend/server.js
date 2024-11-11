// Load environment variables from .env file
require("dotenv").config();

// Import dependencies
const express = require("express"); // Web server framework
const mysql = require("mysql2"); // MySQL database client (mysql2 is preferred for promises support)
const cors = require("cors"); // Cross-origin resource sharing
const bcrypt = require("bcrypt"); // Password hashing
const path = require("path"); // Utilities for handling file paths

const app = express(); // Initialize Express app

// Enable CORS and JSON parsing in requests
app.use(cors());
app.use(express.json());

// Set up MySQL database connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "StrongP@ssw0rd2024!",
  database: "login_sample_db",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// MySQL connection test
db.getConnection((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the MySQL database.");
  }
});

// Signup route: creates a new user
app.post("/signup", async (req, res) => {
  const { first_name, last_name, email, password, isAdmin } = req.body;

  try {
    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      "INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES (?, ?, ?, ?, ?)";
    const values = [
      first_name,
      last_name,
      email,
      hashedPassword,
      isAdmin ? 1 : 0,
    ];

    // Insert new user data into database
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Signup Failed:", err);
        return res.status(500).json("Signup Failed");
      }
      return res.status(200).json("Signup Successful");
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json("Signup Failed");
  }
});

// Login route: checks user credentials
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, data) => {
    if (err) {
      return res.status(500).json("Login Failed");
    }
    if (data.length === 0) {
      return res.status(401).json("Invalid Credentials");
    }

    const user = data[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json("Invalid Credentials");
    }

    res.status(200).json({
      message: "Login Successful",
      userDetails: {
        userId: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        isAdmin: user.is_admin === 1,
      },
    });
  });
});

app.post("/logout", (req, res) => {
  // Clear the session or token here
  res.status(200).json({ message: "Logged out successfully" });
});

// Password change route: updates user password
app.post("/change-password", async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = 1; // Assume a fixed user for simplicity

  const sql = "SELECT password FROM users WHERE user_id = ?";
  db.query(sql, [userId], async (err, data) => {
    if (err) {
      return res.status(500).json("Error fetching user data");
    }
    if (data.length === 0) {
      return res.status(404).json("User not found");
    }

    const user = data[0];
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json("Current password is incorrect");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updateSql = "UPDATE users SET password = ? WHERE user_id = ?";
    db.query(updateSql, [hashedNewPassword, userId], (err, result) => {
      if (err) {
        return res.status(500).json("Error updating password");
      }
      res.status(200).json("Password updated successfully");
    });
  });
});

// Orders route: fetches orders for a specific user
app.get("/orders", (req, res) => {
  const userId = 1; // Assume a fixed user

  const sql = "SELECT * FROM orders WHERE user_id = ?";
  db.query(sql, [userId], (err, data) => {
    if (err) {
      return res.status(500).json("Error fetching orders");
    }
    res.status(200).json(data);
  });
});

// Fetch all items route: retrieves all items in the store
app.get("/items", (req, res) => {
  const sql = "SELECT * FROM item ORDER BY id ASC";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json("Error fetching items");
    }
    const itemsWithSizes = data.map((item) => ({
      ...item,
      sizes: [
        { size: "S", available: true },
        { size: "M", available: false },
        { size: "L", available: true },
        { size: "XL", available: true },
      ],
    }));
    res.status(200).json(itemsWithSizes);
  });
});

// Fetch single item by ID route
app.get("/items/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM item WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error("Error fetching product:", err);
      return res.status(500).json({ error: "Server error" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(rows[0]);
  });
});

// Add new item route: inserts a new product into the database
app.post("/items", (req, res) => {
  const { text, src, label, alt } = req.body;
  const sql = "INSERT INTO item (text, src, label, alt) VALUES (?, ?, ?, ?)";
  const values = [text, src, label, alt];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding item:", err);
      return res.status(500).json("Error adding item");
    }
    res.status(201).json("Item added successfully");
  });
});

// Add item to cart route
app.post("/cart", (req, res) => {
  const { productId, size } = req.body;
  const userId = req.body.userId || req.headers["user-id"]; // Make sure userId is passed from the frontend

  if (!userId) {
    return res
      .status(400)
      .json({ error: "User ID is required to add an item to the cart" });
  }

  // Add the product to the cart in the database
  db.query(
    "INSERT INTO cart (user_id, product_id, size) VALUES (?, ?, ?)",
    [userId, productId, size],
    (err, result) => {
      if (err) {
        console.error("Error adding to cart:", err);
        return res.status(500).json({ error: "Error adding item to cart" });
      }
      res.status(200).json({ message: "Item added to cart" });
    }
  );
});

// Get user's cart items
app.get("/cart/:userId", (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const sql = `
    SELECT ci.*, i.text, i.src, i.label, i.alt 
    FROM cart ci
    JOIN item i ON ci.product_id = i.id
    WHERE ci.user_id = ?
  `;
  db.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("Error fetching cart items:", err);
      return res.status(500).json({ error: "Error fetching cart items" });
    }
    res.status(200).json(rows);
  });
});

app.delete("/cart/:userId/:productId/:size", (req, res) => {
  const { userId, productId, size } = req.params;

  // Validate input
  if (!userId || !productId || !size) {
    return res
      .status(400)
      .json({ error: "User ID, Product ID, and Size are required" });
  }

  // Log the input to see if they're correct
  console.log(
    `Deleting item from cart: user_id=${userId}, product_id=${productId}, size=${size}`
  );

  const sql = `
    DELETE FROM cart 
    WHERE user_id = ? AND product_id = ? AND size = ?
  `;

  // Execute the query to remove the specific cart item
  db.query(sql, [userId, productId, size], (err, result) => {
    if (err) {
      console.error("Error removing item from cart:", err);
      return res.status(500).json({ error: "Error removing item from cart" });
    }

    // Log the result of the query
    console.log("Delete result:", result);

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    // Successfully removed item
    res.status(200).json({ message: "Item removed from cart" });
  });
});

// Set up server to listen on port 8081
app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
