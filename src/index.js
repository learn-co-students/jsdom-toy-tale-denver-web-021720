let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => displayToys(toys))

  function displayToys(toys){
    toys.forEach(createToyCard)
  }

  function createToyCard(toy){
    const toyContainer = document.querySelector('#toy-collection')
    const toyCard = document.createElement('div')
    const name = document.createElement('h2')
    const image = document.createElement('img')
    const likes = document.createElement('p')
    const likeButton = document.createElement('button')

    toyCard.className = 'card'
    name.innerText = toy.name
    image.src = toy.image
    image.className = 'toy-avatar'
    likes.innerText = `${toy.likes} Likes`
    likeButton.className = 'like-btn'
    likeButton.innerText = 'Like <3'
    likeButton.addEventListener('click', event => {
      renderLike(toy,likes)
      updateLikes(toy,toy.likes)
    })

    toyCard.append(name,image,likes,likeButton)
    toyContainer.appendChild(toyCard)
  }

  function renderLike(toy,likes){
    toy.likes += 1
    likes.innerText = `${toy.likes} Likes`
  }

  function updateLikes(toy,likes){
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({likes})
    })
  }

  const addToyForm = document.querySelector('.add-toy-form')
  addToyForm.addEventListener('submit', toyFormEventHandler)

  function toyFormEventHandler(){
    event.preventDefault()
    const toyFormData = new FormData(addToyForm)
    const name = toyFormData.get('name')
    const image = toyFormData.get('image')
    const newToy = {
      name: name,
      image: image,
      likes: 0
    }
    createToyCard(newToy)
    postNewToy(newToy)
  }

  function postNewToy(newToy){
    fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newToy)
    })
  }
});
