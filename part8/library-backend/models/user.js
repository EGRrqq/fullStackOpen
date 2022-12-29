const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 8,
        unique: true,
    },
    favouriteGenre: String,
})

module.exports = mongoose.model('User', schema)