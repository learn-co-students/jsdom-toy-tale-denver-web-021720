const baseURL = 'http://localhost:3000'
const toysURL = `${baseURL}/toys`

fetch(toysURL)
  .then(parseJSON)
  .then(toys => console.log(toys));

// toy = {
//   id: 1
//   image: "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png"
//   likes: 5
//   name: "Woody"
// }

// Provided code
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Utility functions
function parseJSON(response){
  return response.json();
}
