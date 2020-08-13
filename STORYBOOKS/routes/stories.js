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
        .catch(err => {
            console.log(err);
            res.render('error/500')
        })
})

router.get('/:id', authMid.ensureAuth, (req, res) => {
    Story.findOne({ _id: req.params.id })
        .populate('user').lean()
        .then(story => {
            if (!story) {
                return res.render('error/404')
            }
            res.render('stories/show', {
                story: story
            })
        })
        .catch(err => {
            console.log(err);
            res.render('error/404')
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
        .catch(err => {
            console.log(err);
            res.render('error/500')
        })
})

router.put('/:id', authMid.ensureAuth, (req, res) => {
    Story.findOne({ _id: req.params.id }).lean()
        .then(story => {
            if (!story) {
                return res.render('error/404')
            }
            if (story.user != req.user.id) {
                res.redirect('/stories')
            } else {
                Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
                    new: true,
                    runValidators: true
                })
                    .then(newStory => {
                        story = newStory;
                        res.redirect('/dashboard')
                    })
                    .catch(err => {
                        console.log(err);
                        res.render('error/500')
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.render('error/500')
        })
})


router.post('/delete/:id', authMid.ensureAuth, (req, res) => {
    Story.remove({ _id: req.params.id })
        .then(result => {
            res.redirect('/dashboard')
        })
        .catch(err => {
            console.log(err);
            res.render('error/500')
        })
})

router.get('/user/:userId', authMid.ensureAuth, (req, res) => {
    Story.find({ user: req.params.userId, status: 'public' })
        .populate('user').lean()
        .then(stories => {
            res.render('stories/index', {
                stories: stories
            })
        })
        .catch(err => {
            console.log(err);
            res.render('error/500')
        })
})


module.exports = router;
