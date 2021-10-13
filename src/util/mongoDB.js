const { MongoMemoryServer } = require("mongodb-memory-server");

module.exports.startMongoDB = async () => {
    const mongodb = await MongoMemoryServer.create();
    return mongodb.getUri();
}