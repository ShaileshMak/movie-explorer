const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const users = require('./routes/api/users');
const favoriteMovies = require('./routes/api/favoriteMovies');
const key = require('./config/key');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//mongoDB configuration
const db = key.MONGO_DB_URI;
mongoose.connect(db, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
     }
    )
    .then(() => console.log('DB connected!!'))
    .catch(error => console.log(`Error connecting MongoDB!! ${error}`));

//configur routes
app.use('/api/users/', users);
app.use('/api/favorite/', favoriteMovies);

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log(`Server started on port ${PORT}`);
})