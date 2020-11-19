const express = require('express');
const upload = require('./multer')
const router = express.Router();
const Specialty = require('../models/specialtyModel');


router.get('/', function (req, res) {
    Specialty.find().select('-__v').then(function (specialties) {
        if (specialties.length > 0) {
            res.json({
                count: specialties.length,
                specialties: specialties
            })
        }
    })
});

router.post('/', function(req, res, next){
    Specialty.create(req.body).then(function(specialty) {
        res.send({
            specialty: specialty
        })
    })
})

/* POST TITLE AND IMAGE */

// router.post('/', upload.single('file'), async function (req, res, next) {
//     let specialty = new Specialty()
//     title = specialty.title = req.body.title
//     file = specialty.file = req.file.destination + '/' + req.file.filename
//     // const specialty = new Specialty({
//     //     title: req.body.title,
//     //     file: req.file
//     // });
//     console.log(req.body.title, req.file.filename);
//     await specialty.save().then(result => {
//         console.log(result);
//         res.status(201).json({
//             message: 'Speciality Created successfully',
//             createdProduct: {
//                 title: title,
//                 file: file
//             }
//         });
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         });
//     });
//     // let specialty = new Specialty()
//     // specialty.title = req.body.title
//     // specialty.file = req.file;
//     // specialty.file = req.file.destination + '/' + req.file.filename
//     // console.log('title: ', specialty.title);
//     // console.log("file: ", specialty.file);
//     // await specialty.save()  
//     // res.json({ 
//     //     msg: 'Speciality Created successfully!',
//     //     speciality : specialty
//     // })

// });

router.put('/:id', function (req, res) {
    // let companyId = {_id: req.params.id};
    Specialty.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (specialty) {
        res.send(specialty)
    });
});

router.delete('/:id', function (req, res) {
    Specialty.findByIdAndDelete({ _id: req.params.id }).then(function (specialty) {
        res.send(specialty);
    });
});


module.exports = router
