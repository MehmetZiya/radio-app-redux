import mongoose from 'mongoose'

const favoriteSchema = mongoose.Schema({
  favID: { type: Number, required: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  imageURL: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
})

const Favorite = mongoose.model('Favorite', favoriteSchema)

export default Favorite
