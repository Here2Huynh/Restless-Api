
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to mongoDB...'))
    .catch((error) => console.log('Could not connect to mongoDB...', error))

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}))

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}))

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    })

    const result = await author.save()
    console.log(result)
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    })

    const result = await course.save()
    console.log(result)
}

async function listCourses() {
    const courses = await Course
        .find()
        .populate('author', 'name -_id')
        .populate('category', 'name')
        .select('name author')
    console.log(courses)
}

// createAuthor('Mosh', 'My Bio', 'My Website')

// createCourse('Node Course', '5bfc99c37eb0b96a36b1be32')

listCourses();