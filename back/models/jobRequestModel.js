const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const jobRequestSchema = new Schema({
    expertId: {type: Schema.Types.ObjectId, ref: 'expert' },
    jobTitle: {type: String},
    jobDescription: {type: String},
    skills: [{type: Object}],
    posted: {type: Date}
});

const jobRequest = mongoose.model('jobRequest', jobRequestSchema);
module.exports = jobRequest;