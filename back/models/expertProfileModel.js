const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ExpertProfileSchema = new Schema({
    personalInfos: [{ 
        _id: false,
        image: {type: String},
        username: {type: String},
        fname: {type: String},
        lname: {type: String},
        mobile: {type: String},
        biography: {type: String}
    }],
    education: [{
        _id: false,
        degree: {type: String},
        institution: {type: String},
        year: {type: String},
        document:{type: Object}
    }],
    experience: [{
        _id: false,
        company: {type: String},
        from: {type: Date},
        to: {type: String},
        document:{type: Object}
    }],
    awards: [{
        _id: false,
        prize: {type: String},
        prizeYear: {type: String}
    }],
    address: {type: String},
})
const expertProfile = mongoose.model('expertProfile', ExpertProfileSchema);


module.exports = expertProfile;