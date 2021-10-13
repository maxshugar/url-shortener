const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    originalUrl: String,
    urlCode: String,
    shortUrl: String,
    date: {
        type: String,
        // Mongoose will call the Date.now function every time a new document is created.
        default: Date.now
    }
});

const URL  = mongoose.model("URL", schema);

module.exports = URL;