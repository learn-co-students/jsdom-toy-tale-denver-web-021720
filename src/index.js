const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyCollection = document.querySelector("#toy-collection");

// render toys from db to page
fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(toys => renderToys(toys))

function renderToys(toys) {
  toys.forEach(toy => renderSingleToy(toy))
}
 
function renderSingleToy(toy) {

    const toyDiv = document.createElement('div')
    toyDiv.className = "card"
    toyCollection.appendChild(toyDiv)

    const nametag = document.createElement('h2')
    nametag.innerText = toy.name
    toyDiv.appendChild(nametag)

    const toyImage = document.createElement('img')
    toyImage.src = `${toy.image}`
    toyImage.className = "toy-avatar"
    toyDiv.appendChild(toyImage)

    const toyLikes = document.createElement('p')
    toyLikes.innerText = `${toy.likes} likes `
    toyDiv.appendChild(toyLikes)

    const likeButton = document.createElement('button')
    likeButton.className = "like-btn"
    likeButton.innerText = "Like <3"
    likeButton.id = toy.id
    toyDiv.appendChild(likeButton)
    toyDiv.addEventListener('click', e => increaseLikesOnPage(e)) 
};

// render increase in likes 
function increaseLikesOnPage(e) {
  const oldLikes = parseInt(e.target.previousSibling.innerText)
  const newLikes = oldLikes + 1
  e.target.previousSibling.innerText = `${newLikes} likes`
  updateToyLikes(e);
}

// save updated likes to db
function updateToyLikes(e) {
  const toyId = e.target.id

  const formData = {
    likes: parseInt(e.target.previousSibling.innerText)
  };

  const configObject = {
    method: "PATCH", 
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch(`http://localhost:3000/toys/${toyId}`, configObject)
}

// add new toy to page
const addToyForm = document.querySelector('#add-toy-form');

addToyForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(addToyForm)
  const name = formData.get("name")
  const image = formData.get("image")

  const data = {
    name: name, 
    image: image,
    likes: 0
  }

  const configObject = {
    method: "POST", 
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify(data)
  }

  fetch('http://localhost:3000/toys', configObject)
    .then(response => response.json())
    .then(toy => renderSingleToy(toy))
})

// form hide & seek
let addToy = false;

addBtn.addEventListener("click", () => {
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

