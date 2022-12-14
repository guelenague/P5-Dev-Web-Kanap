const queryString = window.location.search
const urlParams = new URLSearchParams (queryString)
const Id = urlParams.get("id")


fetch(`http://localhost:3000/api/products/${Id}`)
  .then((res) => res.json())
  .then((res) => displayProduct(res))

function displayProduct(kanap) {
 

// const altTxt = kanap.altTxt
// const colors = kanap.colors
// const description = kanap.description
// const name = kanap.name
// const price = kanap.price
// const imageUrl = kanap.imageUrl

console.log(imageUrl)

makeImage(imageUrl, altTxt)
makeTitle(name)
makePrice(price)
makeDescription(description)
makeColors(colors)

const { altTxt, colors, description, imageUrl, name, price } = kanap
}


function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img")
  image.src = imageUrl
  image.alt = altTxt
  const parent = document.querySelector(".item__img")
  if (parent != null) parent.appendChild(image)

}

function makeTitle(name) {
  const h1 = document.querySelector("#title")
  if (h1 !=null) h1.textContent =name

}
  
function makePrice(price) {
  
}

function makeDescription(description) {
  const p = document.querySelector("#description")

  
}

function makeColors(colors) {
  
}