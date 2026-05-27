const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const {requireAuth} = require('../middlewares/authMiddleware');


router.get('/', requireAuth, async function (req, res, next) {
    try {
        const email = req.session.user.email;

        const blogs = await Blog.find({author:email}).sort({createdAt: -1});
        res.render('blogs', {email, blogs});
    } catch (err) {
        console.log(err);
        res.status(500).send('ბლოგების წამოღებისას მოხდა შეცდომა, გთხოვთ სცადოთ თავიდან.');
    }
});

router.get('/new-post', requireAuth, function (req, res, next) {
    const email = req.session.user.email;
    res.render('new-post', {email});
})

router.post('/create', requireAuth, async function (req, res, next) {
    try{
        const {title, description, message} = req.body;

        const newBlog = new Blog({
            title,
            description,
            message,
            author: req.session.user.email,
            tags: []
        })

        await newBlog.save();

        res.redirect('/blogs');
    }catch(err){
        console.log(err);
        res.status(500).send('პოსტის შენახვისას მოხდა შეცდომა.')
    }
})


module.exports = router;