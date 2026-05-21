const express = require('express');
const res = require("express/lib/response");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


router.get('/', function (req, res, next) {
    res.render('login', {message: ""});
});
router.post('/', async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if (!existingUser) {
            return res.render('login', {message: "მომხმარებელი ვერ მოიძებნა"});
        }

        if (!bcrypt.compareSync(password, existingUser.password)) {
            return res.render('login', {message: "მითითებული ელფოსტა ან პაროლი არასწორია"});
        }

        req.session.user = {email};

        return res.redirect('blog');
    } catch (err) {
        console.log(err);
        res.render('login', {message: 'ავტორიზაციის დროს დაფიქსირდა შეცდომა, გთხოვთ სცადოთ თავიდან.'});
    }


    res.render('login', {message: ""});

})
module.exports = router;
