
const express = require('express')
const router = express.Router()


const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
]



router.get('/', (req , res) => {
    res.send(courses)
})

// POST
router.post('/', (req,res) => {
    const { error } = validateCourse(req.body)

    if ( error ) return res.status(400).send(error.details[0].message)
 

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

// PUT = updating resources
router.put('/:id', (req, res) => {
    // look up the course
    // if it doesn't exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if ( !course ) return res.status(404).send('The course with the given ID was not found.')
 
    // validate
    // if invalid, return 400 - Bad request
    // const result = validateCourse(req.body)
    const { error } = validateCourse(req.body) // result.error 

    if ( error ) return res.status(400).send(error.details[0].message)
  

    // update course 
    // return the updated course
    course.name = req.body.name
    res.send(course)
})


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)
}

router.delete('/:id', (req,res) => {
    // look up the course
    // if doesn't exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if ( !course ) return res.status(404).send('The course with the given ID was not found.')

    // delete
    const index = courses.indexOf(course)
    courses.splice(index,1)

    // return the same course
    res.send(course)
})


router.get('/:id', (req , res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found.')
    res.send(course)
})

// app.get('/api/posts/:year/:month', (req , res) => {
//     res.send(req.query)
//     // params => '/:value'
//     // query => '?query'
// })

module.exports = router;
