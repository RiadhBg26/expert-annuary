const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    skill:{type: String}
});

const skill = mongoose.model('skill', skillSchema);
module.exports = skill;