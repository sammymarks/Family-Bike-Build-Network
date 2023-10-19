//Global Variables for API Pull
let userDBData = new Array()
let buildDBData = new Array()
let accessoryDBData = new Array()
let bikeDBData = new Array()
let rackDBData = new Array()
let seatDBData = new Array()
let storageDBData = new Array()
let trailerDBData = new Array()
let currentUser = new Object()
let heartBtns
let addToBuildBtns

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

    // console.log(bikeDB)
    // console.log(userDB)
    userDBData = userDB.data
    buildDBData = buildDB.data
    accessoryDBData = accessoryDB.data
    bikeDBData = bikeDB.data
    rackDBData = rackDB.data
    seatDBData = seatDB.data
    storageDBData = storageDB.data
    trailerDBData = trailerDB.data
}

const clearPartsHTML = () => {
    let partViewer = document.querySelector('#parts-results')
    // console.log(partViewer)

    partViewer.innerHTML = ""
}

const renderPartsCollection = (collectionObjKey, collectionDBData) => {
    
    let collectionDisplayName = new String()
    let collectionURLName = new String()
    
    switch(collectionObjKey){
        case "accessoryDBData": {
            collectionDisplayName = "Accessory"
            collectionURLName = "accessories"
        } break;

        case "bikeDBData": {
            collectionDisplayName = "Bike" 
            collectionURLName = "bikes"
        } break;

        case "rackDBData": {
            collectionDisplayName = "Rack"
            collectionURLName = "racks"
        } break;

        case "seatDBData": {
            collectionDisplayName = "Seat"
            collectionURLName = "seats"
        } break;

        case "storageDBData": {
            collectionDisplayName = "Storage"
            collectionURLName = "storages"
        } break;

        case "trailerDBData": {
            collectionDisplayName = "Trailer"
            collectionURLName = "trailers"
        } break;

    }
    
    collectionDBData.forEach(doc => {
        let htmlString = newPartHTML(collectionDisplayName, collectionURLName, doc)
        let partViewer = document.querySelector('#parts-results')
        partViewer.innerHTML += htmlString
    });
}

const renderAllPartsAndListeners = () => {
    renderPartsCollection(Object.keys({bikeDBData})[0],bikeDBData)
    renderPartsCollection(Object.keys({seatDBData})[0],seatDBData)
    renderPartsCollection(Object.keys({trailerDBData})[0],trailerDBData)
    renderPartsCollection(Object.keys({rackDBData})[0],rackDBData)
    renderPartsCollection(Object.keys({storageDBData})[0],storageDBData)
    renderPartsCollection(Object.keys({accessoryDBData})[0],accessoryDBData)
    
    setHeartsListeners()
    setAddToBuildBtnsListeners()
}

const setCurrentUser = (userObj) => {
    currentUser = userObj
}



const newPartHTML = (collectionDisplayName, collectionURLName, docData) => {
    let brand = docData.brand
    let model = docData.model
    let urlPic = docData.urlPic
    let id = docData._id
    let likePic = new String()
    if (docData.likedByUsers.includes(currentUser._id)) {
        likePic = `../../assets/Heart_icon_red_filled.png`
    } else {
        likePic = `../../assets/Heart_icon_red_hollow.png`
    }
    let likeCount = docData.likedByUsers.length

    let htmlString = `<div class="part-item" collection-name="${collectionDisplayName}" db-collection-url-name="${collectionURLName}" db-doc-id="${id}">
    <div class="part-sub-item" id="collection">~${collectionDisplayName}~</div>
    <div class="part-sub-item" id="brand">${brand}</div>
    <div class="part-sub-item" id="model">${model}</div>
    <div class="part-sub-item" id="picture">
        <img src="${urlPic}">
    </div>
    <div class="part-sub-item" id="like">
        <img src="${likePic}">
        <div id="part-like-counter">${likeCount}</div>
    </div>
    <div class="part-sub-item" id="add-to-cart">
            <a href="#">Add to Build Cart</a>
    </div>
    </div>`

    return htmlString
}

