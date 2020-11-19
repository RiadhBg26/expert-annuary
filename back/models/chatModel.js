const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    sender: {
        name: { type: Schema.Types.ObjectId, ref: 'expert' },
        message: {
            value : [{type: String}],
            time : { type : Date, default: Date.now }
        }
    },
    reciepent: {
        name: { type: Schema.Types.ObjectId, ref: 'company' },
        message: {
            value : [{type: String}],
            time : { type : Date, default: Date.now }
        }
    },
});

const messenger = mongoose.model('chat', MessageSchema);

module.exports = messenger  