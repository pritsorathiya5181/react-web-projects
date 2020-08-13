const express = require('express');
const authMid = require('../middleware/auth');

const Story = require('../models/Story');

const router = express.Router();

router.get('/add', authMid.ensureAuth, (req, res) => {
    res.render('stories/add');
});

router.post('/', authMid.ensureAuth, (req, res) => {
    req.body.user = req.user.id
    Story.create(req.body)
        .then(result => {
            res.redirect('/dashboard')
        })
        .catch(err => {
            console.log(err);
            res.render('error/500')
        })
})

module.exports = router;
