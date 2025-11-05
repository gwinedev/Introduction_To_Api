const express = require("express");
const app = express();

app.use(express.json());

const books = [
  { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: 2, title: "Harry Potter", author: "J.K. Rowlings" },
];

