const queryString = window.location.search
const urlParams = new URLSearchParams (queryString)
const Id = urlParams.get("id")


fetch("http://localhost:3000/api/products/$(id)")
  .then((res) => res.json())
  .then((res) => console.log(res) )

