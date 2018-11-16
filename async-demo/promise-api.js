
// settled promises
// const p = Promise.resolve({ id: 1 })
// p.then(result => console.log(result))

const p = Promise.reject(new Error('reason for rejection...'))
p.catch(err => console.log(err))

// better to use native error obj because it returns the callstack