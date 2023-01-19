const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzBmNmU3MzczODAwMTUzNzQzNzMiLCJpYXQiOjE2NzQxMjk2NTQsImV4cCI6MTY3NTMzOTI1NH0.uvMVnP_iIKi1Whyr9El3BIGBSqO_016vYWPscfX92u8"
const id = new URLSearchParams(location.search).get("id")
const url = id ? "https://striveschool-api.herokuapp.com/api/product/" + id : "https://striveschool-api.herokuapp.com/api/product/";
const method = id ? "PUT" : "POST"
let ev 
const handleBackOffice = async () => {
    try {
        const productToSend = {
            name: document.querySelector("#productName").value,
            description: document.querySelector("#productDescription").value,
            brand: document.querySelector("#productBrand").value,
            price: parseInt(document.querySelector("#productPrice").value),
            imageUrl: document.querySelector("#productImage").value,
        }
        const options = {
            headers: new Headers({
                "Content-type": "application/json",
                "Authorization": "Bearer " + apiKey,
            }),
            method: method,
            body: JSON.stringify(productToSend)
        }
        const isValid = productToSend.name && productToSend.description && productToSend.brand && productToSend.price && productToSend.imageUrl
        if (isValid) {
            const res = await fetch(url, options)
            if (res.ok) {
                if (!id) {
                    location.reload()
                }
            } else {
                throw res.status + " " + res.statusText
            }
        }
    } catch (error) {
        handleError(error)
    }
}

const deleteProduct = async (id) => {
    try {
        const res = await fetch(url,  {
            headers: new Headers({
                "Content-type": "application/json",
                "Authorization": "Bearer " + apiKey,
            }),
            method: "DELETE"})
        if (!res.ok) {
            throw res.status + " " + res.statusText
        }
    } catch (error) {
        handleError(error)
    }
}

const handleError = (errorText) => {
    const alert = document.querySelector(".alert span.alert-text")
    console.log(alert)
    alert.innerText = errorText
    alert.parentElement.classList.replace("d-none", "d-block")
}

window.onload = async() => {
    try {
        if (id) {
            document.querySelector(".btn-success").remove();
            document.querySelector(".btn-danger").addEventListener("click", () => {
                deleteProduct(id)
            })
            const res = await fetch(url, {
                headers: new Headers({
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + apiKey,
                })});
            if (res.ok) {
                const {name, description, brand, price, imageUrl} = await res.json();
                document.querySelector("#productName").value = name
                document.querySelector("#productDescription").value = description
                document.querySelector("#productBrand").value = brand
                document.querySelector("#productPrice").value = price
                document.querySelector("#productImage").value = imageUrl
            } else {
                throw res.status + " " + res.statusText
            }
            
        } else {
            document.querySelector(".btn-info").remove();
            document.querySelector(".btn-danger").remove();
        }
    } catch(error) {
        handleError(error)
    }
}