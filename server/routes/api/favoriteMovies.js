const app = require('express');
const router = app.Router();
const jwt = require('jsonwebtoken');

const FavoriteMovie = require('../../models/FavoriteMovie');
const key = require('../../config/key');

//@route Get api/favorite
//@des Get Favorite Movies
//@access Public

router.get('/', verifyToken, (req, resp) => {
    FavoriteMovie.find({
        userName: req.body.userName
    })
    .then(movies => {
        resp.json({movies})
    }).catch(error => resp.status(401).json('ERROR'));
});

//@route Post api/favorite/add
//@des Add Favorite Movie
//@access Public

router.post('/add', verifyToken, (req, resp) => {
    console.log('req.body: ',req.body);
    const favoriteMovie = new FavoriteMovie(req.body);
    FavoriteMovie.find({
        userName: favoriteMovie.userName,
        movieId: favoriteMovie.movieId,
    }).then(movies => {
        console.log(movies);
        if(movies.length) {
            const message = 'Movie Already added';
            console.log(message);
            resp.status(401).json(message);
        }else {
            favoriteMovie.save()
                .then(movie => resp.json({movie}))
                .catch(err => {
                    const message = 'Problem adding favorite movie';
                    console.log(message);
                    resp.status(401).json(message)
                });
        }
    }).catch(error => {
        const message = 'ERROR';
        console.log(error);
        resp.status(401).json('ERROR')
    });
});


//@route Post api/favorite/add
//@des Add Favorite Movie
//@access Public

router.post('/remove', verifyToken, (req, resp) => {
    const favoriteMovie = req.body;
    FavoriteMovie.findOneAndDelete({
        userName: favoriteMovie.userName,
        movieId: favoriteMovie.movieId
    })
        .then(movie => {
            console.log(`Removed movie ${movie.title}`);
            resp.json(`Removed movie ${movie.title}`);
        }).catch(error => resp.status(401).json('Couldn\'t find the movie'));
});

function verifyToken(req, res, next) {
    //next();
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, key.JWT_SECRET_KEY)
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    console.log('verifyToken:--payload', payload);
    req.body.userName = payload.subject
    next()
  }

module.exports = router;