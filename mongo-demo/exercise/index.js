
const mongoose = require('mongoose')

// connect to db
mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
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
// async function getCourses() {
//     return await Course
//     .find({ isPublished: true, tags: 'backend' })
//     .sort( { name: 1 } )   // or .sort('name') or .sort('-name')
//     .select( { name: 1, author: 1 })  // or .select('name author')
// }

// async function getCourses2() {
//     return await Course 
//         // .find({ isPublished: true , tags: { $in: [ 'frontend', 'backend' ] } })
//         .find({ isPublished: true })
//         .or([ { tags: 'frontend'}, { tags: 'backend' }])
//         .sort({ price: -1 })
//         .select({ name: 1, author: 1, price: 1 })
// }

async function getCourses3() {
    return await Course 
        .find({ isPublished: true })
        .or([ 
            { price: { $gte: 15 } }, 
            { name: /.*by*./i }
        ])
        .sort('-price')
        .select('name author price')
}

async function run() {
    // const courses = await getCourses() 
    // console.log(courses)

    // const courses2 = await getCourses2()
    // console.log(courses2)

    const course3 = await getCourses3()
    console.log(course3)
}
run()