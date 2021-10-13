const ENV = require("dotenv").config({
path: require("find-config")(".env")
});
if (ENV.error) throw ENV.error;

module.exports = {
    baseUrl: 'http://localhost:3000'
}