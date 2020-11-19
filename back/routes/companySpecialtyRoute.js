const express = require('express');
const router = express.Router();
const CompanySpecialty = require('../models/companySpecialtyModel');

router.get('/', function (req, res) {
    CompanySpecialty.find()
        // .select('-_id -__v')
        .then(function (specialty) {
            res.send(specialty)
    })
});

router.post('/', function (req, res) {
    CompanySpecialty.create(req.body).then(function (specialty) {
        res.send(specialty)
    });

})

router.put('/:id', function(req, res) { 
    // let companyId = {_id: req.params.id};
    CompanySpecialty.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(jobReq) {
        res.send(jobReq)
    });
});

router.delete('/:id', function(req, res) {
    CompanySpecialty.findByIdAndDelete({_id: req.params.id}, req.body).then(function(jobReq) {
        res.send(jobReq);
    });
});

module.exports = router
