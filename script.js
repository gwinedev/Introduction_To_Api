const button = document.getElementById("jokeButton");
const jokePara = document.getElementById("joke");

button.addEventListener("click", () => {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      jokePara.textContent = data.value;
    })
    .catch((error) => console.log("Error:", error));
});
