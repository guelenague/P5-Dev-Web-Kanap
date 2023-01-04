const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
  let itemPrice = 0
  let imgUrl, altText, aName 
}


fetch(`http://localhost:3000/api/products/${id}`)
  .then((reponse) => reponse.json())
  .then((res) => displayProduct(res))

function displayProduct(kanap) {
  // {
  //   "colors": [
  //   "Blue",
  //   "White",
  //   "Black"
  //   ],
  //   "_id": "107fb5b75607497b96722bda5b504926",
  //   "name": "Kanap Sinopé",
  //   "price": 1849,
  //   "imageUrl": "http://localhost:3000/images/kanap01.jpeg",
  //   "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   "altTxt": "Photo d'un canapé bleu, deux places"
  //   }

// const altTxt = kanap.altTxt
// const colors = kanap.colors
// const description = kanap.description
// const name = kanap.name
// const price = kanap.price
// const imageUrl = kanap.imageUrl

// console.log({kanap})
const { altTxt, colors, description, imageUrl, name, price} = kanap
aName = name
itemPrice = price
imgUrl = imageUrl
altText = altTxt
makeImage(imageUrl, altTxt)
makeTitle(name)
makePrice(price)
makeDescription(description)
makeColors(colors)
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
  if (h1 !=null) h1.textContent = name
}
  
function makePrice(price) {
  const span = document.querySelector("#price")
  if (span !=null) span.textContent = price
}

function makeDescription(description) {
  const p = document.querySelector("#description")
  if (p !=null) p.textContent = description
}

function makeColors(colors) {
  const select = document.querySelector("#colors")
  if (select !=null) {
     colors.forEach((color) => {
      const option = document.createElement("option")
      option.value = color
      option.textContent = color
      select.appendChild(option)
     })
    }
  }

  const button = document.querySelector("#addToCart")   
  button.addEventListener("click", displayClick)  


function displayClick() {
  const color = document.querySelector("#colors").value
  const quantity = document.querySelector("#quantity").value
  if (validatorCart(color, quantity)) return
  restoreCarte(color, quantity)   
  redirect()
}
  
  function restoreCarte(color, quantity) {
    const key = `${item.id}-${item.color}`
    const data = {
      id: id,
      name: aName,
      color: color,
      quantity: Number(quantity),
      price: itemPrice,
      imageUrl: imgUrl,
      altTxt: altText
    } 
  
    localStorage.setItem(key, JSON.stringify(data))
    
  }

  function validatorCart(color, quantity) {
    if (color == null || color === "" || quantity == null || quantity == 0) {
      alert("SVP, choisissez une couleur et le quantité")    
      return true
    } 
  }
 

  function redirect() {
    window.location.href = "cart.html"
  }