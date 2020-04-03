let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener("submit", () => {
        postToy(event.target);
      })
    } else {
      toyForm.style.display = "none";
    }
  })
});

fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((data) => {cardSetup(data)})

function postToy(toy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy.name.value,
      "image": toy.image.value,
      "likes": 0
    })
  })
  .then((response) => response.json())
  .then((thisToy) => { cardSetup(thisToy) })
}

function updateLikes(toy) {
  let likesDiv = document.getElementById(`${toy.id}`);
  let newLikes = parseInt(likesDiv.innerText) + 1;

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": newLikes
    })
  })
  .then((response) => response.json())
  .then((result) => {likesDiv.innerText = `${newLikes} Likes`})
}

function cardSetup(data) {
  for (let i = 0; i < data.length; i++) {
    let div = document.createElement("div");
    div.className = "card";

    let toyName = document.createElement("h2");
    toyName.innerText = data[i].name;
    div.appendChild(toyName);

    let img = document.createElement("img");
    img.src = data[i].image;
    img.className = "toy-avatar"
    div.appendChild(img);

    let likes = document.createElement("p");
    likes.innerText = `${data[i].likes} Likes`;
    likes.id = `${data[i].id}`;
    likes.className = "likes"
    div.appendChild(likes);

    let button = document.createElement("button");
    button.className = "like-btn"
    button.innerText = "Like <3"
    button.addEventListener("click", () => {
      updateLikes(data[i]);
    })
    div.appendChild(button);
    document.getElementById("toy-collection").appendChild(div);
  }
}
