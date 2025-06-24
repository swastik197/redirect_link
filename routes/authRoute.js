const express = require('express')
const route = express.Router()
const {signup, login, getLogin} = require('../controllers/authcontroller')

route.get('/login', getLogin)
route.post('/signup', signup)
route.post('/login', login)
module.exports = route