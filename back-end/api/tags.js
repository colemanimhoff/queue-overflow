const express = require('express')
const router = express.Router()
const queries = require('../db/tagQueries')
// const knex = require('../db/database-connection')

function isValidId(request, response, next) {
    !isNaN(request.params.id)
        ? next()
        : next(new Error('Invalid ID'))
}

function validTag(submission) {
    const tag = typeof submission.tag_name == 'string' && submission.tag_name.trim() != ''
    return tag
}

router.get('/', (request, response) => {
    return queries.list().then(tags => response.json(tags))
})

router.get('/:id', isValidId, (request, response) => {
    return queries.read(request.params.id)
        .then(tag => {
            if (tag) {
                return response.json(tag)
            } else {
                return response.status(404).send({ message: 'Tag not found!' })
            }
        })
})

router.post('/', (request, response, next) => {
    validTag(request.body)
        ? queries.create(request.body).then(tag => response.json(tag[0]))
        : next(new Error('Invalid Tag!'))
})

router.put('/:id', isValidId, (request, response, next) => {
    validTag(request.body)
        ? queries.update(request.params.id, request.body)
            .then(tag => response.json(tag[0]))
        : next(new Error('Invalid Tag!'))
})

router.delete('/:id', isValidId, (request, response) => {
    return queries.delete(request.params.id).then(() => {
        return response.json({ message: 'Tag Deleted!' })
    })
})

module.exports = router