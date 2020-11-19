const express = require('express');
const router = express.Router();
const Admin = require('../models/adminModel');

router.post('', function(req, res) {
    Admin.create(req.body).then(function (admin) {
        res.send(admin)
    });
});

module.exports = router