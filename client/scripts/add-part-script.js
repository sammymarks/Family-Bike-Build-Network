//GLOBAL VARIABLES


//FUNCTIONS
const submitBike = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    
    const fBrand = formData.get("brand")
    const fModel = formData.get("model")
    let fIsElectric = new Boolean
    formData.get("is-electric") == "on" ? fIsElectric = true : fIsElectric = false
    const fCategory = formData.get("category")
    let fYear = new Number
    formData.get("year") ? fYear = formData.get("year") : fYear = 0
    // fYear == null ? fYear = 0 : 
    const fProductURL = formData.get("product-url")
    const fPicURL = formData.get("product-pic-url")
    const fFrame = formData.get("frame")
    const fOtherNotes = formData.get("other-notes")

    const bikeObj = {
        brand: fBrand,
        model: fModel,
        isElectricAssist: fIsElectric,
        category: fCategory,
        year: fYear,
        urlProduct: fProductURL,
        urlPic: fPicURL,
        frameMaterials: fFrame,
        otherNotes: fOtherNotes,
    }

    console.log(bikeObj)

    try {
        console.log("try")
        const newBike = await axios.post(`http://localhost:3001/bikes/add-bike`, bikeObj)
    } catch (error) {
        console.error(error)
    }

    if(!alert(`Bike has been added. Thank you for contributing!`)){window.location.reload();}

}

const showModal = () => {

    bikeModal.style.display = "block"
    console.log("now showing")
}

const hideModal = () => {
    bikeModal.style.display = "none"
}


//EVENT LISTENERS
const addBikeBtn = document.querySelector('#add-part-bike')
const bikeModal = document.querySelector('#bike-modal')
const bikeForm = document.querySelector('#add-bike-form')
const closeBikeForm = document.querySelector('#close-bike-modal')

addBikeBtn.addEventListener('click', showModal)
bikeForm.addEventListener('submit', submitBike)
closeBikeForm.addEventListener('click', hideModal)

