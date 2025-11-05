const express = require("express");
const app = express();
const API_KEY = "123456";

app.use(express.json());

let movies = [
  { id: 1, title: "Inception", year: 2010 },
  { id: 2, title: "Avatar", year: 2009 },
];

// middleware
function authenticate(req, res, next) {
  const key = req.headers["x-api-key"];
  if (key === API_KEY) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

app.get("/movies", authenticate, (req, res) => res.json(movies));

app.post("/movies", authenticate, (req, res) => {
  try {
    const movie = { id: movies.length + 1, ...req.body };

    if (!req.body.title) {
      return res.status(400).json({ error: "Title is required" });
    }
    movies.push(movie);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/movies/:id", authenticate, (req, res) => {
  movies = movies.filter((m) => m.id != req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
