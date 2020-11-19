const passport = require('passport');
const express = require('express');
const router = express.Router();
const Expert = require('../models/expertModel');
const Company = require('../models/companyModel');
const Profile = require('../models/expertProfileModel')
const CompanyProfile = require('../models/companyProfileModel')
const { json } = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;

const JWTstrategy = require('passport-jwt').Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;

//Create a passport middleware to handle user registration
passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  if ((email.indexOf("@") == -1) || (email.indexOf(".") == -1) || (email == "")) {
    // console.log(email.indexOf('@'), "invalid email type");
    done("invalid email type");
  } else {
    for (i = email.length; i > 0; i--) {
      pos = 0;
      if (email[i] == ".") {
        pos = i;
      }
      let x = email.length;
      let numbers = /[0-9]/;
      let uppercases = /[A-Z]/;
      let lowercases = /[a-z]/
      let symbols = /[$&+,:;=?@#|'<>.^*()%!-]/;
      if ((email[x - 3] == email[pos]) || (email[x - 4] == email[pos])) {
        if (password.length >= 6 && password.match(numbers) && password.match(symbols) && password.match(uppercases) && password.match(lowercases)) {
          try {
            //Save the information provided by the user to the the database
            let username = req.body.username;
            // let username = req.body.email.split('@');
            let bday = req.body.bday
            // let fname = req.body.fname;
            // let lname = req.body.lname;
            let image = req.body.image
            let specialty = req.body.specialty
            let isConfirmed = false;
            let isLoggedIn = false;

            let profile = new Profile({
              personalInfos: [{
                image: image,
                username: username,
                fname: req.body.fname,
                lname: req.body.lname,
                biography: req.body.biography
              }],
              education: [{
                degree: req.body.degree,
                institution: req.body.institution,
                year: req.body.year,
                document: [req.files]
              }],
              experience: [{
                company: req.body.company,
                from: req.body.from,
                to: req.body.to,
                document: [req.files]
              }],
              awards: [{
                prize: req.body.prize,
                prizeYear: req.body.prizeYear
              }],
              address: req.body.address,
            });

            // let p = new Profile()
            // let profile = p._id

            let expert = await Expert.create({
              username, bday, specialty, image, email,
              password, isConfirmed, isLoggedIn, profile
            });
            console.log('__________________________________');
            console.log("expert is: ", expert);
            console.log('__________________________________');
            console.log("profile: ", profile);

            //Send the expert information to the next middleware
            return done(null, expert);
          } catch (error) {
            done(error);
          }
        } else {
          console.log("weak pass");
        };
      };
    };

  }
}));

//Create a passport middleware to handle Expert login
passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  // console.log("worked !");
  try {
    //Find the expert associated with the email provided by the expert
    const expert = await Expert.findOne({ email });
    // console.log("worked !");

    if (!expert) {
      //If the expert isn't found in the database, return a message
      console.log("email not found");
      return done(null, false, { message: 'Expert not found' });

    }
    //Validate password and make sure it matches with the corresponding hash stored in the database
    //If the passwords match, it returns a value of true.
    const validate = await expert.isValidPassword(password);
    
    // console.log('this =>', password);
    if (!validate) {
      console.log(expert.email);
      // console.log("wrong password !");
      return done(null, false, { error: 'Wrong Password' });
    }
    //Send the expert information to the next middleware
    console.log("done: ", expert);
    return done(null, expert, { message: 'Logged in Successfully', expertId: expert.id });
  } catch (error) {
    return done(error);
  }
}));


//This verifies that the token sent by the expert is valid
passport.use(new JWTstrategy({
  //secret we used to sign our JWT
  secretOrKey: 'top_secret',
  //we expect the expert to send the token as a query parameter with the name 'secret_token'
  jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
  try {
    //Pass the user details to the next middleware
    console.log("token:", token.expert);
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));





//____________________________________________company Passport__________________________________




//Create a passport middleware to handle company registration
passport.use('register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  isPending = false;
  if ((email.indexOf("@") == -1) || (email.indexOf(".") == -1) || (email == "")) {
    // console.log(email.indexOf('@'), "invalid email type");
    done("invalid email type");
  } else {
    for (i = email.length; i > 0; i--) {
      pos = 0;
      if (email[i] == ".") {
        pos = i;
      }
      let x = email.length;
      let numbers = /[0-9]/;
      let uppercases = /[A-Z]/;
      let lowercases = /[a-z]/
      let symbols = /[$&+,:;=?@#|'<>.^*()%!-]/;
      if ((email[x - 3] == email[pos]) || (email[x - 4] == email[pos])) {
        if (password.length >= 6 && password.match(numbers) && password.match(symbols) && password.match(uppercases) && password.match(lowercases)) {
          try {
            //Save the information provided by the company to the the database
            console.log('company registred');

            let profile = new CompanyProfile({
              technicalInfos: [{
                _id: false,
                name: req.body.name,
                image: req.body.image,
                gallery: req.body.gallery,
                website: req.body.website,
                about: req.body.about,
                specialty: req.body.specialty,
                fields: req.body.fields,
                comanySize: req.body.comanySize,
                founded: req.body.founded,
                location: req.body.location

              }],
              awards: [{
                _id: false,
                prize: req.body.prize,
                prizeYear: req.body.prizeYear
              }],
            })
            const name = req.body.name
            const image = req.body.image
            const specialty = req.body.specialty;
            const isLoggedIn = false;
            const isConfirmed = false;
            const company = await Company.create({
              name, 
              image, 
              specialty, 
              profile, 
              email, 
              password, 
              isConfirmed, 
              isLoggedIn
            });
            //Send the company information to the next middleware
            console.log('company registred');
            console.log(company);
            return done(null, company, company.profile);
          } catch (error) {
            done(error);
          }
        } else {
          console.log("weak pass");
          isLoggedIn = false;
        }
      }
    }

  }
}));

//Create a passport middleware to handle Company login
passport.use('signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    //Find the user associated with the email provided by the user
    const company = await Company.findOne({ email });
    if (!company) {
      //If the company isn't found in the database, return a message
      return done(null, false, { message: 'Company not found' });
    }
    //Validate password and make sure it matches with the corresponding hash stored in the database
    //If the passwords match, it returns a value of true.
    const validate = await company.isValidPassword(password);
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }
    isLoggedIn = true
    console.log(isLoggedIn);
    //Send the user information to the next middleware
    return done(null, company, { message: 'Logged in Successfully' });
  } catch (error) {
    return done(error);
  }
}));

//This verifies that the token sent by the company is valid
passport.use(new JWTstrategy({
  //secret we used to sign our JWT
  secretOrKey: 'top_secret',
  //we expect the company to send the token as a query parameter with the name 'secret_token'
  jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
  try {
    //Pass the company details to the next middleware
    return done(null, token.company);
  } catch (error) {
    done(error);
  }
}));

module.exports = passport








// {
//   "personalInfos":[{
//       "username":"Riadh FullStack",
//       "fname":"Riadh",
//       "lname":"Bougamra",
//       "biography":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
//   }],
//   "education":[{
//       "degree":"grad",
//       "institution":"5points",
//       "year":"2020"
//   }],
//   "experience":[{
//       "company":"iT company",
//       "from":"2019",
//       "to":"2020"
//   }],
//   "awards":[{
//       "name":"FullStack",
//       "year":"2020"
//   }],
//   "address":"istanbul/turkey/earth"
// }