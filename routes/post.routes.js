const express = require('express')
const router = express.Router()
const post = require('../models/post.model')
const m = require('../helper/middleware')

module.exports = router