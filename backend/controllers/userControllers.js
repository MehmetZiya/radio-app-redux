import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      channelfavs: user.channelfavs,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/v1/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    username,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      channelfavs: user.channelfavs,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Update user
// @route   PUT /api/users
// @access  Private
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.username = req.body.username || user.username
    user.password = req.body.password

    if (!req.body.password || req.body.password.length === 3) {
      res.status(404)
      throw new Error('Invalid password')
    }

    await user.save()
    res.json({
      success: 'User updated!',
    })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

// @desc    Add Channel or Program to fav
// @route   POST /api/users/favList
// @access  Private
export const addToFav = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const { favId, classes, name, image } = req.body
  if (user) {
    const alreadyAdded = user.channelfavs.find(
      (fav) => fav.favId === Number(favId)
    )

    if (alreadyAdded) {
      console.log(alreadyAdded)
      res.status(400)
      throw new Error('Already added!')
    }
    const favChannel = {
      favId,
      classes,
      name,
      image,
    }

    user.channelfavs.push(favChannel)
    await user.save()
    res.status(201).json({ success: 'favorite added' })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

// @desc    Delete Channel or Program to fav
// @route   DELETE /api/users/favList
// @access  Private
export const deleteFav = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user._id)
  const { favId } = req.body
  if (user) {
    const deletedFav = user.channelfavs.find((f) => f._id.toString() === favId)
    console.log(deletedFav)
    await user.channelfavs.pull(deletedFav._id)

    await user.save()

    res.status(201).json({ success: 'favorite deleted' })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

// @desc    Get Favorite Channel or Program
// @route   GET /api/users/favList
// @access  Private
export const getFav = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user._id)
  if (user) {
    res.status(201).json(user.channelfavs)
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})
