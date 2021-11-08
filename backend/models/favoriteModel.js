import mongoose from 'mongoose'

const favoriteSchema = mongoose.Schema({
  favId: { type: Number, required: true },
  name: { type: String, required: true },
  classes: { type: String, required: true },
  imageURL: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
})

const Favorite = mongoose.model('Favorite', favoriteSchema)

export default Favorite
