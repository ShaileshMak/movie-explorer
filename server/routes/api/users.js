const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const key = require('../../config/key');

//@route Post api/users/register
//@des Register users
//@access Public

router.post('/register', (req, resp) => {
    const user = new User(req.body)
    user.save()
        .then(user => {
            let token = setToken(user);
            resp.json({token})
        })
});

//@route Post api/users/login
//@des Login user
//@access Public

router.post('/login', (req, resp) => {
    const data = req.body;
    console.log(data)
    User.findOne({userName: data.userName})
        .then(user => {
            if(user ) {
                if(user.userName === data.userName && user.password === data.password){
                    let token = setToken(user);
                    resp.json({token})
                } else if(user.userName !== data.userName) {
                    resp.status(401).json('Invalid user name')
                } else if(user.password !== data.password) {
                    resp.status(401).json('Invalid PassWord')
                }
            } else {
                resp.status(401).json('Invalid user name or password')
            }
            
        })
        .catch(error => console.log(error));
});

router.post('/authorise', (req, resp) => {
    const data = req.body;
    console.log(data)
    User.findOne({userName: data.userName})
        .then(user => {
            if(user ) {
                if(user.userName === data.userName && user.password === data.password){
                    let token = setToken(user);
                    resp.json({token})
                } else if(user.userName !== data.userName) {
                    resp.status(401).json('Invalid user name')
                } else if(user.password !== data.password) {
                    resp.status(401).json('Invalid PassWord')
                }
            } else {
                resp.status(401).json('Invalid user name or password')
            }
            
        })
        .catch(error => console.log(error));
});

module.exports = router;

function setToken(user) {
    let payLoad = { subject: user.userName };
    console.log('payLoad: ---- --- ', payLoad);
    let token = jwt.sign(payLoad, key.JWT_SECRET_KEY);
    return token;
}
