fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => addProducts(data) )
   

  function addProducts(donne) {
    const id = donne[0]._id
    const imageUrl = donne[0].imageUrl
    const altTxt = donne[0].altTxt
    const name = donne[0].name
    const description = donne[0].description


    const image = makeImage(imageUrl, altTxt)
    const link = makeLink(id)
    const article = makeArticle()
    const h3 = makeH3(name)
    const p = makeParagraf(description)

    article.append(image)
    article.append(h3)
    article.append(p)   
    append(link, article)

  }

  function makeLink(id) {
    const link = document.createElement("a")
    link.href = "./product.html?id=" + id
    return link
  }

  function append(link, article) {
    const items = document.querySelector("#items") 
    if (items !=null) {
    items.append(link)
    link.append(article)
    
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

function makeArticle() {
  const article = document.createElement("article")
  
  return article
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


  

