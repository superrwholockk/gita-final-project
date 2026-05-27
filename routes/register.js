const express = require('express');
const res = require("express/lib/response");
const router = express.Router();
const User = require("../models/User");


router.get('/', function (req, res, next) {
    res.render('register', { message: null });
});

router.post('/', async(req, res) => {
    const {email, password, confirmPassword} = req.body;

    // if (!username || !email || !password) {
    //     return res.render('register', {message: 'გთხოვთ შეავსოთ ყველა ველი'});
    // }

    if (password.length < 8) {
        return res.render('register', {message: "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს"})
    }

    if (password !== confirmPassword) {
        return res.render('register', {message: 'პაროლები არ ემთხვევა ერთმანეთს'});
    }

    try {
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.render('register', {message: 'მომხმარებელი ამ მაილით ან სახელით უკვე რეგისტრირებულია'});
        }

        const newUser = new User({
            email,
            password
        });

        await newUser.save();
        req.session.user = {email};

        res.redirect('/blogs');
    }catch(err){
        console.log(err);
        res.render('register', {message: 'რეგისტრაციის დროს დაფიქსირდა შეცდომა, გთხოვთ სცადოთ თავიდან.'});
    }
})
module.exports = router;
