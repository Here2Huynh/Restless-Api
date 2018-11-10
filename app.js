
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello world!!!!!!')
})

app.get('/api/courses', (req , res) => {
    res.send([9,3,2,3,41,5,1,21,4,512,3,123,1222])
})

app.get('/api/courses/:id', (req , res) => {
    res.send(req.params.id)
})

app.get('/api/posts/:year/:month', (req , res) => {
    res.send(req.query)
    // params => '/:value'
    // query => '?query'
})

// PORT
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}`))

// export PORT=5000 to set process.env in terminal

// app.post()
// app.put()
// app.delete()
