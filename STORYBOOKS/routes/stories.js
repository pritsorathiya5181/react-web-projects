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

router.get('/', authMid.ensureAuth, (req, res) => {
    Story.find({ status: 'public' })
        .populate('user')
        .sort({ createdAt: 'desc' })
        .lean()
        .then(stories => {
            res.render('stories/index', {
                stories: stories
            })
        })
})

module.exports = router;
