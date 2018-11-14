
const debug = require('debug')('app:startup')
const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const Joi = require('joi')
const logger = require('./middleware/logger')
const authenicater = require('./middleware/authenticator')
const courses = require('./routes/courses')
const homePage = require('./routes/homePage')

const express = require('express')
const app = express()

// configuration
console.log('Application Name: ' + config.get('name'))
console.log('Mail Server: ' + config.get('mail.host'))
// console.log('Mail Password: ' + config.get('mail.password'))

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`) //return environment of the app, if not set it will be undefined

// console.log(`app: ${app.get('env')}`) // returns development by default

if ( app.get('env') === 'development' ) {
    app.use(morgan('tiny'))
    debug('Morgan enabled...')  // more insighful console.log()
}

// templating engine, usually use if we decide to return a view for the web service 
app.set('view engine', 'pug')
app.set('views', './views') // default //option setting


// adding middleware to process the req body
app.use(express.json()) // parses req.body
app.use(express.urlencoded({ extended: true })) // key=value&key=value
app.use(express.static('public'))
app.use(helmet())
app.use('/api/courses', courses) // any endpoint using that endpoint, use that router
app.use('/', homePage)


// use middleware
app.use(logger)
app.use(authenicater)




// PORT
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}`))

// export PORT=5000 to set process.env in terminal

// app.post()
// app.put()
// app.delete()
