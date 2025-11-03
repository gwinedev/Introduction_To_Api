const axios = require("axios");

async function getUser() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
  console.log(res.data.name, res.data.email);
}

getUser();
