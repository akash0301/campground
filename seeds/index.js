const mongoose = require("mongoose")
const Campground = require("../models/campground")
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers")

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database Connected!!")
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        let random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "60dc03b98cb44718f09a207b",
            location: `${cities[random1000].city}, ${cities[random1000].state} `,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, blanditiis! Quod voluptatibus facere provident, eum deserunt iusto, aliquam nam nulla distinctio voluptates cumque placeat. Architecto?",
            //price is same as price: price
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    "url": "https://res.cloudinary.com/udemy-web-dev-yelp-camp/image/upload/v1625119958/YelpCamp/irlv8eimooopcjyr4l8c.jpg",
                    "filename": "YelpCamp/irlv8eimooopcjyr4l8c"
                },
                {
                    "url": "https://res.cloudinary.com/udemy-web-dev-yelp-camp/image/upload/v1625119955/YelpCamp/ncovsizkvw89zbfjlxev.jpg",
                    "filename": "YelpCamp/ncovsizkvw89zbfjlxev"
                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});