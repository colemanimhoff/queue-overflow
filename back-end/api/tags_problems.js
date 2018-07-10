const express = require('express')
const router = express.Router()
const queries = require('../db/tags_problemQueries')
const knex = require('../db/database-connection')

//implement middleware to handle edge cases on the front end

// function validIds(submission) {
//     const problemId = !isNaN(submission.problem_id)
//     const tagId = !isNaN(submission.tag_id)
//     return tagId && problemId
// }

//finalize preferred join for tags and problems

router.get('/', (request, response, next) => {
    return knex('problem')
        .join('tag_problem', 'tag_problem.problem_id', 'problem.id')
        .join('tag', 'tag_problem.tag_id', 'tag.id')
        .select(
            // 'problem.id as problem_id',
            // 'tag.id as tag_id'
        )
        .then(tags => {
            if (tags) {
                return response.json(tags)
            } else {
                return response.status(404).send({ message: 'No Tags Found!' })
            }
        })
})

router.post('/', (request, response, next) => {
    request.body
        ? queries.create(request.body).then(tag => response.json(tag[0]))
        : next(new Error('Invalid Tag!'))
})

module.exports = router