const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CompanySpecialtySchema = new Schema({
    title: {type:String, required: true, unique: true},
});

const companySpecialty = mongoose.model('companySpecialty', CompanySpecialtySchema );

module.exports = companySpecialty