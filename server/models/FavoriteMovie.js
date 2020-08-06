const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteMovieSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    movieId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    poster_path: {
        type: String,
        required: true
    }
});

const FavoriteMovie = mongoose.model('favoriteMovie', FavoriteMovieSchema);

module.exports = FavoriteMovie;