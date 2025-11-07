const express = require("express");
const app = express();

app.use(express.json());

// Burger ingredients data
let ingredients = ["buns", "cheese", "lettuce", "tomato", "patty"];

// Route 1: Get al ingredients
app.get("/ingredients", (req, res) => {
  res.json({ ingredients });
});

app.listen(3000, () => console.log("🍔 Burger API running on port 3000"));

// A route for an error