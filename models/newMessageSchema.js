const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// this is the same as above:
// const { Schema } = mongoose;


const messageSchema = new Schema({ 
    user: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    added: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;