const express = require("express");
const jwt = require("jsonwebtoken");
const books = require("../books");

const authenticated = express.Router();

// Middleware: Kimlik doğrulama
authenticated.use((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(403).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, "access");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

// Task 8: Add/Modify a book review
authenticated.put("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const { review } = req.body;
  const username = req.user.username;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!review) {
    return res.status(400).json({ message: "Review is required" });
  }

  books[isbn].reviews[username] = review;

  res.status(200).json({ message: "Review added/updated successfully" });
});

// Task 9: Delete user's book review
authenticated.delete("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!books[isbn].reviews[username]) {
    return res.status(404).json({ message: "Review not found for this user" });
  }

  delete books[isbn].reviews[username];

  res.status(200).json({ message: "Review deleted successfully" });
});

module.exports.authenticated = authenticated;