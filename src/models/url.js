const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    original: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    little: {
        type: String,
        required: true
    },
    date: {
        type: String,
        // Mongoose will call the Date.now (Num seconds since epoch) function every time a new document is created.
        default: Date.now
    }
});

const URL  = mongoose.model("URL", schema);

module.exports = URL;