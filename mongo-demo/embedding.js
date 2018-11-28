
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // const course = await Course.findByIdAndUpdate(courseId, {
  //   $set: {
  //     'author.name': 'John Huynh'
  //   }},
  //   { new: true }
  // )
  // console.log(course)
  // const course = await Course.findById(courseId)
  const course = await Course.update({ _id: courseId },{
    // $set: {
    //   'author.name': 'John Smith'
    // },
    $unset: {
      'author': ''
    }
  })
  // course.author.name = 'John Doe'
  // course.save()
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId)
  course.authors.push(author)
  course.save()
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId)
  const author = course.authors.id(authorId)
  author.remove()
  course.save()
}

removeAuthor('5bfe27cb8984e5b82894120a', '5bfe2932233fdbbfc0b843d9')

// addAuthor('5bfe27cb8984e5b82894120a', new Author({ name: 'Amy' }))

// createCourse('Node Course', [
//   new Author({ name: 'Mosh' })
//   new Author({ name: 'John' })
// ])

// updateAuthor('5bfc9ec3ad8f2c00b169e150')


// these sub docs can not be saved on their own
