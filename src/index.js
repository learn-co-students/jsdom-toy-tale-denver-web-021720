const baseURL = 'http://localhost:3000'
const toysURL = `${baseURL}/toys`

const toyCollection = document.querySelector('#toy-collection')

fetch(toysURL)
  .then(parseJSON)
  .then(toys => {
    console.log('toys:', toys)
    toys.forEach(toy => {
      const toyCard = document.createElement('div')
      toyCard.classList.add('card')

      const toyName = document.createElement('h2')
      toyName.textContent = toy.name
      
      const toyImage = document.createElement('img')
      toyImage.classList.add('toy-avatar')
      toyImage.src = toy.image
      
      const toyLikes = document.createElement('p')
      toyLikes.textContent = `${toy.likes} Likes`

      const likeButton = document.createElement('button')
      likeButton.classList.add('like-btn')
      likeButton.textContent = 'Like <3'

      toyCollection.append(toyCard)
      toyCard.append(toyName, toyImage, toyLikes, likeButton)
    })
  })

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
