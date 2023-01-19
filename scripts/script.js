const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzBmNmU3MzczODAwMTUzNzQzNzMiLCJpYXQiOjE2NzQxMjk2NTQsImV4cCI6MTY3NTMzOTI1NH0.uvMVnP_iIKi1Whyr9El3BIGBSqO_016vYWPscfX92u8"
const url = "https://striveschool-api.herokuapp.com/api/product/"

const getAllProducts = async () => {
    try {
        const products = await (await fetch(url, {
            headers: new Headers({
                "Content-type": "application/json",
                "Authorization": "Bearer " + apiKey,
            })}))
            .json()
        renderAllProducts(products)
    } catch (error) {
        handleError(error)
    }
}

const renderAllProducts = (products) => {
    const ul = document.querySelector("ul.list-group")
    ul.innerHTML = "";
    if (products.length > 0) {
        products.forEach(renderProduct) 
    } else {
        const stuff = '<li class="list-group-item">Shop is empty</li>'
        ul.innerHTML += stuff
    }
}
const renderProduct = (product) => {
    const ul = document.querySelector("ul.list-group")
    const {_id, name, description, brand, price, imageUrl} = product
    ul.innerHTML += `<li class="list-group-item w-50 mb-4 p-0 shadow-sm">
                        <div class="card">
                            <div class="row no-gutters">
                                <div class="col-4">
                                    <img class="card-img-top img-fluid h-100" src="${imageUrl}">
                                </div>
                                <div class="col-8">
                                    <div class="card-body h-100 d-flex flex-column">
                                        <h5 class="card-title">${name}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">${brand}</h6>
                                        <p class="card-text mb-auto">
                                            ${description}
                                        </p>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <a href="./details.html?id=${_id}" class="btn btn-sm btn-outline-secondary">Details</a>
                                            <small class="text-muted">Price: ${price}€</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>`
}

const handleError = (errorText) => {
    const alert = document.querySelector(".alert span.alert-text")
    console.log(alert)
    alert.innerText = errorText
    alert.parentElement.classList.replace("d-none", "d-block")
}

window.onload = async () => {
    await getAllProducts()
}