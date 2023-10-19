//Global Variables for API Pull
let userDBData = new Array()
let buildDBData = new Array()
let accessoryDBData = new Array()
let bikeDBData = new Array()
let rackDBData = new Array()
let seatDBData = new Array()
let storageDBData = new Array()
let trailerDBData = new Array()

//Other Global Variables
let currentUser = new Object()
let buildSubmission = new Object()

let accessoryCart = new Array()
let bikeCart = new Array()
let rackCart = new Array()
let seatCart = new Array()
let storageCart = new Array()
let trailerCart = new Array()

//Functions

const refreshDBData = async () => {
    let userDB = await axios.get(`http://localhost:3001/users`)
    let buildDB = await axios.get(`http://localhost:3001/builds`)

    let accessoryDB = await axios.get(`http://localhost:3001/accessories`)
    let bikeDB = await axios.get(`http://localhost:3001/bikes`)
    let rackDB = await axios.get(`http://localhost:3001/racks`)
    let seatDB = await axios.get(`http://localhost:3001/seats`)
    let storageDB = await axios.get(`http://localhost:3001/storages`)
    let trailerDB = await axios.get(`http://localhost:3001/trailers`)

    userDBData = userDB.data
    buildDBData = buildDB.data
    accessoryDBData = accessoryDB.data
    bikeDBData = bikeDB.data
    rackDBData = rackDB.data
    seatDBData = seatDB.data
    storageDBData = storageDB.data
    trailerDBData = trailerDB.data
}

const setCurrentUserAndCart = (userObj) => {
    currentUser = userObj
    accessoryCart = currentUser.buildCartAccessories
    bikeCart = currentUser.buildCartBikes
    rackCart = currentUser.buildCartRacks
    seatCart = currentUser.buildCartSeats
    storageCart = currentUser.buildCartStorages
    trailerCart = currentUser.buildCartTrailers
}

const renderCartAndListeners = () => {
    renderBuildCart()
    setRemoveFromBuildBtnsListeners()
    setCreateBuildModal()

}

const renderBuildCart = async () => {
    let partViewer = document.querySelector('#current-build-cart')
    partViewer.innerHTML = ""

    if (bikeCart.length>0) {
        bikeCart.forEach(partID => {
            let partIndex = bikeDBData.findIndex(dbPart => dbPart._id == partID)
            let htmlString = newBuildCartItemHTML("Bike", "bikes", bikeDBData[partIndex])
            partViewer.innerHTML += htmlString
        });
    }

    if (trailerCart.length>0) {
        trailerCart.forEach(partID => {
            let partIndex = trailerDBData.findIndex(dbPart => dbPart._id == partID)
            let htmlString = newBuildCartItemHTML("Trailer", "trailers", trailerDBData[partIndex])
            partViewer.innerHTML += htmlString
        });
    }

    if (seatCart.length>0) {
        seatCart.forEach(partID => {
            let partIndex = seatDBData.findIndex(dbPart => dbPart._id == partID)
            let htmlString = newBuildCartItemHTML("Seat", "seats", seatDBData[partIndex])
            partViewer.innerHTML += htmlString
        });
    }

    if (rackCart.length>0) {
        rackCart.forEach(partID => {
            let partIndex = rackDBData.findIndex(dbPart => dbPart._id == partID)
            let htmlString = newBuildCartItemHTML("Rack", "racks", rackDBData[partIndex])
            partViewer.innerHTML += htmlString
        });
    }

    if (storageCart.length>0) {
        storageCart.forEach(partID => {
            let partIndex = storageDBData.findIndex(dbPart => dbPart._id == partID)
            let htmlString = newBuildCartItemHTML("Bike", "storages", storageDBData[partIndex])
            partViewer.innerHTML += htmlString
        });
    }

    if (accessoryCart.length>0) {
        accessoryCart.forEach(partID => {
            let partIndex = accessoryDBData.findIndex(dbPart => dbPart._id == partID)
            let htmlString = newBuildCartItemHTML("Accessory", "accessories", accessoryDBData[partIndex])
            partViewer.innerHTML += htmlString      
        });
    }
}

const newBuildCartItemHTML = (collectionDisplayName, collectionURLName, docData) => {
    let brand = docData.brand
    let model = docData.model
    let urlPic = docData.urlPic
    let id = docData._id


    let htmlString = 
        `<div class="build-cart-item" collection-name="${collectionDisplayName}" db-collection-url-name="${collectionURLName}" db-doc-id="${id}">
            <div class="build-cart-sub-item" id="collection">~${collectionDisplayName}~</div>
            <div class="build-cart-sub-item" id="brand">${brand}</div>
            <div class="build-cart-sub-item" id="model">${model}</div>
            <div class="part-sub-sub-item" id="picture">
                <img src="${urlPic}">
            </div>
            <div class="build-cart-sub-sub-item" id="remove-from-build">
                <a href="#">Remove from Build Cart</a>
            </div>
        </div>`
    return htmlString
}

