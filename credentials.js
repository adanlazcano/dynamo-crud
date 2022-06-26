const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.ACCESS_KEY,
secretAccessKey: process.env.SECRET_KEY,
});

const DynamoClient= new AWS.DynamoDB.DocumentClient();
const TABLE_NAME =process.env.TABLE_NAME;

module.exports = {DynamoClient,TABLE_NAME};


