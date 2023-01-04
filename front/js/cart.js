const cart = []
recuperItems()
cart.forEach((item) => montrerItem(item))
// "_id": "107fb5b75607497b96722bda5b504926",
// "name": "Kanap Sinopé",
// "price": 1849,
// "imageUrl": "http://localhost:3000/images/kanap01.jpeg",
// "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
// "altTxt": "Photo d'un canapé bleu, deux places"

function recuperItems() {
    const numberKanap = localStorage.length
    for (let i = 0; i < numberKanap; i++){
    const item = localStorage.getItem(localStorage.key(i))||""
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
}
}

function montrerItem(item) {
    const article = makeArticle(item)    
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)
    const cardItemContent = makeCartContent(item)
    article.appendChild(cardItemContent)
    montrerArticle(article) 
    monterTotalQuantity() 
    montrerTotalPrice()  
}

function monterTotalQuantity() {
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
    const p = document.createElement("p")
    p.textContent = "Suppp"
    div.addEventListener("click", () => deleteItem(item))
    div.appendChild(p)
    settings.appendChild(div)
}

function deleteItem(item) {
    const itemToDelete = cart.findIndex(
        (product) => product.id ===item.id && product.color === item.color
    )
    cart.splice(itemToDelete, 1)
    monterTotalQuantity() 
    montrerTotalPrice()  
    deleteData(item)
    deleteArticle(item)
    
}

function deleteArticle(item) {

    const articleToDelete = document.querySelector(
        `article[data-id-"${item.id}"][data-color-"${item.color}"]`
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
    input.name = "itemQuantity"
    input.type = "number"
    input.classList.add("itemQuantity")
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updatePQ(item.id, input.value, item))

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

function updatePQ(id, newValue, item) {
    const itemToUpdate = cart.find((item) => item.id ===id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    monterTotalQuantity() 
    montrerTotalPrice()  
    deleteData(item)
}

function deleteData(item) {
    const key = `${item.id}-${item.color}`
  localStorage.removeItem (key)
    
}

function saveData(item) {
  const dataToSave = JSON.stringify(item)
  const key = `${item.id}-${item.color}`
  localStorage.setItem (key, dataToSave)
}

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



