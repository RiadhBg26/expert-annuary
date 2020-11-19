const express = require('express');
const router = express.Router();
const Company = require('../models/companyModel');
const Specialty = require('../models/specialtyModel');
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const upload = require('./multer');
const company = require('../models/companyModel');


router.get('/', function (req, res) {
  console.log('GET request');
  Company.find({})
    .select(' -__v')
    .populate('specialty')
    .populate({
      path: "jobOffers",
      model: "jobOffer"
    })

    .exec(function (err, company) {
      if (company) {
        res.status(200).json({
          count: company.length,
          companies: company
        });
        console.log('good');
      } else {
        res.json({ message: 'No companies found' })
        console.log('bad');
      }
    });

});

router.get('/:id', function (req, res) {
  //  let Id = {_id: req.params.id};
  id = req.params.id;
  // console.log('GET request');
  Company.findOne({ _id: id })
    .select(' -__v')
    // .populate('specialty', { '_id ': 0 })
    .populate({ path: 'specialty', model: 'specialty', select: '-__v -_id' })
    .populate({ path: 'jobOffers', model: 'jobOffer', select: '-__v ' })
    .populate({ path: 'favourites', model: 'jobRequest', select: '-__v ' })
    .populate({ path: 'chatBox', model: 'chat', populate:{path: 'sender.name'}})
    .populate({ path: 'chatBox', model: 'chat', populate:{path: 'reciepent.name'}})
    .exec(function (err, company) {
      if (company) {
        res.status(200).send({
          id: company._id,
          specialty: company.specialty,
          image: company.image,
          gallery: company.gallery,
          email: company.email,
          password: company.password,
          isConfirmed: company.isConfirmed,
          isLoggedIn: company.isLoggedIn,
          profile: company.profile,
          jobOffers: company.jobOffers,
          favourites: company.favourites,
          chatBox: company.chatBox
        })
      }
    });
});

//____________________________Register Company __________________________

//When the company sends a post request to this route, passport authenticates the company based on the
//middleware created previously
router.post('/register', passport.authenticate('register', { session: false }), async (req, res, next) => {
  res.status(200).json({
    message: 'Signup successful',
    company: req.user
  });
  try {
    const savedcompany = await req.company.save();
    res.send(savedcompany)
  } catch (err) {
    res.status(400)
  }
});

//____________________________Login Company __________________________
router.post('/signin', async (req, res, next) => {
  passport.authenticate('signin', async (err, company, info) => {
    try {
      if (err || !company) {
        const error = new Error('An Error occurred')
        return next(err);
      }
      req.login(company, { session: false }, async (error) => {
        if (error) return next(error)
        //We don't want to store the sensitive information such as the
        //company password in the token so we pick only the email and id
        const body = { _id: company._id, email: company.email };
        //Sign the JWT token and populate the payload with the company email and id
        const token = jwt.sign({ company: body }, 'top_secret');
        //Send back the token to the company
        companyId = company.id
        return res.json({ token, company, companyId });
      });
    } catch (error) {
      return next(error);
    };
  })(req, res, next);
});

//____________________________Securing Routes__________________________
//Let's say the route below is very sensitive and we want only authorized companys to have access

// Displays information tailored according to the logged in company
router.get('/profile', (req, res, next) => {
  //We'll just send back the company details and the token
  res.json({
    message: 'You made it to the secure route',
    company: req.company,
    token: req.query.secret_token
  })
  console.log(req.company);
});

// edit company
router.put('/:id', function (req, res, next) {
  // let companyId = {_id: req.params.id};
  Company.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (company) {
    company.save()
    res.json({
      msg: `Company Profile updated successfully!`,
      company: company,
      image: image,
    })
  });
});

// upload single image
router.put('/:id/img', upload.single('file'), function (req, res, next) {
  // let companyId = {_id: req.params.id};
  let image;
  Company.findByIdAndUpdate({ _id: req.params.id }, req.file).then(function (company) {
    try {
      company.image = req.file.destination + '/' + req.file.filename
      image = company.image = req.file.destination + '/' + req.file.filename
      // console.log('company image: ', image);
    } catch {
      next()
    }
    company.save()
    res.json({
      msg: `Company image uploaded successfully!`,
      company: company,
      image: image,
    })
  });
});

// upload multiple images
router.put('/:id/imgs', upload.array('files[]', 10), function (req, res, next) {
  Company.findByIdAndUpdate({ _id: req.params.id }, req.files).then(function (company) {
    let gallery;
    for (let i = 0; i < req.files.length; i++) {
      company.gallery.push(req.files[i].path)
      gallery = company.gallery
    }
    company.save()
    console.log('gallery =>', company.gallery);
    res.json({
      msg: `Company image uploaded successfully!`,
      company: company,
      gallery: company.gallery,
    })
  })
})


router.delete('/:id', function (req, res) {
  Company.findByIdAndDelete({ _id: req.params.id }, req.body).then(function (company) {
    res.json({
      msg: 'Deleted succesfully',
      company: company

    })
  });
});



module.exports = router
















// router.put('/:id',upload.fields([{name: 'file'},{ name: 'files'}]), function(req, res, next) { 
//   // let companyId = {_id: req.params.id};
//   let image ;
//   let gallery;
//   Company.findByIdAndUpdate({ _id: req.params.id}, req.body).then(function(company) {
//     try {
//       company.image = req.file.destination + '/' + req.file.filename
//       image = company.image
//     } catch{ 
//         next()
//       }

//     try {
//       for (let i = 0; i < company.profile.technicalInfos.length; i++) {
//         company.profile.technicalInfos[i].gallery = req.files.destination + '/' + req.files.filename
//         gallery = company.profile.technicalInfos[i].gallery
//       }
//     } catch {
//       next()
//     }
//     company.save().then(result => console.log('gallery images: ', req.files));

//     res.json({
//       msg: `Company Profile updated successfully!`,
//       company: company,
//       image: company.image,
//       gallery: gallery
//     })
//   });
// });


//__________________________________Register Company without passport authentication_____________________________________________________

// router.post('/register', passport.authenticate('signup', { session : false }), function (req, res) {
//     password = req.body.password;
//     passConfirmation = req.body.passConfirmation;

//     Company.find({ email: req.body.email }, function (err, docs) {
//         if (docs.length) {
//             console.log(docs.length);
//             res.json({
//                 status: 401,
//                 message:"email already exists in database"
//             });
//             return
//         } else if (password !== passConfirmation ){
//             res.json({
//                 status: 401,
//                 message: "Passwords dont match"
//             })
//             return
//         }else {
//             Company.create({
//                 companyname: req.body.companyname,
//                 email: req.body.email,
//                 password: req.body.password
//             }).then(function(company){
//                 res.json({
//                     company,
//                     status: 200,
//                     message: "Company added to database successfuly"
//                 });
//             });
//         };
//     });

// });
