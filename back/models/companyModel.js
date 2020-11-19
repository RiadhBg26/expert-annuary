const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const CompanySchema = new Schema({
    name: {type: String, required: true},
    specialty: {type: Schema.Types.ObjectId, ref: 'specialty', required: true},
    // specialty: {type: String},
    image: {type: Object},
    gallery: [{type: Object}],
    email: {type: String, unique: true},
    password: {type: String, required: true},
    isConfirmed: {type: Boolean},
    isLoggedIn: {type: Boolean},
    profile: {type: Schema.Types.Mixed},
    jobOffers: [{type: Schema.Types.ObjectId, ref:'jobOffer'}],
    favourites : [{type: Schema.Types.ObjectId, ref: 'jobRequest'}],
    chatBox: [{type: Schema.Types.ObjectId, ref: 'chat'}]

})

CompanySchema.plugin(uniqueValidator)



//This is called a pre-hook, before the company information is saved in the database
//this function will be called, we'll get the plain text password, hash it and store it.
CompanySchema.pre('save', async function (next) {
    //'this' refers to the current document about to be saved
    const company = this;
    //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
    //your application becomes.
    const hash = await bcrypt.hash(this.password, 10);
    //Replace the plain text password with the hash and then store it
    this.password = hash;
    //Indicates we're done and moves on to the next middleware
    next();
});

//We'll use this later on to make sure that the company trying to log in has the correct credentials
CompanySchema.methods.isValidPassword = async function (password) {
    const company = this;
    //Hashes the password sent by the company for login and checks if the hashed password stored in the
    //database matches the one sent. Returns true if it does else false.
    const compare = await bcrypt.compare(password, company.password);
    return compare;
}
const company = mongoose.model('company', CompanySchema);
module.exports = company;