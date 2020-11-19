const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CompanyProfileModel = new Schema({
    technicalInfos: [{ 
        _id: false,
        name: { _id: false, type: String},
        image: { _id: false, type: Object},
        gallery: [{ _id: false, type: Object}],
        website: { _id: false, type: String},
        about: { _id: false, type: String},
        fields: [{ _id: false, type: String}],
        comanySize: { _id: false, type: String},
        founded: { _id: false, type: Date},
        location: {_id: false, type: String},
    }],
    awards: [{
        _id: false,
        prize: {type: String},
        prizeYear: {type: String}
    }],
})
const companyProfile = mongoose.model('companyProfile', CompanyProfileModel);


module.exports = companyProfile;