const setRemoveFromBuildBtnsListeners = () => {
    let removeFromBuildBtns = document.querySelectorAll("#remove-from-build")
    removeFromBuildBtns.forEach((btn) => {
        btn.addEventListener('click', async () => {
            // Find part in HTML
            let parentPart = btn.parentElement
            let partCollectionURL = parentPart.getAttribute("db-collection-url-name")
            let collectionName = parentPart.getAttribute("collection-name")
            let partID = parentPart.getAttribute("db-doc-id")
            // Remove part from user cart
            await axios.put(`http://localhost:3001/users/remove-from-build-cart/${currentUser._id}/${partCollectionURL}/${partID}`)
            if(!alert(`${collectionName} has been removed from ${currentUser.userName}'s Build Cart.`)){window.location.reload();}
        })
    })
}

const setCreateBuildModal = () => {
    
}


const buildPartsModalHTML = () => {
    let buildPartsList = document.querySelector("#build-parts-list")            
    if (bikeCart.length>0) {
        bikeCart.forEach(partID => {
            let partIndex = bikeDBData.findIndex(dbPart => dbPart._id == partID)
            let htmlString = `<li class="short-list-items"><span id="list-collection">Bike:</span> ${bikeDBData[partIndex].brand} ${bikeDBData[partIndex].model}</li>`
            // newBuildCartItemHTML("Bike", "bikes", bikeDBData[partIndex])
            buildPartsList.innerHTML += htmlString
        });
    }

    if (trailerCart.length>0) {
        trailerCart.forEach(partID => {
            let partIndex = trailerDBData.findIndex(dbPart => dbPart._id == partID)
            let htmlString = `<li class="short-list-items"><span id="list-collection">Trailer:</span> ${trailerDBData[partIndex].brand} ${trailerDBData[partIndex].model}</li>`
            buildPartsList.innerHTML += htmlString
        });
    }

    if (seatCart.length>0) {
        seatCart.forEach(partID => {
            let partIndex = seatDBData.findIndex(dbPart => dbPart._id == partID)
            let htmlString = `<li class="short-list-items"><span id="list-collection">Seat:</span> ${seatDBData[partIndex].brand} ${seatDBData[partIndex].model}</li>`
            buildPartsList.innerHTML += htmlString
        });
    }

    if (rackCart.length>0) {
        rackCart.forEach(partID => {
            let partIndex = rackDBData.findIndex(dbPart => dbPart._id == partID)
            let htmlString = `<li class="short-list-items"><span id="list-collection">Rack:</span> ${rackDBData[partIndex].brand} ${rackDBData[partIndex].model}</li>`
            buildPartsList.innerHTML += htmlString
        });
    }

    if (storageCart.length>0) {
        storageCart.forEach(partID => {
            let partIndex = storageDBData.findIndex(dbPart => dbPart._id == partID)
            let htmlString = `<li class="short-list-items"><span id="list-collection">Storage:</span> ${storageDBData[partIndex].brand} ${storageDBData[partIndex].model}</li>`
            buildPartsList.innerHTML += htmlString
        });
    }

    if (accessoryCart.length>0) {
        accessoryCart.forEach(partID => {
            let partIndex = accessoryDBData.findIndex(dbPart => dbPart._id == partID)
            let htmlString = `<li class="short-list-items"><span id="list-collection">Accessory:</span> ${accessoryDBData[partIndex].brand} ${accessoryDBData[partIndex].model}</li>`
            buildPartsList.innerHTML += htmlString
        });
    }
}

const submitBuildBtnListener = () => {
    const submitBuildBtn = document.querySelector("#submit-btn")
    console.log(submitBuildBtn)
    submitBuildBtn.addEventListener('click', async () => {
        let nameString = document.querySelector("#build-name").value
        console.log(nameString)
        let notesString = document.querySelector("#build-notes").value
        let picString = document.querySelector("#build-pic").value
        console.log(picString)

        buildSubmission = {
            ownerUser : currentUser._id,
            buildName : nameString,
            buildNotes : notesString,
            buildPic : picString,
            bikeObj : bikeCart,
            trailerObjs : trailerCart,
            seatObjs : seatCart,
            rackObjs : rackCart,
            storageObjs : storageCart,
            accessoryObjs : accessoryCart,
            likedByUsers : [],
        }
        console.log(buildSubmission)

        //post new build
        await axios.post(`http://localhost:3001/builds/add-build`,buildSubmission)

        //clear user cart
        await axios.put(`http://localhost:3001/users/clear-build-cart/${currentUser._id}`)
        //reload page
        if (!alert(`Build submitted!`)) {window.location.reload()}

    })
}

const openCloseBuildModalListener = () => {
    const modal = document.querySelector("#create-build-modal")
    
    const openBuildModal = document.querySelector("#create-a-build-button")
    openBuildModal.addEventListener('click', async () => {
        modal.style.display = "block"
    })

    const closeBuildModal = document.querySelector("#cancel-btn")
    console.log(closeBuildModal)
    closeBuildModal.addEventListener('click', async () => {
        modal.style.display = "none"
    })
}


const renderModalAndListeners = async () => {
    buildPartsModalHTML()
    openCloseBuildModalListener()
    await submitBuildBtnListener()
}


//Event Listeners

//Upon load
window.addEventListener('load', async (event) => {
    event.preventDefault()
    console.log("Loading")
    await refreshDBData()
    await setCurrentUserAndCart(userDBData[0])
    await renderCartAndListeners()
    await renderModalAndListeners()
})



