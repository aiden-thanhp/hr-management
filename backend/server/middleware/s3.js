const aws = require('aws-sdk');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const region = 'us-east-1';
const bucketName = 'hrmanagementproject';
const accessKeyId = process.env.S3_accessKeyId;
const secretAcessKey = process.env.S3_secretAcessKey;

//Checking for credential:
const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAcessKey,
  signatureVersion: 'v4',
});

async function generateUploadURL() {
  const randomBytes = promisify(crypto.randomBytes);
  const rawBytes = await randomBytes(16);
  const fileName = rawBytes.toString('hex');

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: 120,
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
}

module.exports = {
  generateUploadURL,
};
