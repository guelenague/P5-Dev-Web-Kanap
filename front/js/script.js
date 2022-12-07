fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    const imageURL = data[0].imageURL
    console.log("url de l'image", imageURL)


  const meuble = document.createElement("a")
  meuble.href = imageURL
  meuble.text = "Kanap Sinopé"  
  const items = document.querySelector("#items") 
  if (items !=null) {
  items.appendChild(meuble)
  console.log("add lien")
}

}) 
