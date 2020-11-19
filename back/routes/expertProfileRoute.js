const express = require('express');
const router = express.Router();
const Profile = require('../models/expertProfileModel');
const Expert = require('../models/expertModel');

router.get('', function(req, res, next) {
    Profile.find().then(function(profiles) {
        res.send(profiles)
    })
})
router.get('/:id', function (req, res, next) {
    id = req.params.id;
    Profile.findOne({ _id: req.params.id }, req.body).then(function(err, profile) {
        console.log(profile);
        if (!profile) {
            res.json({
                msg: `profile with id "${id}" doesn't exist !`,
                err: err
            })
        }else {
            res.json({
                msg: "profile found successfuly !",
                profile: profile,
                err: err
            })
        }
    })
})
router.post('', function(req, res, next) {
    Profile.create(req.body).then(function(profile) {
        res.json({
            msg: "profile created successfuly !",
            profile: profile,
            next: next()
        })
    })
})

router.put('/:id', function (req, res, next) {
    id = req.params.id;
    Profile.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function(err, profile) {
        console.log(profile);
        res.json({
            msg: "profile updated successfuly !",
            profile: profile,
            err: err
        })
    })
})

module.exports = router