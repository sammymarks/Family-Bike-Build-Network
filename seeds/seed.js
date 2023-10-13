const db = require('../db/index')

const { 
    Bike, 
    Trailer,
    Seat,
    Rack,
    Storage,
    Accessory,
    Build,
    User
} = require(`../models/index.js`)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    console.log("running main")
    //USER
    const adminUser = await new User({
        userName: "Sammy Admin",
        location: "Chicago, IL",
        profilePic: "https://i.imgur.com/9QVCcKL.jpg",
        isAdmin: true,
    })
    adminUser.save()

    const standardUser = await new User({
        userName: "Fiona Hippo",
        location: "Chicago, IL",
        profilePic: "https://cincinnatizoo.org/system/assets/uploads/2023/01/52360823791_2a357cfab6_b.jpg",
        isAdmin: false,
    })
    standardUser.save
    
    
    //BIKE
    const UAFamily = await new Bike({
        brand: "Urban Arrow",
        model: "Family",
        isElectricAssist: true,
        category: `Cargo/Family`,
        year: 2022,
        urlProduct: "https://urbanarrow.com/family-bikes/family/",
        urlPic: "https://cdn.mos.cms.futurecdn.net/xAqPbu5ALSHNZkFubuCDeS.jpg",
        frameMaterials: "Aluminum",
        otherNotes: `Highest End. Bosch Motor. Proprietary seats, seatbelts, etc.`,
        addedByUser: adminUser._id,
        likedByUsers: [adminUser._id, standardUser._id],
    })
    UAFamily.save()
    
    const konaRoveST = await new Bike({
        brand: "Kona",
        model: "Rove ST",
        isElectricAssist: false,
        category: `Touring/Gravel`,
        year: 2019,
        urlProduct: "https://bikeshopcalifornia.com/product/kona-rove-st/",
        urlPic: "https://d2yn9m4p3q9iyv.cloudfront.net/kona/2017/rove-st/thumbs/1000/2fc1d.jpeg",
        frameMaterials: "Chromoly (Steel)",
        otherNotes: `Workhorse commuter, great for pulling a trailer`,
        addedByUser: adminUser._id,
        likedByUsers: [standardUser._id],
    })
    konaRoveST.save()

    //Accessory
    
    const niteRiderFontLight = await new Accessory({
        brand: "Nite Rider",
        model: "Lumina 1200",
        type: "Light",
        urlProduct: "https://www.niterider.com/collections/lumina%E2%84%A2-pro-series/products/lumina%E2%84%A2-pro-1200",
        urlPic: "https://www.niterider.com/cdn/shop/products/LuminaPro1200_Product_Images_Builder-03_360x.jpg?v=1642620959",
        otherNotes: `Front light. Super bright, has multiple static and flashing and hybrid settings`,
        addedByUser: adminUser._id,
        likedByUsers: [adminUser._id, standardUser._id],
    })
    niteRiderFontLight.save()

    const kryptoniteFahgettabouditMini = await new Accessory({
        brand: "Kryptonite",
        model: "NEW YORK FAHGETTABOUDIT MINI",
        type: "Lock",
        urlProduct: "https://www.kryptonitelock.com/en/products/product-information/current-key/997986.html",
        urlPic: "https://www.kryptonitelock.com/content/dam/kryt-us/en/product-images/997986_608.jpg",
        otherNotes: `Can be used in conjuction with a cable, extra lock, or axle locks`,
        addedByUser: standardUser._id,
        likedByUsers: [adminUser._id],
    })
    kryptoniteFahgettabouditMini.save()

    


}

seedConfig = async () => {
    // db.dropDatabase()
    await main()
    console.log("completed main")
    // db.close()
}

seedConfig()