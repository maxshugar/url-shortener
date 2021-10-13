const mongoose = require("mongoose");
const logger = require("./logger");

module.exports.connectMongoose = async (url) => {
  mongoose.Promise = global.Promise;

  await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => {
      logger.info(
        `Successfully connected to MongoDB server.`
      );
      return db;
    })
    .catch((err) => {
      if (err.message.code === "ETIMEDOUT") {
        logger.info("Attempting to re-establish database connection.");
        mongoose.connect(url);
      } else {
        logger.error("Error while attempting to connect to database:");
        logger.error(err);
      }
    });
};