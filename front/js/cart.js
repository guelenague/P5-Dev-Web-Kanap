let cart = []
recuperItems()

cart.forEach((item) => montrerItem(item))
const form = document.querySelector(".cart__order__form")
form.addEventListener('submit', submitForm)

 
//*---------------------------------------------------------------------
//* création d'une loop pour récupérer des données non-stockées dans le Local Storage
//*---------------------------------------------------------------------


function recuperItems() {
    const numberKanap = localStorage.length
    for (let i = 0; i < numberKanap; i++){
    const item = localStorage.getItem(localStorage.key(i))||""
     /*avec JSON parse au lieu d'avoir la liste de produit dans des string, 
    cela va permetre d'avoir un vrai objet json*/
    const itemObject = JSON.parse(item)
    
     // recuperer le prix depuis le serveur et l' ajouter a itemObject
     
     // cette fonction  récolte chaque objet contenu dans itemObject
     cart.push(itemObject)
}
}
//*--------------------------------------------------------------
//* Affichage du Panier
//* --------------------------------------------------------------

function montrerItem(item) {
    const article = makeArticle(item)    
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)
    const cardItemContent = makeCartContent(item)
    article.appendChild(cardItemContent)

    // Appel des fonctions pour écoute : 
    // Modification de la quantité
  // Suppression d'un produit
// Calcul total produits/prix panier
    montrerArticle(article) 
    montrerTotalQuantity() 
    montrerTotalPrice()  
}
//Création d'une variabe pour afficher le nombre d'article dans le panier
function montrerTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity") 
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}

function montrerTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    
    totalPrice.textContent = total
    }

function makeCartContent(item) {
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")  
    
    const description = makeDescription(item)
    const settings = makeSettings(item)

    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
}

function makeSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))
    
    
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
    div.addEventListener("click", (e) => {
        const btn = e.target;
         // Renvoie кнопку к .cart__item
   
        const article = btn.closest('.cart__item')
        article.remove()
        deleteItem(item)

    })
}

function deleteItem(item) {
    // const itemToDelete = cart.findIndex(
    //     (product) => product.id === item.id && product.color === item.color
    // )
    cart = cart.filter((product) => !(product.id === item.id && product.color === item.color))
    
    
    // cart.splice(itemToDelete, 1)
    montrerTotalQuantity() 
    montrerTotalPrice()  

    deleteData(item)
    deleteArticle(item)
    
}

function deleteArticle(item) {

    const articleToDelete = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
      )
      articleToDelete.remove()
    
}

function addQuantityToSettings(settings, item) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent ="Qté"
    quantity.appendChild(p)
   
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    
    input.addEventListener("change", () => updatePQ(item.id, input.value, item))

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

function updatePQ(id, newValue, item) {
    const itemToUpdate = cart.find((item) => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    montrerTotalQuantity() 
    montrerTotalPrice()  

    saveData(item)
}

function deleteData(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
    
}

function saveData(item) {
  const dataToSave = JSON.stringify(item)
  const key = `${item.id}-${item.color}`
  localStorage.setItem(key, dataToSave)
}
/*Fonction qui permet de donner des enfants au parent #items afin
de le rendre visible dans le code html dans le DOM*/
function makeDescription(item){
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
 
    const h2 = document.createElement("h2")     
     h2.textContent = item.name 
     const p = document.createElement("p")
     p.textContent = item.color 
     const p2 = document.createElement("p")
     p2.textContent = item.price + " $" 
     
     description.appendChild(h2)
     description.appendChild(p)
     description.appendChild(p2)
    //  div.appendChild(description) 
     return description

}

function montrerArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    // article.dataset.id = item.id
    article.dataset.id = item.id
    // article.dataset.color = item.color
    article.dataset.color = item.color
    return article
}

function makeImageDiv(item) {
    const div = document.createElement("div")   
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

function submitForm(e) {
    //*------------------------------------------------------------------------
//* e это чтоб он не обновлял стр
//*------------------------------------------------------------------------ 
    e.preventDefault()
    if (cart.length === 0) {
        alert("Veuillez choisir kanap")
        return
    }
    
    if (validateEmail()) return
    if (validateForm()) return
   
//*------------------------------------------------------------------------
//* FETCHou Récupération et Transmission des données de l'API
//*------------------------------------------------------------------------ 
    const body = makeBody()
    //*------------------------------------------------------------------------
//* посылание запроса.  является запросом ресурсов или данных API, requet post a toujours body
//*------------------------------------------------------------------------
    fetch('http://localhost:3000/api/products/order', {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
        "Content-type": 'application/json'
        // "Accept": 'application/json'
    // "Access-Control-Allow-Origin": "*"
}
    })

     .then((res) => res.json())

    .then((data) => {
        // console.log(data)
        // localStorage.clear()
      const orderId = data.orderId
    //   localStorage.setItem("orderId", data.orderId)
    //   document.location.href = "confirmation.html"  + "?orderId=" + orderId;
      window.location.href = "confirmation.html" + "?orderId=" + orderId
      
    })
    .catch((err) => console.error(err))
}

function validateEmail() {
    const email = document.querySelector("#email").value
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/  
        if (regex.test(email) === false) {
            alert("Veuillez saisir une adresse mail correcte")
            return true
        }
        
    return false
}

function validateForm() {
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")
    const reg = new RegExp(/^[0-9a-zA-Z-\s]+$/) 
    
    let RegexName =  new RegExp(/^[a-zA-z-\s]+$/)
    let RegexCity =  new RegExp(/^[a-zA-z-\s]+$/)
    let RegexAdress = new RegExp(/^[0-9a-zA-Z-\s]+$/)
    let RegexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    let invalide = false

    inputs.forEach((input) => {
        if (input.id !== "email" && input.id !== "order") {
            const div = input.parentElement;
            const errorContainer = div.querySelector("p")
            console.log(errorContainer)
            if (!reg.test(input.value)) {
                console.log(input.value)
                invalide = true
                if (errorContainer) {
                    errorContainer.innerHTML = "Please remplissez tout";
                   
                }    
                
                return true  
            }

            errorContainer.innerHTML = "ok";
            return  false
        }
       
    })
    return invalide
}

//*--------------------------------------------------------------
//* Construction du Formulaire de commande
//*--------------------------------------------------------------

function makeBody() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
      // Object respectant les attentes de l'API
    const body = {
        contact : {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
     },

     products: getIds()
    
      }
      return body
}

function getIds() {
    const numberProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberProducts; i++) {
        const key = localStorage.key(i)
        
        const id = key.split("-")[0]
        ids.push(id)
    }
    return ids
    
}