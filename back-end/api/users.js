const express = require('express')
const router = express.Router()
const queries = require('../db/userQueries')
const knex = require('../db/database-connection')

function isValidId(request, response, next) {
    !isNaN(request.params.id)
        ? next()
        : next(new Error('Invalid ID'))
}

function validUser(submission) {
    const userName = typeof submission.user_name == 'string' && submission.user_name.trim() != ''
    return userName
}

router.get('/', (request, response) => {
    return queries.list().then(users => response.json(users))
})

router.get('/:id', isValidId, (request, response) => {
    return queries.read(request.params.id)
        .then(user => {
            if (user) {
                return response.json(user)
            } else {
                return response.status(404).send({ message: 'User not found!' })
            }
        })
})

router.get('/problems/:id/', (request, response, next) => {
    return knex('problem').innerJoin('users', 'users.id', 'problem.users_id')
        .where('problem.id', request.params.id)
        .then(problem => {
            if (problem) {
                return response.json(problem)
            } else {
                return response.status(404).send({ message: 'Problem doesn\'t exist!' })
            }
        })
})

router.post('/', (request, response, next) => {
    validUser(request.body)
        ? queries.create(request.body).then(users => response.json(users[0]))
        : next(new Error('Invalid User!'))
})

router.put('/:id', isValidId, (request, response, next) => {
    validUser(request.body)
        ? queries.update(request.params.id, request.body)
            .then(users => response.json(users[0]))
        : next(new Error('Invalid User!'))
})

router.delete('/:id', isValidId, (request, response) => {
    return queries.delete(request.params.id).then(() => {
        return response.json({ message: 'User Deleted!' })
    })
})

module.exports = router