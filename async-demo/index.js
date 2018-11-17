console.log('Before')
// const user = getUser(1, getRepositories)


// async and await, just syntaxical sugar, but just Promises that looks synchronously
// when using await, need to decorate with async
async function displayCommits() {
    try {
        const user = await getUser(1)
        const repos = await getRepositories(user.gitHubUsername)
        const commits = await getCommits(repos[0])
    }
    catch (err) {
        console.log('Error', err.message)
    }
    console.log(commits)
}
displayCommits()


console.log('After')

// callback approach using named functions
// function displayRepo(user) {
//     getRepositories(user.gitHubUsername, displayCommits)
// }

// function displayCommits(repo) {
//     console.log(repo)
//     getCommits(repo, displayCommits)
// }

// function displayCommits(commits) {
//     console.log(commits)
// }

// promises approach 
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos))
//     .then(commits => console.log('Commits', commits))
//     .catch(err => console.log('Error', err.message))



function getUser(id) {
    return new Promise((resolve, reject) => {
        // async work
        setTimeout( () => {
            console.log('Reading a user from a database...')
            resolve({ id: id, gitHubUsername: 'john' })
        }, 2000)
    })
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            console.log(`Reading ${username}'s repositories...`)
            resolve([ 'repo1', 'repo2', 'repo3' ])
            // reject(new Error('Could not get the repos.'))
        }, 2000)
    })
}

function getCommits(repo) {
    return new Promise((resolve,reject) => {
        setTimeout( () => {
            console.log('Calling GitHub API...')
            resolve(['commit'])
        }, 2000)
    })
}

// Before
// After
// 'Reading a user from a database...'

// async does not mean multi-threaded 
// simply non blocking    


// way JS handles async
// callbacks
// promises
// async/await