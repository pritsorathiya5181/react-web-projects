const express = require('express');
const authMid = require('../middleware/auth');

const Story = require('../models/Story');

const router = express.Router();

router.get('/', authMid.ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    });
});

router.get('/dashboard', authMid.ensureAuth, (req, res) => {
    // console.log(req.user)
    Story.find({ user: req.user.id }).lean()
        .then(stories => {
            res.render('dashboard', {
                name: req.user.firstName,
                stories
            });
        })
        .catch(err => {
            console.log(err);
            res.render('error/500')
        })

});

module.exports = router;