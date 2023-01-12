const cart = []
recuperItems()

cart.forEach((item) => montrerItem(item))
const form = document.querySelector(".cart__order__form")
form.addEventListener('submit', submitForm)
// "_id": "107fb5b75607497b96722bda5b504926",
// "name": "Kanap Sinopé",
// "price": 1849,
// "imageUrl": "http://localhost:3000/images/kanap01.jpeg",
// "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
// "altTxt": "Photo d'un canapé bleu, deux places"

 //création d'une loop pour récupérer les données stockées dans le localStorage
//*---------------------------------------------------------------------
//* Récupération/Ajout des données non-stockées dans le Local Storage
//*---------------------------------------------------------------------


function recuperItems() {
    const numberKanap = localStorage.length
    for (let i = 0; i < numberKanap; i++){
    const item = localStorage.getItem(localStorage.key(i))||""
     /*avec JSON parse au lieu d'avoir la liste de produit dans des string, 
    cela va permetre d'avoir un vrai objet json*/
    const itemObject = JSON.parse(item)
    console.log(itemObject)

     // recuperer le prix depuis le serveur et l' ajouter a itemObject
     /*item.price * item.quantity.toString().replace(/00/, "")*/
    //  getItem(price)

    window.addEventListener('storage', (event) => console.log(event));
     // cette fonction  récolte chaque objet contenu dans itemObject
     cart.push(itemObject)
   
    // const nomEntreprise = window.localStorage.getItem("nom");
    // setItem(key, value) – записать пару ключ/значение

    // getItem(key) – получает значение по ключу (key);
    // setItem(key, value) – добавляет ключ (key) со значением value (если в хранилище уже есть этот ключ, то в этом случае будет просто обновлено его значение);
    // removeItem(key) – удаляет ключ (key);
    // clear() – очищает всё хранилище;
    // key(index) – получает ключ по индексу (в основном используется в операциях перебора);
    // length – количество ключей в хранилище;

    // getItem(key) – получить данные по ключу key

    // removeItem(key) – удалить значение по ключу key
    // localStorage.removeItem("price");
   
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
    item.price * item.quantity.toString().replace(/00/, "")
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
    p.textContent = "Suppp"
    div.appendChild(p)
    settings.appendChild(div)
    // div.addEventListener("click", (e) => {
    //     const btn = e.target;
    //     const article = btn.closest('.cart__item')
    //     article.remove()
    //     deleteItem(item)

    }

function deleteItem(item) {
    const itemToDelete = cart.findIndex(
        (product) => product.id === item.id && product.color === item.color
    )
    cart.splice(itemToDelete, 1)
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
    // const inputQuantity = document.createElement("input");
    // inputQuantity.type = "number";
    // inputQuantity.classList.add("itemQuantity");
    // inputQuantity.name = "itempQuantity";
    // inputQuantity.min = "1";
    // inputQuantity.max = "100";
    // inputQuantity.value = item.quantity;
    // inputQuantity.addEventListener("change", () =>
    //   updatePQ(produit.addId, inputQuantity.value)
    // );
    

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
    e.preventDefault()
    if (cart.length === 0) {
        alert("Ahtung")
        return
    }
    if (validateForm()) return
    if (validateEmail()) return
   
//*------------------------------------------------------------------------
//* FETCH | Récupération et Transmission des données de l'API
//*------------------------------------------------------------------------ 
    const body = makeBody()
    fetch('http://localhost:3000/api/products/order', {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
        "Content-type": 'application/json'
        // "Accept": 'application/json'
    // "Access-Control-Allow-Origin": "*"
}
    })

    .then((res) => {
        return res.json();
      })

    .then((data) => {
        console.log(data)
        localStorage.clear()
      const orderId = data.orderId
    //   localStorage.setItem("orderId", data.orderId)
      document.location.href = "confirmation.html"  + "?orderId=" + orderId;
    //   window.location.href = "confirmation.html" + "?orderId=" + orderId
      
    })
    .catch((err) => console.error(err))

//   console.log(data)
}

// requetePostVersLapi.then(async(res)=>
// {
          
