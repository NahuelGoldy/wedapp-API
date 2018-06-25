
const config = {};

// config.env = 'development';
// config.hostname = 'dev.example.com';

//mongo database
config.mongo = {};
config.mongo.uri = 'mongodb://127.0.0.1:27017/';
config.mongo.db = 'express-api-server';
config.mongo.connectionString = 'mongodb://NahuelSG:express-api-demo@cluster0-shard-00-00-v2gny.mongodb.net:27017,cluster0-shard-00-01-v2gny.mongodb.net:27017,cluster0-shard-00-02-v2gny.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

module.exports = config;