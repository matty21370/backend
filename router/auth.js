const router = require('express').Router();
const User = require('../model/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/test', (req, res) => {
    res.send("Hello");
});

router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hashed) => {
        if(err) {
            res.send(err);
        } else {
            const user = new User({
                username: req.body.username,
                password: hashed
            });

            try {
                user.save();
                res.send(user);
            } catch {
                res.sendStatus(400);
            }
        }
    });
});

router.post('/login', (req, res) => {
    console.log("Login request recieved");
    const userName = req.body.username;
    const password = req.body.password;

    if(userName && password) {
        User.findOne({username: userName}, (err, user) => {
            if(err) {
                res.send(err);
            } else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if(result === true) {
                        res.send(user);
                    } else {
                        res.send("Invalid password");
                    }
                });
            }
        });
    }
});

module.exports = router;