const updatePartHTML = async (collectionName, collectionURLName, docID) => {
    console.log("updating part")
    let collectionDisplayName = collectionName.charAt(0).toUpperCase() + collectionName.slice(1);

    let doc = await axios.get(`http://localhost:3001/${collectionURLName}/${docID}`)
    let docData = doc.data
    console.log(docData)
    let likePic = new String()
    if (docData.likedByUsers.includes(currentUser._id)) {
        likePic = `../../assets/Heart_icon_red_filled.png`
    } else {
        likePic = `../../assets/Heart_icon_red_hollow.png`
    }
    let likeCount = docData.likedByUsers.length

    let HTMLPart = document.querySelector(`[db-collection-url-name="${collectionURLName}"][db-doc-id="${docID}"]`)

    HTMLPart.innerHTML = `<div class="part-sub-item" id="collection">~${collectionDisplayName}~</div>
        <div class="part-sub-item" id="brand">${docData.brand}</div>
        <div class="part-sub-item" id="model">${docData.model}</div>
        <div class="part-sub-item" id="picture">
            <img src="${docData.urlPic}">
        </div>
        <div class="part-sub-item" id="like">
            <img src="${likePic}">
            <div id="part-like-counter">${likeCount}</div>
        </div>
        <div class="part-sub-item" id="add-to-cart">
                <a href="#">Add to Build Cart</a>
        </div>
    </div>`
}

//app.put("/users/add-to-build-cart/:userID/:collectionURL/:partID"
const setAddToBuildBtnsListeners = () => {
    
    addToBuildBtns = document.querySelectorAll("#add-to-cart")
    console.log(addToBuildBtns)
    addToBuildBtns.forEach((btn) => {
        btn.addEventListener('click', async () => {
            // Find part in HTML
            let parentPart = btn.parentElement
            let partCollectionURL = parentPart.getAttribute("db-collection-url-name")
            let collectionName = parentPart.getAttribute("collection-name")
            let partID = parentPart.getAttribute("db-doc-id")
            // Get part
            let partObj = await axios.get(`http://localhost:3001/${partCollectionURL}/${partID}`)
            let objData = partObj.data
            // Add part to User cart
            await axios.put(`http://localhost:3001/users/add-to-build-cart/${currentUser._id}/${partCollectionURL}/${partID}`)
            if(!alert(`${collectionName} has been added to ${currentUser.userName}'s Build Cart.`)){window.location.reload();}

        })
    })
}

const setHeartsListeners = () => {
    heartBtns = document.querySelectorAll("#like>img")
    console.log(heartBtns)
    heartBtns.forEach((heart) => {
        heart.addEventListener('click', async () => {
            // Find part in HTML
            let parentPart = heart.parentElement.parentElement
            let partCollectionURL = parentPart.getAttribute("db-collection-url-name")
            let collectionName = parentPart.getAttribute("collection-name")
            let partID = parentPart.getAttribute("db-doc-id")
            
            //Get Part
            let partObj = await axios.get(`http://localhost:3001/${partCollectionURL}/${partID}`)
            let objData = partObj.data
            
            //Update part
            if (objData.likedByUsers.includes(currentUser._id)) {
                //update DB, remove user
                console.log(collectionName, partCollectionURL, partID)

                await axios.put(`http://localhost:3001/${partCollectionURL}/remove-user-like/${partID}/${currentUser._id}`)
                if(!alert(`${collectionName} has been un-liked`)){window.location.reload();}

                // console.log(collectionName, partCollectionURL, partID)

            } else {
                //update DB, add user
                // console.log(collectionName, partCollectionURL, partID)

                await axios.put(`http://localhost:3001/${partCollectionURL}/add-user-like/${partID}/${currentUser._id}`)
                if(!alert(`${collectionName} has been liked`)){window.location.reload();}

                // console.log(collectionName, partCollectionURL, partID)
            }
            // console.log(collectionName, partCollectionURL, partID)
            // await updatePartHTML(collectionName, partCollectionURL, partID)
            
        })
    })
}

//Upon load
window.addEventListener('load', async (event) => {
    event.preventDefault()
    console.log("Loading")
    
    await refreshDBData()
    setCurrentUser(userDBData[0])
    renderAllPartsAndListeners()
})



// <div class="part" collection="bikes" dbID="">

// document.querySelectorAll(`div[collection="bikes"]`)