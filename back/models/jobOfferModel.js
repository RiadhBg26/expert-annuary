const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const jobOfferSchema = new Schema({
    companyId: {type: Schema.Types.ObjectId, ref: 'company' },
    jobTitle: {type: String},
    jobDescription: {type: String},
    jobRequirements:[{type: Object}],
    salary: {type: Number},
    jobType: {type: String},
    posted: {type: Date},
    expires: {type: Date},
    location:{type: String}
});

const jobOffer = mongoose.model('jobOffer', jobOfferSchema);
module.exports = jobOffer;