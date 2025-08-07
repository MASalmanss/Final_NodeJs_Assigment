const express = require("express");
const books = require("../books");
const { users, isValid } = require("../users");

const general = express.Router();

// Task 1: Get all books
general.get("/books", (req, res) => {
  res.status(200).json(books);
});

// Task 2: Get book by ISBN
general.get("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Task 3: Get books by author
general.get("/books/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const filtered = Object.values(books).filter(book => book.author.toLowerCase() === author);
  res.status(200).json(filtered);
});

// Task 4: Get books by title
general.get("/books/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const filtered = Object.values(books).filter(book => book.title.toLowerCase() === title);
  res.status(200).json(filtered);
});

// Task 5: Get book review
general.get("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    res.status(200).json(book.reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Task 6: Register new user
general.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  if (isValid(username)) {
    return res.status(409).json({ message: "User already exists" });
  }
  users.push({ username, password });
  res.status(201).json({ message: "User registered successfully" });
});

// Task 7: Login
const jwt = require("jsonwebtoken");

general.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ username }, "access", { expiresIn: "1h" });
  req.session = { authorization: { token, username } };
  res.status(200).json({ message: "Login successful", token });
});

module.exports.general = general;