
// Global variables
const container = document.querySelector('.container');
const dataArr = [];
// Request function
const fetchData = () => {
  fetch('https://randomuser.me/api/?inc=name,email,location,picture')
    .then(response => response.json())
    .then(data => dataArr.push(data.results["0"]));
}
// Run function x times
const runFetch = num => {
  for (let i = 0; i < num; i++) {
    fetchData();
  };
};
runFetch(12);
// Generate grid items
const generateGrid = () => {
dataArr.map(function(object) {
  console.log(object);
    let item = `
      <div class="galleryItem">
        <div class="imageDiv">
          <img src="${object.picture.medium}" alt="User Avatar">
        </div>
        <div class="info">
          <h2>${object.name}</h2>
          <p>${object.email}</p>
          <p>${object.location.city}</p>
        </div>
      </div>`;
      container.innerHTML += item;
  });
};
