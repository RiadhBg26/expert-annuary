const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { any } = require('../routes/multer');
const company = require('./companyModel');


const ExpertSchema = new Schema({
    username: {type: String, required:"Please enter your username!" },
    bday: { type: String,},
    specialty: { type: Schema.Types.ObjectId, ref: 'specialty'},
    image: {type: Object},
    email: {type: String, unique: true, required:"Please enter a valid email !"},
    password: {type: String, required:"Please enter your password !"},
    isConfirmed: {type: Boolean},
    isLoggedIn: {type: Boolean},
    profile: {type: Schema.Types.Mixed},
    jobRequests: [{type: Schema.Types.ObjectId, ref: 'jobRequest'}],
    favourites : [{type: Schema.Types.ObjectId, ref: 'jobOffer'}],
    chatBox: [{type: Schema.Types.ObjectId, ref: 'chat'}]

    // profile: {type: Schema.Types.ObjectId, ref:'expertProfile'}
});
ExpertSchema.plugin(uniqueValidator)



//This is called a pre-hook, before the expert information is saved in the database
//this function will be called, we'll get the plain text password, hash it and store it.
ExpertSchema.pre('save', async function (next) {
    //'this' refers to the current document about to be saved
    const expert = this;
    //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
    //your application becomes.
    const hash = await bcrypt.hash(this.password, 10);
    //Replace the plain text password with the hash and then store it
    this.password = hash;
    //Indicates we're done and moves on to the next middleware
    next();
});

//We'll use this later on to make sure that the expert trying to log in has the correct credentials
ExpertSchema.methods.isValidPassword = async function (password) {
    // console.log(password);
    const expert = this;
    //Hashes the password sent by the expert for login and checks if the hashed password stored in the
    //database matches the one sent. Returns true if it does else false.
    const compare = await bcrypt.compare(password, this.password);
    console.log(company);
    return compare;
}

const expert = mongoose.model('expert', ExpertSchema);
module.exports = expert;