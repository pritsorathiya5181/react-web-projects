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

router.get('/edit/:id', authMid.ensureAuth, (req, res) => {
    Story.findOne({ _id: req.params.id }).lean()
        .then(story => {
            if (!story) {
                return res.render('error/404')
            }
            if (story.user != req.user.id) {
                res.redirect('/stories')
            } else {
                res.render('stories/edit', {
                    story: story
                })
            }
        })
})

module.exports = router;
