const express = require('express');
const router = express.Router();
const Skill = require('../models/skillsModel');

router.get('/', function(req, res) {
    Skill.find({}).then(function(skills) {
        res.send({
            count: skills.length,
            skills: skills
        })
    })
})
router.post('', function(req, res) {
    Skill.create(req.body).then(function(skill) {
        console.log(skill);
        res.send({
            count: skills.length,
            skills: skills
        })
    });
});
router.put('/:id', function(req, res) { 
    // let companyId = {_id: req.params.id};
    Skill.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(skill) {
        res.send(skill)
    });
});

router.delete('/:id', function(req, res) {
    Skill.findByIdAndDelete({_id: req.params.id}, req.body).then(function(skill) {
        res.send(skill);
    });
});

module.exports = router