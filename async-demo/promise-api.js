
// settled promises
// const p = Promise.resolve({ id: 1 })
// p.then(result => console.log(result))

// const p = Promise.reject(new Error('reason for rejection...'))
// p.catch(err => console.log(err))

// better to use native error obj because it returns the callstack


// parellel promises
// thread kicks off the operations in order and then goes into the next one
const p1 = new Promise( (resolve, reject) => {
    setTimeout( () => {
        console.log('Async operation 1...')
        // reject(new Error('something done goofed...'))
        resolve(1)
    }, 2000)
})

const p2 = new Promise( (resolve) => {
    setTimeout( () => {
        console.log('Async operation 2...')
        resolve(2)
    }, 5000)
})

// Promise.all([p1,p2])
//     .then(result => console.log(result))  // will be available as an array
//     .catch(error => console.log(error.message)) // if any error, the whole promise.all is rejected

// when you don't want to wait for all to complete
Promise.race([p1,p2])
    .then(result => console.log(result))  
    .catch(error => console.log(error.message)) 