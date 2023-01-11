const orderId = getOrderId()
montrerOrderId(orderId)
deleteCache()


function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
}

function montrerOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}


function deleteCache(params) {
    const cache = window.localStorage
    cache.clear()
    
}



