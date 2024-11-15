require("dotenv").config(); // Load environment variables from a .env file

const express = require("express"); // Import the Express framework to handle HTTP requests
const mysql = require("mysql2"); // Import MySQL database client for Node.js
const cors = require("cors"); // Import CORS to allow cross-origin requests
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing and comparison

const app = express(); // Create an instance of the Express app

app.use(cors()); // Enable Cross-Origin Resource Sharing for all routes
app.use(express.json()); // Parse incoming JSON requests

// Create a MySQL connection pool to handle multiple database connections
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "StrongP@ssw0rd2024!",
  database: "login_sample_db", // Use the login_sample_db database
  port: 3306, // MySQL port
  waitForConnections: true, // Wait for available connections in the pool
  connectionLimit: 10, // Set a limit on the number of connections in the pool
  queueLimit: 0, // No limit on the number of queued connection requests
});

// Check if the database connection is successful
db.getConnection((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the MySQL database.");
  }
});

// Route to handle user signup
app.post("/signup", async (req, res) => {
  const { first_name, last_name, email, password, isAdmin } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const sql =
      "INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES (?, ?, ?, ?, ?)";
    const values = [
      first_name,
      last_name,
      email,
      hashedPassword,
      isAdmin ? 1 : 0, // Convert isAdmin boolean to 1 or 0 for MySQL
    ];

    // Execute the SQL query to insert the user data into the 'users' table
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

// Route to handle user login
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
    const passwordMatch = await bcrypt.compare(password, user.password); // Compare the entered password with the hashed password in the database

    if (!passwordMatch) {
      return res.status(401).json("Invalid Credentials");
    }

    // Return a successful login response with user details
    res.status(200).json({
      message: "Login Successful",
      userDetails: {
        userId: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        isAdmin: user.is_admin === 1, // Check if user is an admin
      },
    });
  });
});

// Route to handle user logout
app.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

// Route to change the user's password
app.post("/change-password", async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = 1; // Hardcoded user ID for demonstration

  const sql = "SELECT password FROM users WHERE user_id = ?";
  db.query(sql, [userId], async (err, data) => {
    if (err) {
      return res.status(500).json("Error fetching user data");
    }
    if (data.length === 0) {
      return res.status(404).json("User not found");
    }

    const user = data[0];
    const passwordMatch = await bcrypt.compare(currentPassword, user.password); // Compare current password

    if (!passwordMatch) {
      return res.status(401).json("Current password is incorrect");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
    const updateSql = "UPDATE users SET password = ? WHERE user_id = ?";
    db.query(updateSql, [hashedNewPassword, userId], (err, result) => {
      if (err) {
        return res.status(500).json("Error updating password");
      }
      res.status(200).json("Password updated successfully");
    });
  });
});

// Route to fetch all orders for the user
app.get("/orders", (req, res) => {
  const userId = 1; // Hardcoded user ID for demonstration

  const sql = "SELECT * FROM orders WHERE user_id = ?";
  db.query(sql, [userId], (err, data) => {
    if (err) {
      return res.status(500).json("Error fetching orders");
    }
    res.status(200).json(data);
  });
});

// Route to fetch all items from the 'item' table
app.get("/items", (req, res) => {
  const sql = "SELECT * FROM item ORDER BY id ASC"; // Fetch items in ascending order of their ID
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json("Error fetching items");
    }
    // Add mock size data to each item
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

// Route to update an item by its ID
app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { text, src, label, alt } = req.body;

  const sql =
    "UPDATE item SET text = ?, src = ?, label = ?, alt = ? WHERE id = ?";
  const values = [text, src, label, alt, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating item:", err);
      return res.status(500).json("Error updating item");
    }
    if (result.affectedRows === 0) {
      return res.status(404).json("Item not found");
    }
    res.status(200).json("Item updated successfully");
  });
});

// Route to delete an item by its ID
app.delete("/items/:id", (req, res) => {
  const itemId = req.params.id;

  if (isNaN(itemId)) {
    return res.status(400).json({ message: "Invalid item ID" });
  }

  const query = "DELETE FROM item WHERE id = ?";
  db.query(query, [itemId], (err, result) => {
    if (err) {
      console.error("Error deleting item:", err);
      return res
        .status(500)
        .json({ message: "Server error while deleting item" });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Item deleted successfully" });
    } else {
      return res.status(404).json({ message: "Item not found" });
    }
  });
});

// Route to fetch a single item by its ID
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

// Route to add a new item to the 'item' table
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

// Route to add an item to the user's cart
app.post("/cart", (req, res) => {
  const { productId, size } = req.body;
  const userId = 1; // Hardcoded user ID for demonstration

  const sql = "INSERT INTO cart (user_id, product_id, size) VALUES (?, ?, ?)";
  db.query(sql, [userId, productId, size], (err, result) => {
    if (err) {
      console.error("Error adding item to cart:", err);
      return res.status(500).json("Error adding item to cart");
    }
    res.status(201).json("Item added to cart");
  });
});

// Start the server on the specified port
app.listen(8081, () => {
  console.log("Server is running on http://localhost:8081");
});
