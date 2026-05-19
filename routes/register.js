const express = require('express');
// const res = require("express/lib/response");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");


router.get('/', function (req, res, next) {
    res.render('register', { message: null });
});

router.post('/', async(req, res) => {
    try{
        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.render('register', {message: 'გთხოვთ შეავსოთ ყველა ველი'});
        }

        if (password.length < 8) {
            return res.render('register', {message: "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს"})
        }

        const existingUser = await User.findOne({$or:[{email}, {username}]});
        if (existingUser) {
            return res.render('register', {message: 'მომხმარებელი ამ მაილით ან სახელით უკვე რეგისტრირებულია'});
        }

        const newUser = new User({
            username: username,
            email: email,
            password: password,
        })

        await newUser.save();
        res.redirect('/');
    }catch(err){
        console.log(err);
        res.render('register', {message: 'რეგისტრაციის დროს დაფიქსირდა შეცდომა, გთხოვთ სცადოთ თავიდან.'});
    }
})
module.exports = router;
