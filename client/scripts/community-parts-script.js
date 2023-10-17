//Global Variables for API Pull
let userDBData = new Array()
let buildDBData = new Array()
let accessoryDBData = new Array()
let bikeDBData = new Array()
let rackDBData = new Array()
let seatDBData = new Array()
let storageDBData = new Array()
let trailerDBData = new Array()
let currentUser = Object()

//Functions

const renderCollection = (collectionDBData) => {
    let collectionName = collectionDBData.shift()
    // console.log(collectionDBData)
    
    collectionDBData.forEach(doc => {
        let brand = doc.brand
        let model = doc.model
        let urlPic = doc.urlPic
        let id = doc._id
        let likePic = new String()
        if (doc.likedByUsers.includes(doc.addedByUser)) {
            likePic = `../../assets/Heart_icon_red_filled.png`
        } else {
            likePic = `../../assets/Heart_icon_red_hollow.png`
        }
        let likeCount = doc.likedByUsers.length
        // console.log(brand, model, urlPic, likePic, likeCount)        

        let htmlString = `<div class="part-item" id="${collectionName}">
        <div class="part-sub-item" id="collection">~${collectionName}~</div>
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


        let partViewer = document.querySelector('#parts-results')
        // console.log(partViewer)

        partViewer.innerHTML += htmlString
    });
}

const renderAllParts = () => {
    renderCollection(bikeDBData)
    renderCollection(seatDBData)
    renderCollection(trailerDBData)
    renderCollection(rackDBData)
    renderCollection(storageDBData)
    renderCollection(accessoryDBData)
}

// const setCurrentUser = (userObj) => {
//     currentUser = userObj
// }

//Event Listeners
window.addEventListener('load', async (event) => {
    event.preventDefault()
    console.log("Loading")
    
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
    userDBData = ["User",...userDB.data]
    buildDBData = ["Build",...buildDB.data]
    accessoryDBData = ["Accessory",...accessoryDB.data]
    bikeDBData = ["Bike",...bikeDB.data]
    rackDBData = ["Rack",...rackDB.data]
    seatDBData = ["Seat",...seatDB.data]
    storageDBData = ["Storage",...storageDB.data]
    trailerDBData = ["Trailer",...trailerDB.data]

    // currentUser = userDBData[0]
    // console.log(currentUser)


    // setCurrentUser(currentUser)
    console.log(currentUser)
    renderAllParts()

})

