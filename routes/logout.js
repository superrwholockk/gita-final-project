const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    req.session.destroy((err) => {
        if (err) return next(err);
        res.redirect('/login');
    });
});

module.exports = router;