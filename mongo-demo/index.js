
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

// schema is specific to mongoose
const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/

    },
    category: {
        type: String,
        require: true,
        enum: [ 'web', 'mobile', 'network' ] // valid strings in the given list 
    },
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: { 
        type: Number, 
        required: function() { return this.isPublished },
        min: 10,
        max: 200 
    }
})

// objs are an instance of the class, class is a blueprint for the obj 

const Course = mongoose.model('Course', courseSchema) // class 

// create document
async function createCourse() {
    const course = new Course({
        name: 'React.js Course',
        category: '-', 
        author: 'Mosh',
        tags: [ 'react', 'frontend' ],
        isPublished: true,
        price: 15
    }) // obj
    
    try {
        // await course.validate()  // manually validate the promise 
        // NOTE: mongodb does not care for missing props, so we need to be cautious of validation
        // use Joi + mongoose validation to ensure validatity 
        const result = await course.save() // async op, because it accessing the fs and db 
        console.log(result)
    }
    catch (ex) {
        console.log(ex.message)
    }

}
createCourse()


// querying documents 
async function getCourses() {
    // comparison operators 
    // eq ===
    // ne !==
    // gt >
    // gte >=
    // lt <
    // lte <=
    // in
    // nin (not in)

    // logical operators
    // or 
    // and 

    const courses = await Course
        // comparison operators 
        // .find({ price: { $gt: 10, $lte: 20 } })   // to express comparison, we need to pass objs with $
        // .find({ price: { $in: [ 10, 15, 20 ] }})

        // logical operators 
        // .find()
        // .or([ { author: 'Mosh' }, { isPublished: true } ])
        // .and([ { author: 'Mosh' }, { isPublished: true } ])

        // regular expression
        // starts with Mosh
        // .find({ author: /^Mosh/ })
        // ends with Hamedani
        // .find({ author: /Hamedani$/i })  // by default it will be case sensitive, i = case INsensitive 

        // contains Mosh 
        // .find({ author: /.*Mosh*/i }) // wildcards

        // const pageNumber = 2
        // const pageSize = 10
        // // /api/courses?pageNumber=2&pageSize=10
        // .skip((pageNumber - 1 ) * pageSize) //pagination 
        // .limit(pageSize)

        .find({ author: 'Mosh', isPublished: true })  // filtering 
        .limit(10)
        .sort({ name: 1 })  // 1 is ascending, -1 is descending 
        // .select({ name: 1, tags: 1 })  // select props to be returned 
        .count() 
    console.log(courses)
}

// getCourses()

async function updateCourse(id) {
    // approach: query first
    // findById()
    // modify its properties
    // save()
    // const course = await Course.findById(id)
    // if (!course) return;
    // course.isPublished = true
    // course.author = 'Another author'
    // // course.setOptions({
    // //     isPublished: true,
    // //     author: 'Another author'
    // // })
    // const result = await course.save()
    // console.log(result)

    // approach: update first
    // update directly
    // optionally: get the updated document 
    // const result = await Course.update({ _id: id}, {
    //     $set: {
    //         author: 'Mosh',
    //         isPublished: false
    //     }
    // })
    // console.log(result)

    // if you want to get the doc that was updated
    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason',
            isPublished: false
        }
    }, { new: true })
    console.log(result)
}

// updateCourse('5befbeef4bbe070d76c63bbb')

async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id })  //deleteMany to delete more than one
    const course = Course.findByIdAndRemove(id)
    console.log(course)
}
// removeCourse('5befbeef4bbe070d76c63bbb')

