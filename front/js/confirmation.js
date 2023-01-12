//*--------------------------------------------------------------
//* MAIN | Variables / Constantes / Appels de Fonctions
//*--------------------------------------------------------------
const orderId = getOrderId()
montrerOrderId(orderId)
deleteCache()
//*--------------------------------------------------------------
//* Récupération du Numéro de Commande
//*--------------------------------------------------------------

function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
}
//*--------------------------------------------------------------
//* Affichge du Numéro de Commande 
//*--------------------------------------------------------------
function montrerOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

//*--------------------------------------------------------------
//* Suppression du Panier 
//*--------------------------------------------------------------
function deleteCache(params) {
    const cache = window.localStorage
    cache.clear()
    
}



