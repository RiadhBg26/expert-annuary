const express = require('express');
const router = express.Router();
const JobOffer = require('../models/jobOfferModel');
const Company = require('../models/companyModel');
//const jobOffer = require('../models/jobOfferModel');
const company = require('../models/companyModel');

router.get('/', function (req, res) {
    JobOffer.find({})
        .select('-__v')
        .populate({path: 'companyId', populate : {path: 'jobOffers'}, model: 'company', select: '-__v'})
        .exec(function (error, jobOffers) {
            res.send({
                count: jobOffers.length,
                jobOffers: jobOffers
            })
        });
});

router.post('', function (req, res) {
    JobOffer.create(req.body).then(async function (jobOffer) {
        //console.log(jobOffer)
        let company = await Company.findById(jobOffer.companyId)
        console.log("'id => ", company.jobOffers);
        company.jobOffers.push(jobOffer._id)
        await company.save()
        // console.log('company', company.jobOffers)
        res.send({
            msg: 'Job offer created successfully !',
            jobOffer: jobOffer
        })
    })
})


router.put('/:id', function (req, res) {
    // let companyId = {_id: req.params.id};
    JobOffer.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (jobOffer) {
        res.send(jobOffer)
    });
});

router.delete('/:id', function (req, res) {
    JobOffer.findByIdAndDelete({ _id: req.params.id }, req.body).then(function (jobOffer) {
        res.send(jobOffer);
    });
});

module.exports = router