const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const SpecialtySchema = new Schema({
    title: {type: String},
    // file: {type: Object}
    
});
// SpecialtySchema.plugin(uniqueValidator)

const Specialty = mongoose.model('specialty', SpecialtySchema );

module.exports = Specialty