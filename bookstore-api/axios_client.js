const axios = require('axios');

// Base URL (portunu kendi sunucuna göre ayarla)
const BASE_URL = 'http://localhost:5001';

// Task 10: Get all books using async/await
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    console.log("Tüm kitaplar:", response.data);
  } catch (err) {
    console.error("Hata (getAllBooks):", err.message);
  }
}

// Task 11: Get book by ISBN using Promises
function getBookByISBN(isbn) {
  axios.get(`${BASE_URL}/books/${isbn}`)
    .then(response => {
      console.log(`ISBN ${isbn} kitabı:`, response.data);
    })
    .catch(err => {
      console.error("Hata (getBookByISBN):", err.message);
    });
}

// Task 12: Get books by author
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/books/author/${author}`);
    console.log(`${author} tarafından yazılan kitaplar:`, response.data);
  } catch (err) {
    console.error("Hata (getBooksByAuthor):", err.message);
  }
}

// Task 13: Get books by title
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/books/title/${title}`);
    console.log(`Başlık: "${title}" için kitaplar:`, response.data);
  } catch (err) {
    console.error("Hata (getBooksByTitle):", err.message);
  }
}

// Fonksiyonları sırayla çalıştır
async function runTasks() {
  await getAllBooks();                  // Task 10
  getBookByISBN("1");                   // Task 11
  await getBooksByAuthor("Unknown");    // Task 12
  await getBooksByTitle("The Book Of Job"); // Task 13
}

runTasks();