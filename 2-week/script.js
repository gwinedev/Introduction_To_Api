fetch("https://api.spacexdata.com/v4/launches/latest")
  .then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  })
  .then((data) => console.log("Latest launch: ", data))
  .catch((err) => console.error("API error:", err));
