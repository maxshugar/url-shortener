const { startMongoDB } = require('./util/mongoDB');
const { startExpress } = require("./util/express");
const { connectMongoose } = require('./util/mongoose');

(async () => {
    // Start the express server.
    await startExpress();
    // Start the mongodb in-memory server.
    const mongoUri = await startMongoDB();
    // Connect mongoose to mongodb server.
    await connectMongoose(mongoUri);
})();
