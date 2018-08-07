// Global variables
const container = document.querySelector(".container");
// Generate grid items
const generateGrid = function(data) {
  let userData = data.results;
  const userElements = userData.map((function(user) {
    container.innerHTML +=
      `<div class="galleryItem">
        <div class="imageDiv">
          <img src="${user.picture.medium}" alt="User Avatar">
        </div>
        <div class="info">
          <h2>${user.name.first} ${user.name.last}</h2>
          <p>${user.email}</p>
          <p>${user.location.city}</p>
        </div>
      </div>`
  }));
};
// Fetch request
fetch("https://randomuser.me/api/?inc=name,email,location,picture&results=12")
  .then(response => response.json())
  .then(data => generateGrid(data))
  .catch(response => new Error(response.statusText));
