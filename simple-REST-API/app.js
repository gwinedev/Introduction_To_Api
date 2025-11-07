const express = require("express");
const app = express();
const API_KEY = "godwin";

app.use(express.json());

const books = [
  { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: 2, title: "Harry Potter", author: "J.K. Rowlings" },
];

// Custom error
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Authenticate
function authenticate(req, res, next) {
  const key = req.headers["x-api-key"];
  if (key === API_KEY) {
    next();
  } else {
    res.status(401).json({ error: "unauthorized" });
  }
}

app.get("/books", authenticate, (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res, next) => {
  try {
    const bookId = parseInt(req.params.id);
    const book = books.find((b) => b.id === bookId);

    if (!book) {
      throw new AppError("Book not found", 404);
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
});

app.post("/books", (req, res, next) => {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      throw new AppError("Title and Author are required", 400);
    }
    const newBook = {
      id: books.length + 1,
      title,
      author,
    };

    books.push(newBook);
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
});

// Delete a book
app.delete("/books/:id", (req, res, next) => {
  try {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex((b) => b.id === bookId);

    if (index < 0) {
      throw new AppError("Book not found", 404);
    }
    books.splice(index, 1);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    next(err);
  }
});

// Error handlers
app.use((err, req, res, next) => {
  console.error("Error handler triggered: ", err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message: err.message || "Something went wrong",
  });
});

app.listen(3000, () => console.log("Book library API running on port 3000"));
