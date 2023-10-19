//GLOBAL VARIABLES

//FUNCTIONS
async function submitBike(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    
    const fBrand = formData.get("brand")
    const fModel = formData.get("model")
    let fIsElectric = new Boolean
    formData.get("is-electric") == "on" ? fIsElectric = true : fIsElectric = false
    const fCategory = formData.get("category")
    const fYear = formData.get("year")
    const fProductURL = formData.get("product-url")
    const fPicURL = formData.get("product-pic-url")
    const fFrame = formData.get("frame")
    const fOtherNotes = formData.get("other-notes")

    try {
        const newBike = await axios.post(`http://localhost:3001/bikes/add-bike`,
            {
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
        )
    } catch (error) {
        console.error(error)
    }

    if(!alert(`Bike has been added. Thank you for contributing!`)){window.location.reload();}

}

//EVENT LISTENERS
const bikeForm = document.querySelector('#add-bike-form')
bikeForm.addEventListener('submit', submitBike)

