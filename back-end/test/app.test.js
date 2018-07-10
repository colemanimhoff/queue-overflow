const request = require('supertest')
const knex = require('../db/database-connection')
const expect = require('chai').expect
const app = require('../index')
const fixtures = require('./fixtures')

describe('Queue Overflow', () => {
    before((done) => {
        knex.migrate.latest()
            .then(() => knex.seed.run())
            .then(() => done())
    })

    it('Lists All Users', (done) => {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('array')
                expect(response.body).to.deep.equal(fixtures.users)
                done()
            })
            .catch(error => console.log(error))
    })

    it('Show One User By ID', (done) => {
        request(app)
            .get('/users/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                expect(response.body).to.deep.equal(fixtures.users[0])
                done()
            })
            .catch(error => console.log(error))
    })

    it('Show Another User By ID', (done) => {
        request(app)
            .get('/users/4')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                expect(response.body).to.deep.equal(fixtures.users[3])
                done()
            })
            .catch(error => console.log(error))
    })

    it('Creates A User', (done) => {
        request(app)
            .post('/users')
            .send(fixtures.user)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                fixtures.user.id = response.body.id
                expect(response.body).to.deep.equal(fixtures.user)
                done()
            })
            .catch(error => console.log(error))
    })

    it('Updates A User', (done) => {
        fixtures.user.user_name = 'ninjames'
        request(app)
            .put('/users/6')
            .send(fixtures.user)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                fixtures.user.id = response.body.id
                expect(response.body).to.deep.equal(fixtures.user)
                done()
            })
            .catch(error => console.log(error))
    })

    it('Deletes A User', (done) => {
        request(app)
            .delete('/users/6')
            .send(fixtures.user)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                fixtures.user.id = response.body.id
                expect(response.body).to.deep.equal({ message: 'User Deleted!' })
                done()
            })
            .catch(error => console.log(error))
    })

    it('Lists All Tags', (done) => {
        request(app)
            .get('/tags')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('array')
                expect(response.body).to.deep.equal(fixtures.tags)
                done()
            })
            .catch(error => console.log(error))
    })

    it('Show One Tag By ID', (done) => {
        request(app)
            .get('/tags/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                expect(response.body).to.deep.equal(fixtures.tags[0])
                done()
            })
            .catch(error => console.log(error))
    })

    it('Show Another Tag By ID', (done) => {
        request(app)
            .get('/tags/2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                expect(response.body).to.deep.equal(fixtures.tags[1])
                done()
            })
            .catch(error => console.log(error))
    })

    it('Creates A Tag', (done) => {
        request(app)
            .post('/tags')
            .send(fixtures.tag)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                fixtures.tag.id = response.body.id
                expect(response.body).to.deep.equal(fixtures.tag)
                done()
            })
            .catch(error => console.log(error))
    })

    it('Updates A Tag', (done) => {
        fixtures.tag.tag_name = 'chai'
        request(app)
            .put('/tags/12')
            .send(fixtures.tag)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                fixtures.tag.id = response.body.id
                expect(response.body).to.deep.equal(fixtures.tag)
                done()
            })
            .catch(error => console.log(error))
    })

    it('Deletes A Tag', (done) => {
        request(app)
            .delete('/tags/12')
            .send(fixtures.tag)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                fixtures.tag.id = response.body.id
                expect(response.body).to.deep.equal({ message: 'Tag Deleted!' })
                done()
            })
            .catch(error => console.log(error))
    })

    it('Lists All Problems', (done) => {
        request(app)
            .get('/problems')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('array')
                expect(response.body).to.deep.equal(fixtures.problems)
                done()
            })
            .catch(error => console.log(error))
    })

    it('Show One Problem By ID', (done) => {
        request(app)
            .get('/problems/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                expect(response.body).to.deep.equal(fixtures.problems[0])
                done()
            })
            .catch(error => console.log(error))
    })

    it('Show Another Problem By ID', (done) => {
        request(app)
            .get('/problems/2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                expect(response.body).to.deep.equal(fixtures.problems[1])
                done()
            })
            .catch(error => console.log(error))
    })

    it('Creates A Problem', (done) => {
        request(app)
            .post('/problems')
            .send(fixtures.problem)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                fixtures.problem.id = response.body.id
                expect(response.body).to.deep.equal(fixtures.problem)
                done()
            })
            .catch(error => console.log(error))
    })

    it('Updates A Problem', (done) => {
        fixtures.problem.problem_title = 'React Form Problems'
        request(app)
            .put('/problems/3')
            .send(fixtures.problem)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                fixtures.problem.id = response.body.id
                expect(response.body).to.deep.equal(fixtures.problem)
                done()
            })
            .catch(error => console.log(error))
    })

    it('Deletes A Problem', (done) => {
        request(app)
            .delete('/problems/3')
            .send(fixtures.problem)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                fixtures.problem.id = response.body.id
                expect(response.body).to.deep.equal({ message: 'Problem Deleted!' })
                done()
            })
            .catch(error => console.log(error))
    })

    it('Lists All Comments', (done) => {
        request(app)
            .get('/comments')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('array')
                expect(response.body).to.deep.equal(fixtures.comments)
                done()
            })
            .catch(error => console.log(error))
    })

    it('Show One Comment By ID', (done) => {
        request(app)
            .get('/comments/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                expect(response.body).to.deep.equal(fixtures.comments[0])
                done()
            })
            .catch(error => console.log(error))
    })

    it('Creates A Comment', (done) => {
        request(app)
            .post('/comments')
            .send(fixtures.comment)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                fixtures.comment.id = response.body.id
                expect(response.body).to.deep.equal(fixtures.comment)
                done()
            })
            .catch(error => console.log(error))
    })

    it('Updates A Comment', (done) => {
        fixtures.comment.comment_text = 'Check your migrations'
        request(app)
            .put('/comments/2')
            .send(fixtures.comment)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                fixtures.comment.id = response.body.id
                expect(response.body).to.deep.equal(fixtures.comment)
                done()
            })
            .catch(error => console.log(error))
    })

    it('Deletes A Comment', (done) => {
        request(app)
            .delete('/comments/2')
            .send(fixtures.problem)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.be.a('object')
                fixtures.comment.id = response.body.id
                expect(response.body).to.deep.equal({ message: 'Comment Deleted!' })
                done()
            })
            .catch(error => console.log(error))
    })
})