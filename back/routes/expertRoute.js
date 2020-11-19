const express = require('express');
const router = express.Router();
const Expert = require('../models/expertModel');
const Specialty = require('../models/specialtyModel');
const upload = require('./multer')
const isset = require('isset');
const empty = require('is-empty');
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const JobRequest = require('../models/jobRequestModel');

//____________________________Get all Experts __________________________
router.get('/', function (req, res) {
  // console.log('GET request');
  Expert.find({})
    .select(' -__v ')
    // .populate('specialty', {'_id ': 0})
    .populate({ path: 'specialty', model: 'specialty', select: '-__v -_id' })
    .populate({ path: 'jobRequests', model: 'jobRequest', select: '-__v' })
    // .populate({ path: 'profile', model: 'expertProfile', select: '-__v -_id' })
    .exec(function (err, expert) {
      if (expert.length > 0) {
        res.status(200).json({
          count: expert.length,
          experts: expert,
        });
        console.log(expert[1]);
      } else {
        res.json({ message: 'No Experts found' })
        // console.log('bad');

      };
    });

});

//____________________________Get single Expert __________________________

router.get('/:id', function (req, res) {
  // console.log('GET request');
  id = req.params.id;
  Expert.findOne({ _id: id })
    .select(' -__v')
    // .populate('specialty', {'_id ': 0})
    .populate({ path: 'specialty', model: 'specialty', select: '-__v -_id' })
    .populate({ path: 'jobRequests', model: 'jobRequest', select: '-__v'})
    .populate({ path: 'favourites', model: 'jobOffer', select: '-__v ' })
    .populate({ path: 'chatBox', model: 'chat', populate:{path: 'sender.name'} })
    .populate({ path: 'chatBox', model: 'chat', populate:{path: 'reciepent.name'}})
    .exec(function (err, expert) {
      if (expert) {
        res.status(200).send({
          id: expert._id,
          username: expert.username,
          bday: expert.bday,
          specialty: expert.specialty,
          image: expert.image,
          email: expert.email,
          password: expert.password,
          isConfirmed: expert.isConfirmed,
          isLoggedIn: expert.isLoggedIn,
          profile: expert.profile,
          jobRequests: expert.jobRequests,
          favourites: expert.favourites,
          chatBox: expert.chatBox
        });
      } else {
        res.json({ message: `No Experts found with id : ${id}` })
        // console.log('bad');
      }
    });
});


//____________________________Register Expert __________________________

//When the expert sends a post request to this route, passport authenticates the expert based on the
//middleware created previously

router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {

  res.json({
    message: 'Signup successful',
    expert: req.user
  });

  try {
    const savedUser = await req.expert.save();
    res.send(savedUser)
    console.log(savedUser);
  } catch (err) {
    res.status(400)
  }
});

//____________________________Login Expert __________________________
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, expert, info) => {
    try {
      if (err || !expert) {
        const error = new Error('An Error occurred')
        return next(err);
      }
      req.login(expert, { session: false }, async (error) => {
        if (error) return next(error)
        //We don't want to store the sensitive information such as the
        //expert password in the token so we pick only the email and id
        const body = { _id: expert._id, email: expert.email };
        //Sign the JWT token and populate the payload with the expert email and id
        const token = jwt.sign({ expert: body }, 'top_secret');
        //Send back the token to the expert
        expertId = expert.id
        return res.json({ token, expert, expertId });

      });
    } catch (error) {
      return next(error);
    };
  })(req, res, next);
});

//____________________________Securing Routes__________________________
//Let's say the route below is very sensitive and we want only authorized users to have access

// Displays information tailored according to the logged in expert
router.get('/profile', (req, res, next) => {
  //We'll just send back the expert details and the token
  res.json({
    message: 'You made it to the secure route',
    expert: req.expert,
    token: req.query.secret_token
  })
  console.log(req.expert);
});


// edit expert
router.put('/:id', upload.single('file'), function (req, res, next) {
  // let userId = {_id: req.params.id};
  Expert.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (expert) {
    expert.save().then(result => console.log(result));
    res.json({
      msg: `Expert infos updated successfully!`,
      expert: expert
    })
  });
});


// upload single image
router.put('/:id/img', upload.single('file'), function (req, res, next) {
  // let userId = {_id: req.params.id};
  Expert.findByIdAndUpdate({ _id: req.params.id }, req.file).then(function (expert) {

    try {
      expert.image = req.file.destination + '/' + req.file.filename
      for (let i = 0; i < expert.profile.personalInfos.length; i++) {
        console.log(expert.profile.personalInfos[i].image);
      }
      console.log("expert's image: ", expert.image)
      image = expert.image = req.file.destination + '/' + req.file.filename
    } catch{ 
        next()
      }
    expert.save().then(result => console.log(result));
    res.json({
      msg: `Image uploaded successfully!`,
      expert: expert
    })
  });
});

// upload documents
router.put('/:id/doc', upload.single('doc'), function (req, res, next) {
  let document;
  Expert.findByIdAndUpdate({ _id: req.params.id }, req.file).then(function (expert) {
    for (let i = 0; i < expert.profile.education.length; i++) {
      expert.profile.education[i].document = req.file.path
      document = expert.profile.education[i].document = req.file.path
      console.log('doc => ', document);
    }
    expert.save()
    res.json({
      msg: `expert docs uploaded successfully!`,
      expert: expert,
      document: document,
    })
  })
})


// // upload multiple images
// router.put('/:id/imgs', upload.array['files', 5], function (req, res, next) {
//   // let userId = {_id: req.params.id};
//   Expert.findByIdAndUpdate({ _id: req.params.id }, req.files).then(function (expert) {

//     try {
//       expert.files = req.files.destination + '/' + req.files.filename
//       for (let i = 0; i < expert.profile.personalInfos.length; i++) {
//         console.log(expert.profile.personalInfos[i].files);
//       }
//       console.log("expert's image: ", expert.image)
//       image = expert.image = req.file.destination + '/' + req.file.filename
//     } catch{ 
//         next()
//       }
//     expert.save().then(result => console.log(result));
//     res.json({
//       msg: `Image uploaded successfully!`,
//       expert: expert
//     })
//   });
// });



router.delete('/:id', function (req, res) {
  Expert.findByIdAndDelete({ _id: req.params.id }, req.body).then(function (expert) {
    res.json({
      msg: 'Deleted succesfully',
      expert: expert

    })
  });
});



module.exports = router


















//__________________________________Register Expert without passport authentication_____________________________________________________

// router.post('/register', passport.authenticate('signup', { session : false }), function (req, res) {
//     password = req.body.password;
//     passConfirmation = req.body.passConfirmation;

//     Expert.find({ email: req.body.email }, function (err, docs) {
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
//             Expert.create({
//                 username: req.body.username,
//                 email: req.body.email,
//                 password: req.body.password
//             }).then(function(expert){
//                 res.json({
//                     expert,
//                     status: 200,
//                     message: "Expert added to database successfuly"
//                 });
//             });
//         };
//     });

// });
