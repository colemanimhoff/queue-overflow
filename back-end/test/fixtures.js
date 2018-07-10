const users = [
    {
        id: 1,
        user_name: 'colemanimhoff',
    },
    {
        id: 2,
        user_name: 'sean-blattenberger',
    },
    {
        id: 3,
        user_name: 'ebectar',
    },
    {
        id: 4,
        user_name: 'santa505',
    },
    {
        id: 5,
        user_name: 'steventalking',
    },
]

const tags = [
    {
        id: 1,
        tag_name: 'html',
    },
    {
        id: 2,
        tag_name: 'css',
    },
    {
        id: 3,
        tag_name: 'javascript',
    },
    {
        id: 4,
        tag_name: 'node.js',
    },
    {
        id: 5,
        tag_name: 'react.js',
    },
    {
        id: 6,
        tag_name: 'vue.js',
    },
    {
        id: 7,
        tag_name: 'express.js',
    },
    {
        id: 8,
        tag_name: 'knex.js',
    },
    {
        id: 9,
        tag_name: 'postgresql',
    },
    {
        id: 10,
        tag_name: 'DOM',
    },
    {
        id: 11,
        tag_name: 'cypress',
    },
]

const problems = [
    {
        id: 1,
        users_id: 1,
        date: '2018-06-11T06:00:00.000Z',
        problem_title: 'Re-rendering components when state changes',
        problem_text: 'When I create a post request, my parent component does not re-render. How do I do that without moving my post request function up to the parent component',
        problem_solved: true,
    },
    {
        id: 2,
        users_id: 2,
        date: '2018-06-11T06:00:00.000Z',
        problem_title: 'Foreign key constraint cannot be implemented with Knex',
        problem_text: 'Attempting to knex migrate:latest and keep getting the same error: Foreign key constraint cannot be implemented with Knex',
        problem_solved: false,
    },

]

const comments = module.exports = [
    {
        id: 1,
        problem_id: 1,
        user_id: 3,
        date: '2018-06-11T06:00:00.000Z',
        comment_text: 'Put a helper function in the parent component!',
        points: 1,
    },

]

const user = {
    id: 6,
    'user_name': 'kcoberly',
}

const tag = {
    id: 12,
    tag_name: 'mocha',
}

const problem = {
    id: 3,
    users_id: 3,
    date: '2018-06-11T06:00:00.000Z',
    problem_title: 'React Forms',
    problem_text: 'React forms... DUH',
    problem_solved: true,
}

const comment = {
    id: 2,
    problem_id: 2,
    user_id: 1,
    date: '2018-06-11T06:00:00.000Z',
    comment_text: 'Have you tried breaking your computer?',
    points: 1,
}

module.exports = {
    users,
    user,
    tags,
    tag,
    problems,
    problem,
    comments,
    comment,
}