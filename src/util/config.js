const ENV = require("dotenv").config({
path: require("find-config")(".env")
});
if (ENV.error) throw ENV.error;

module.exports = {
    apiBasePath: 'http://localhost:3000'
}