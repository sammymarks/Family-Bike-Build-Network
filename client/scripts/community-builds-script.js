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

//FUNCTIONS

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

const setCurrentUser = (userObj) => {
    currentUser = userObj
}

const renderAllBuildsAndListeners = () => {
    renderAllBuilds()
    setHeartsListeners()
    // setAddToBuildBtnsListeners()
}

const renderAllBuilds = () => {
    //for each build, render the right HTML and post to HTML
    buildDBData.forEach(doc => {
        let htmlString = newBuildHTML(doc)
        console.log(htmlString)
        let buildViewer = document.querySelector('.item-results')
        buildViewer.innerHTML += htmlString
    });
}

const findUserIndex = (userID) => {
    const index = userDBData.findIndex((user) => {
        return user._id == userID
    })
}

const newBuildHTML = (docData) => {
        
    let displayName = docData.buildName
    let ownerUserID = docData.ownerUser
    let userIndex = userDBData.findIndex((user) => {return user._id == ownerUserID})
    let displayOwner = userDBData[userIndex].userName
    let displayNotes = docData.buildNotes
    let urlPic = docData.buildPic
    let docID = docData._id
    let likePic = new String()
    if (docData.likedByUsers.includes(currentUser._id)) {
        likePic = `../../assets/Heart_icon_red_filled.png`
    } else {
        likePic = `../../assets/Heart_icon_red_hollow.png`
    }
    let likeCount = docData.likedByUsers.length

    let htmlString = 
    `<div class="comm-build-item" db-doc-id="${docID}">
        <div class="comm-build-sub-item" id="build-name">${displayName}</div>
        <div class="comm-build-sub-item" id="owner-user-name">built by ${displayOwner}</div>
        <div class="comm-build-sub-item" id="build-notes">${displayNotes}</div>
        <div class="comm-build-sub-item" id="picture">
            <img src="${urlPic}">
        </div>
        <div class="comm-build-sub-item" id="like">
            <img src="${likePic}">
            <div id="build-like-count">${likeCount}</div>
        </div>
    </div>`

    return htmlString
}


const setHeartsListeners = () => {
    heartBtns = document.querySelectorAll("#like>img")
    console.log(heartBtns)
    heartBtns.forEach((heart) => {
        heart.addEventListener('click', async () => {
            // Find build in HTML
            let parentPart = heart.parentElement.parentElement
            let buildID = parentPart.getAttribute("db-doc-id")
            
            //Get build
            let partObj = await axios.get(`http://localhost:3001/builds/${buildID}`)
            let objData = partObj.data
            
            //Update part
            if (objData.likedByUsers.includes(currentUser._id)) {
                //update DB, remove user
                await axios.put(`http://localhost:3001/builds/remove-user-like/${buildID}/${currentUser._id}`)
                if(!alert(`Build has been un-liked`)){window.location.reload();}
            } else {
                //update DB, add user
                await axios.put(`http://localhost:3001/builds/add-user-like/${buildID}/${currentUser._id}`)
                if(!alert(`Build has been liked`)){window.location.reload();}
            }
        })
    })
}

//LISTENERS
//Upon load
window.addEventListener('load', async (event) => {
    event.preventDefault()
    console.log("Loading")
    await refreshDBData()
    setCurrentUser(userDBData[0])
    await renderAllBuildsAndListeners()
})