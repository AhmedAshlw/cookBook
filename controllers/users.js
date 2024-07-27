const express = require('express')
const Community = express.Router()

const User = require('../models/user')

Community.get('/index', async (req, res) => {
    const users = await User.find({});
    res.render('users/index.ejs', { users })
})

router.get('/:userId/users/:foodId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const food = currentUser.foods.id(req.params.foodsId)
    res.render('users/show.ejs', { user, food })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}) //IT DIDN'T WORK .. I tried alot of possibilities

module.exports = Community