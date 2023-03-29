// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

  
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.signuphandler = async (event) => {

  const bucketName = 'testsignup'; // replace with your S3 bucket name

  const timestamp = new Date().getTime()
  const key = `data/${timestamp}.json`; // use the ID as part of the key
  
  const body = JSON.stringify(event.body); // convert the request body to JSON

  try{

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: body
    };

    await s3.putObject(params).promise();

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Accept": '*/*',
        "Content-Type": "application/json"
      },
      body: 'Sign up data saved successfully'
    };
  
    return response;

  }catch(error){

    return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error saving data to S3' })
      };
      
  }
  
};
