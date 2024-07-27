const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    res.render('foods/index.ejs', {
      foods: currentUser.foods,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/new', async (req, res) => {
  res.render('foods/new.ejs')
})

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    currentUser.foods.push(req.body)
    await currentUser.save()
    res.redirect(`/users/${currentUser._id}/foods`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:foodsId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const food = currentUser.foods.id(req.params.foodsId)
    res.render('foods/show.ejs', {
      food,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.delete('/:foodsId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    currentUser.foods.id(req.params.foodsId).deleteOne()
    await currentUser.save()
    res.redirect(`/users/${currentUser._id}/foods`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:foodsId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const food = currentUser.foods.id(req.params.foodsId)
    res.render('foods/edit.ejs', { food })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put('/:foodsId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.foods.id(req.params.foodsId);

    food.set(req.body);
    await currentUser.save();

    res.redirect(
      `/users/${currentUser._id}/foods/${req.params.foodsId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

module.exports = router