import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Favorite from '../models/favoriteModel.js'

export const addFavoriteToUser = asyncHandler(async (req, res) => {
  const { favId, name, classes, imageURL } = req.body
  console.log(req.user)
  let userAddFav = await User.findById(req.user._id)
  if (userAddFav) {
    const alreadyAdded = userAddFav.favList.find((f) => f.favId === favId)
    if (alreadyAdded) {
      res.status(400)
      throw new Error('Already added!')
    }
  }

  const favorite = new Favorite({
    favId: Number(favId),
    name,
    classes,
    imageURL,
  })

  const createdFav = await favorite.save()

  res.status(201).json(createdFav)
})