//             let numeroDeCommande = await res.json()
//         // If the request is accepted and the form send then redirect to confirmation.html
//             if(res.status == 201)
//             {
//                   window.location.href=`confirmation.html?orderId=${numeroDeCommande.orderId}`
//             // window.location.href=`confirmation.html?orderId=${numeroDeCommande.orderId}`=*
//       }
// // Quand le formulaire est envoyé...
// myForm.addEventListener('submit',(e)=>
// {

 
//       const firstNameInput = document.getElementById('firstName')
//       const lastNameInput = document.getElementById('lastName')
//       const addressInput = document.getElementById('address')
 
//       const cityInput = document.getElementById('city')
//       const emailInput = document.getElementById('email')
      
      
   
//       let RegexName =  new RegExp(/^[a-zA-z-\s]+$/)
//       let RegexCity =  new RegExp(/^[a-zA-z-\s]+$/)
//       let RegexAdress = new RegExp(/^[a-zA-z-\s]+$/)
//       let RegexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

      
        
              

//       const checkFirstName = function ()
//       {
//           const firstNameErrorMsg = document.getElementById('firstNameErrorMsg')

//             if(RegexName.test(firstNameInput.value) === false)
//             {
//                   firstNameErrorMsg.innerHTML = "Veuillez uniquement saisir des lettres"
//                    e.preventDefault()
//             }

//             else if (RegexName.test(firstNameInput.value) === true){
//                   firstNameErrorMsg.innerHTML = " ";
//             }
//       }
  


//       const checkLastName = function()
//       {
//             const lastNameErrorMsg = document.getElementById('lastNameErrorMsg')

//            if(RegexName.test(lastNameInput.value) === false)
//            {
//             lastNameErrorMsg.innerHTML = "Veuillez uniquement saisir des lettres"
//             e.preventDefault()

//            }

//            else if (RegexName.test(lastNameInput.value) === true){
//                  lastNameErrorMsg.innerHTML = " ";
//            }

//       }
      


//       const checkAddress = function ()
//       {
//             const addressErrorMsg = document.getElementById('addressErrorMsg')

//             if(RegexAdress.test(addressInput.value) === false)
//             {
//                   addressErrorMsg.innerHTML = "L'adresse saisi est incorrecte"
//                   e.preventDefault()
//             }

//             else if(RegexAdress.test(addressInput.value) === true){
//                   addressErrorMsg.innerHTML = "";
//             }
            
          
//       }



//       const checkCity = function () 
//       {
//             const cityErrorMsg= document.getElementById('cityErrorMsg')

//             if(RegexCity.test(cityInput.value) === false)
//             {
//                   cityErrorMsg.innerHTML = "Veuillez saisir un nom de ville correcte"
//                   e.preventDefault()
//             }

//             else if(RegexCity.test(cityInput.value) === true){
//                   cityErrorMsg.innerHTML = "";
//             }
     
          
//       }

     

//       const checkEmail = function () 
//       {
//             const emailErrorMsg= document.getElementById('emailErrorMsg')

//             if(RegexEmail.test(emailInput.value) === false)
//             {
//                   emailErrorMsg.innerHTML = "Veuillez saisir une adresse mail correcte"
//                   e.preventDefault()
//             }

//             else if(RegexCity.test(emailInput.value) === true){
//                   emailErrorMsg.innerHTML = "";
//             }
    
//       }

     


//       checkFirstName()
//       checkLastName()
//       checkAddress()
//       checkCity()  
//       checkEmail()  
   
     
// }) 

           

// /**END OF FORMULAIRE */

// })



function validateEmail() {
    const email = document.querySelector("#email").value
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/   
        if (regex.test(email) === false) {
            alert("Email")
            return true
        }
        return false
    
}

function validateForm() {
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")
    const reg = new RegExp(/^[a-zA-z-\s]+$/);
    let RegexName =  new RegExp(/^[a-zA-z-\s]+$/)
    
    //       let RegexCity =  new RegExp(/^[a-zA-z-\s]+$/)
    //       let RegexAdress = new RegExp(/^[a-zA-z-\s]+$/)
    //       let RegexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

 

    inputs.forEach((input) => {
        if (input.id !== "email") {
            const div = input.parentElement;
            const errorContainer = div.querySelector("p")
            console.log(errorContainer)
            if (!reg.test(input.value)) {
                if (errorContainer) {
                    errorContainer.innerHTML = "Remplissez tout";
                }
                return true
            }
            errorContainer.innerHTML = "";
            return false
        }
        
    })
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
    
    //  products: ["107fb5b75607497b96722bda5b504926"]
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


// function redirect() {
//     window.location.href = "confirmation.html"
//   }
