const express = require('express')
const router = express.Router()
const queries = require('../db/commentQueries')
const knex = require('../db/database-connection')

function isValidId(request, response, next) {
    !isNaN(request.params.id)
        ? next()
        : next(new Error('Invalid ID'))
}

function validComment(submission) {
    const date = typeof submission.date == 'string' && submission.date.trim() != ''
    const commentText = typeof submission.comment_text == 'string' && submission.comment_text.trim() != ''
    return date && commentText
}

router.get('/', (request, response) => {
    return queries.list().then(comments => response.json(comments))
})

router.get('/:id', isValidId, (request, response) => {
    return queries.read(request.params.id)
        .then(comment => {
            if (comment) {
                return response.json(comment)
            } else {
                return response.status(404).send({ message: 'Comment not found!' })
            }
        })
})

router.post('/', (request, response, next) => {
    validComment(request.body)
        ? queries.create(request.body).then(comment => response.json(comment[0]))
        : next(new Error('Invalid comment!'))
})

router.put('/:id', isValidId, (request, response, next) => {
    validComment(request.body)
        ? queries.update(request.params.id, request.body)
            .then(comment => response.json(comment[0]))
        : next(new Error('Invalid Comment!'))
})

router.delete('/:id', isValidId, (request, response) => {
    return queries.delete(request.params.id).then(() => {
        return response.json({ message: 'Comment Deleted!' })
    })
})

module.exports = router