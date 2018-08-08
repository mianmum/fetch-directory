// Global variables
const container = document.querySelector(".container");
const modal = document.querySelector('.modal');
const modalBox = document.querySelector('.modalBox');
let galleryItems = "";
let userData = "";
let closeButton = "";
// Capitalize first letter
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);
// Generate grid items
const generateGrid = function(data) {
  userData = data.results;
  const userElements = userData.map((function(user) {
    container.innerHTML +=
      `<div class="galleryItem">
        <div class="imageDiv">
          <img src="${user.picture.medium}" alt="User Avatar">
        </div>
        <div class="info">
          <h2>${capitalize(user.name.first)} ${capitalize(user.name.last)}</h2>
          <p>${user.email}</p>
          <p>${capitalize(user.location.city)}</p>
        </div>
      </div>`
  }));
};
// Fill Modal
const modalFill = function(user) {
  galleryItems = Array.from(document.querySelectorAll('.galleryItem'));
  modalBox.innerHTML = "";
  modalBox.innerHTML +=
    user.innerHTML
  + `
    <hr>
    <p>${userData[galleryItems.indexOf(user)].phone}</p>
    <p>${userData[galleryItems.indexOf(user)].location.street}, ${userData[galleryItems.indexOf(user)].location.postcode}</p>
    <p>Birthday: ${userData[galleryItems.indexOf(user)].dob.date.slice(0, 10)}</p>
    <span class="close-button">&times;</span
    `
};
// Modal close
const closeModal = function() {
  closeButton = document.querySelector('.close-button');
  closeButton.addEventListener('click', () => modal.classList.toggle('show-modal'));
};
// Modal
const modalClick = () => {
  container.addEventListener('click', e => {
	let employee = e.target;
    if (!employee.classList.contains('container')) {
        if (!employee.classList.contains('galleryItem')) {
          employee = employee.closest('.galleryItem');
        };
        modal.classList.toggle('show-modal');
        modalFill(employee);
        closeModal();
    }
  });
};
// Fetch request
fetch("https://randomuser.me/api/?inc=name,email,location,picture,phone,dob&nat=ca&results=12")
  .then(response => response.json())
  .then(data => generateGrid(data))
  .catch(response => new Error(response.statusText));
modalClick();
