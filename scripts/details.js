const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzBmNmU3MzczODAwMTUzNzQzNzMiLCJpYXQiOjE2NzQxMjk2NTQsImV4cCI6MTY3NTMzOTI1NH0.uvMVnP_iIKi1Whyr9El3BIGBSqO_016vYWPscfX92u8"
const url = "https://striveschool-api.herokuapp.com/api/product/"
const id = new URLSearchParams(location.search).get("id")

const handleError = (errorText) => {
    const alert = document.querySelector(".alert span.alert-text")
    console.log(alert)
    alert.innerText = errorText
    alert.parentElement.classList.replace("d-none", "d-block")
}

window.onload = async () => {
    try {
        const res = await fetch(url + id, {
            headers: new Headers({
                "Content-type": "application/json",
                "Authorization": "Bearer " + apiKey,
            })})
        if (res.ok) {
            const {name, description, brand, price, imageUrl, createdAt, updatedAt, _id} = await res.json();
            const cont = document.querySelector(".container.mt-5")
            cont.innerHTML = `<div class="card">
                                <div class="row no-gutters">
                                    <div class="col-4">
                                        <img class="card-img-top img-fluid h-100" src="${imageUrl}">
                                    </div>
                                    <div class="col-8">
                                        <div class="card-body h-100 d-flex flex-column">
                                            <h2 class="card-title">${name}</h2>
                                            <h3 class="card-subtitle mb-2 text-muted">${brand}</h3>
                                            <p class="card-text mb-auto">
                                                ${description}
                                            </p>
                                            <div class="d-flex justify-content-start mb-2">
                                                 <a href="./backoffice.html?id=${_id}" class="btn btn-sm btn-outline-secondary">Edit</a>
                                             </div>
                                            <div>
                                                <span class="badge badge-pill badge-light m-1">created: ${createdAt}</span>
                                                <span class="badge badge-pill badge-dark m-1">updated: ${updatedAt}</span>
                                                <span class="badge badge-pill badge-secondary m-1">id: ${_id}</span>
                                           </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        } else {
            throw res.status + " " + res.statusText
        }
    } catch (error) {
        handleError(error)
    }
}