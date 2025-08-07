const express = require("express");
const books = require("../books");
const { users, isValid } = require("../users");

const general = express.Router();

// Task 1: Get all books
general.get("/books", async (req, res) => {
  try {
    const booksList = await new Promise((resolve) => {
      setTimeout(() => resolve(books), 1000); 
    });
    res.status(200).json(booksList);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Task 2: Get book by ISBN
general.get("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ message: err }));
});

// Task 3: Get books by author
general.get("/books/author/:author", async (req, res) => {
  try {
    const data = await new Promise((resolve) => {
      const author = req.params.author.toLowerCase();
      const allBooks = Object.values(books);
      const filtered = allBooks.filter(book => book.author.toLowerCase() === author);
      setTimeout(() => resolve(filtered), 1000);
    });

    if (Array.isArray(data) && data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "Invalid author" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
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
  res.status(200).json({ message: "Login successful", token });
});

module.exports.general = general;