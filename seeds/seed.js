const db = require('../db/index')

const { Bike, Trailer, Seat, Rack, Storage, Accessory, Build, User} = require(`../models/index.js`)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
console.log("DB On")


const main = async () => {
   
    // USER
    const adminUser = await  User.create({
        userName: "Sammy Admin",
        location: "Chicago, IL",
        profilePic: "https://i.imgur.com/9QVCcKL.jpg",
        isAdmin: true,
    })

    const standardUser = await User.create({
        userName: "Fiona Hippo",
        location: "Chicago, IL",
        profilePic: "https://cincinnatizoo.org/system/assets/uploads/2023/01/52360823791_2a357cfab6_b.jpg",
        isAdmin: false,
    })    
    
    //BIKE
    const UAFamily = await Bike.create({
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
    
    const konaRoveST = await  Bike.create({
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

    //ACCESSORY
    
    const niteRiderFontLight = await Accessory.create({
        brand: "Nite Rider",
        model: "Lumina 1200",
        type: "Light",
        urlProduct: "https://www.niterider.com/collections/lumina%E2%84%A2-pro-series/products/lumina%E2%84%A2-pro-1200",
        urlPic: "https://www.niterider.com/cdn/shop/products/LuminaPro1200_Product_Images_Builder-03_360x.jpg?v=1642620959",
        otherNotes: `Front light. Super bright, has multiple static and flashing and hybrid settings`,
        addedByUser: adminUser._id,
        likedByUsers: [adminUser._id, standardUser._id],
    })

    const kryptoniteFahgettabouditMini = await Accessory.create({
        brand: "Kryptonite",
        model: "NEW YORK FAHGETTABOUDIT MINI",
        type: "Lock",
        urlProduct: "https://www.kryptonitelock.com/en/products/product-information/current-key/997986.html",
        urlPic: "https://www.kryptonitelock.com/content/dam/kryt-us/en/product-images/997986_608.jpg",
        otherNotes: `Can be used in conjuction with a cable, extra lock, or axle locks`,
        addedByUser: standardUser._id,
        likedByUsers: [adminUser._id],
    })

    //TRAILER
    const BurleyEncoreX = await Trailer.create({
        brand: "Burley",
        model: "Encore X",
        category: "Kid",
        passengerCount: 2,
        urlProduct: "https://burley.com/products/encore-x",
        urlPic: "https://burley.com/cdn/shop/files/1EncoreX-MAINwithPCRFBadge_300x.jpg?v=1684973738",
        isStroller: true,
        otherNotes: "All the convenience of the Burley hitch system. Seats fold down for use as a Cargo trailer. Burley-branded through-axle sold separately.",
        addedByUser: adminUser._id,
    })

    const WehooiGoTwo = await Trailer.create({
        brand: "Wehoo",
        model: "iGo Two",
        category: "Kid",
        passengerCount: 2,
        urlProduct: "https://www.amazon.com/Weehoo-K1020-2-Bike-Trailer/dp/B00S72SX9I/ref=cm_cr_arp_d_product_top?ie=UTF8",
        urlPic: "https://m.media-amazon.com/images/I/51JlrsLToeL._AC_SL1000_.jpg",
        isStroller: false,
        otherNotes: "Narrower than traditional trailers, great for older kids. Seatpost mounted.",
        addedByUser: standardUser,
    })

    //SEAT

    const ShotgunKidsMTB = await Seat.create({
        brand: "Kids Ride Shotgun",
        model: "Mountain Bike Seat Combo",
        mountingType: "Frame",
        locationOnBike: "Other",
        urlProduct: "https://kidsrideshotgun.com/collections/products/products/shotgun-kids-mtb-seat-combo",
        urlPic: "https://kidsrideshotgun.com/cdn/shop/products/kids-ride-shotgun-child-bike-seat-on-bike_1296x.jpg?v=1630396560",
        otherNotes: "Optimized for mountain bikes that don't carry racks or tow trailers. Older kids only - there is no harness!",
        addedByUser: standardUser._id,
        likedByUsers: standardUser._id,
    })

    const ThuleYeppMini = await Seat.create({
        brand: "Thule",
        model: "Yepp Mini",
        mountingType: "Handlebar",
        locationOnBike: "Front",
        urlProduct: "https://www.thule.com/en-us/child-bike-seats/front-mounted-child-bike-seats/thule-yepp-mini-_-12020102",
        urlPic: "https://www.thule.com/-/p/EcwJ6DvyfylibN311FB92gGV0J2WZBG_cHhGQ6desmE/rs:fit/f:avif/cb:1.4/q:80/h:991/w:991/plain/approved/std.lang.all/33/78/1383378.png",
        otherNotes: "Not compatible with all bikes - requires a long stem. See product specs. Can be easily removed from the low-profile bracket.",
        addedByUser: adminUser._id,
        likedByUsers: adminUser._id,
    })

    //RACK
    const YubaMonkeyBars = await Rack.create({
        brand: "Yuba",
        model: "Monkey Bars",
        locationOnBike: "Rear",
        urlProduct: "https://yubabikes.com/cargobikestore/yuba-monkey-bars/",
        otherNotes: "Only used for Yuba cargo bikes",
        addedByUser: standardUser._id,
    })

    const TopeakExplorerDisc = await Rack.create({
        brand: "Topeak",
        model: "Explorer Disc (No Spring)",
        locationOnBike: "Rear",
        maxWeightLB: 57,
        urlProduct: "https://www.topeak.com/us/en/product/1531-EXPLORER-(DISC)-(W-O-SPRING)",
        urlPic: "https://d38pflz5lto8bg.cloudfront.net/storage/app/media/product/racks/explorer/2022/TA2135B_main_2307.png",
        otherNotes: "Only used for Yuba cargo bikes",
        addedByUser: standardUser._id,
        likedByUsers: adminUser._id,
    })

    //STORAGE
    const OrtleibBackRoller = await Storage.create({
        brand: "Ortleib",
        model: "Back Roller Classic",
        mountingType: "Rack",
        volumeLiters: 40,
        urlProduct: "https://www.ortlieb.com/en_us/back-roller-classic+F5301",
        urlPic: "https://www.ortlieb.com/media/catalog/product/cache/08feb11c79a0bb9a6da085a0189fa580/b/a/back-roller-classic_f5301_pair_1.jpg",
        otherNotes: "Comes in pairs. Absolute workhorse, from touring to grocery runs.",
        addedByUser: standardUser._id,
        likedByUsers: adminUser._id,
    })

    const YubaGoGetterBag = await Storage.create({
        brand: "Yuba",
        model: "Go-Getter Bag",
        mountingType: "Frame",
        volumeLiters: 80,
        urlProduct: "https://yubabikes.com/cargobikestore/go-getter-bag/",
        urlPic: "https://eadn-wc04-3021648.nxedge.io/cdn/pub/media/catalog/product/cache/ce6ea614a7d577118de51f685d76082e/G/o/Go-Getter_Bag_for_all_Mundo_El_Mundo_Bikes_1.jpg",
        otherNotes: "Only use for Yuba bikes",
        addedByUser: standardUser._id,
        likedByUsers: adminUser._id,
    })

    //BUILDS
    const hippoBuild = await Build.create({
        ownerUser: standardUser._id,
        buildName: "MountainMama's Weekend Rider",
        buildNotes: "Home is where the hippo is",
        buildPic: "https://talesofamountainmama.com/wp-content/uploads/2019/05/IMG_7052.jpg.webp",
        bikeObj: konaRoveST._id,
        trailerObjs: BurleyEncoreX._id,
        rackObjs: TopeakExplorerDisc._id,
        storageObjs: OrtleibBackRoller._id,
        accessoryObjs: [niteRiderFontLight._id, kryptoniteFahgettabouditMini._id],
        likedByUsers: standardUser._id,
    })

    const adminBuild = await Build.create({
        ownerUser: adminUser._id,
        buildName: "Go Dog Go",
        buildNotes: "This build is has more charm than your puppy",
        buildPic: "https://i5.walmartimages.com/seo/Schwinn-Rascal-Bike-Pet-Trailer-Orange_94350720-5c09-40dd-b42c-9a46bc5975b8_1.98708982bfc3a827db39d2f4b76bda95.jpeg",
        bikeObj: konaRoveST._id,
        trailerObjs: BurleyEncoreX._id,
        rackObjs: TopeakExplorerDisc._id,
        storageObjs: OrtleibBackRoller._id,
        accessoryObjs: [niteRiderFontLight._id, kryptoniteFahgettabouditMini._id],
        likedByUsers: standardUser._id,
    })

    const fancyBuild = await Build.create({
        ownerUser: standardUser._id,
        buildName: "More money than kids",
        buildNotes: "Should've gotten the G-Wagon",
        buildPic: "https://bikeshopgirl.com/wp-content/uploads/2020/05/urban-arrow-getting-started-guide-1170x878.jpg",
        bikeObj: UAFamily._id,
        trailerObjs: BurleyEncoreX._id,
        rackObjs: TopeakExplorerDisc._id,
        storageObjs: OrtleibBackRoller._id,
        accessoryObjs: [niteRiderFontLight._id, kryptoniteFahgettabouditMini._id],
        likedByUsers: standardUser._id,
    })
}


seedAll = async () => {
    await db.dropDatabase()
    console.log("droppedDB")
    await main()
    console.log("completed main")
    await db.close()
    console.log("closed db")
}

seedAll()