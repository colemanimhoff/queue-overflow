const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const request = require('request')
const querystring = require('querystring')
const app = (module.exports = express())
const port = parseInt(process.env.PORT || 3001)
require('dotenv').config()

const users = require('./api/users')
const tags = require('./api/tags')
const problems = require('./api/problems')
const comments = require('./api/comments')
const tagsProblems = require('./api/tags_problems')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'))
app.use(cors({ origin: true, credentials: true }))

app.use('/users', users)
app.use('/problems', problems)
app.use('/comments', comments)
app.use('/tags', tags)
app.use('/problem/tags', tagsProblems)

app.get('/github_login', (req, res, next) => {
  const code = req.query.code

  if (!code) {
    return next()
  }

  request.post(
    'https://github.com/login/oauth/access_token',
    {
      form: {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      },
    },
    (err, response, body) => {
      const github = querystring.parse(body)
      res.cookie('galvanize-secrets-token', github.access_token)
      res.redirect('https://queue-overflow.firebaseapp.com')
    }
  )
})

app.use(notFound)
app.use(errorHandler)

function notFound(req, res, next) {
  const url = req.originalUrl
  if (!/favicon\.ico$/.test(url) && !/robots\.txt$/.test(url)) {
    console.error('[404: Requested file not found] ', url)
  }
  res.status(404).send({ error: 'Url not found', status: 404, url })
}

function errorHandler(err, req, res, next) {
  console.error('ERROR', err)
  const stack = process.env.NODE_ENV !== 'production' ? err.stack : undefined
  res.status(500).send({ error: err.message, stack, url: req.originalUrl })
}

app
  .listen(port)
  .on('error', console.error.bind(console))
  .on('listening', console.log.bind(console, 'Listening on ' + port))
