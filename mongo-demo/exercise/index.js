
const mongoose = require('mongoose')

// connect to db
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to mongo-exercises db...'))
    .catch(error => console.log('Fail to connect to db...', error))

// define schema
const courseSchema = new mongoose.Schema({
    tags: [ String ],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
})

// querying docs 
// create map
const Course = mongoose.model('Course', courseSchema)

// create query function 
async function getCourses() {
    return await Course
    .find({ isPublished: true, tags: 'backend' })
    .sort( { name: 1 } )   // or .sort('name') or .sort('-name')
    .select( { name: 1, author: 1 })  // or .select('name author')
}

async function run() {
    const courses = await getCourses() 
    console.log(courses)
}
run()