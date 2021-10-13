const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    originalUrl: {
        type: String,
        required: true
    },
    urlCode: {
        type: String,
        required: true
    },
    shortUrl: {
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