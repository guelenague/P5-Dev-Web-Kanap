//*------------------------------------------------------------------------
//* FETCH | Récupération et Transmission des données de l'API
//*------------------------------------------------------------------------ 

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => addProducts(data) )
   

  function addProducts(data) {
//     const _id = date[0]._id
//     const imageUrl = date[0].imageUrl
//     const altTxt = date[0].altTxt
//     const name = date[0].name
//     const description = date[0].description


// for (let i = 0; i < data.length; i++) {

//   console.log("canap", i, data[i])
// }

data.forEach((kanap) => {
  
    const { _id, imageUrl, altTxt, name, description } = kanap

    
    const link = makeLink(_id)
    const article = document.createElement("article")
    const image = makeImage(imageUrl, altTxt)   
    const h3 = makeH3(name)
    const p = makeParagraf(description)

    appendTout(article, [image, h3, p])  
    appendArticle(link, article)

  })
}

  function appendTout(article, array) {
   array.forEach((item) => {
    article.appendChild(item)
   }
   
   )
    // article.appendChild(image)
    // article.appendChild(h3)
    // article.appendChild(p)   
  }

  function makeLink(id) {
    const link = document.createElement("a")
    link.href = "./product.html?id=" + id
    return link
  }

  function appendArticle(link, article) {
    const items = document.querySelector("#items") 
    if (items !=null) {
    items.appendChild(link)
    link.appendChild(article)    
    }

  }
 
  function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img")
  image.src = imageUrl;
  image.alt = altTxt
  image.removeAttribute("title")
  image.removeAttribute("style")
  return image  
}


  function makeH3(name) {
  const h3 = document.createElement("h3")
  h3.textContent = name
  h3.classList.add("productName") 
  return h3
}


function makeParagraf(description) {
  const p = document.createElement("p")
  p.textContent = description
  p.classList.add("productDescription")
  return p
}


  

