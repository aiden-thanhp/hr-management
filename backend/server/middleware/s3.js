const aws = require('aws-sdk');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../../.env')});

// const region = "us-east-1";
const bucketName = "hr-management-jay1423";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAcessKey = process.env.AWS_SECRET_ACCESS_KEY;

// aws.config.update({
//     signatureVersion: 'v4',
//     apiVersion: 'latest',
//     credentials: {
//         accessKeyId,
//         secretAcessKey,
//     }
// });

aws.config.update({
    accessKeyId: "AKIA6GMCDQGNSCUXLSG6",
    secretAccessKey: "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",
    // "region": "us-east-1"
});

const s3 = new aws.S3();

async function generateUploadURL(fileName, fileType) {
    console.log("S3 Config = ", s3.config);

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Expires: 40*60,
        ACL: 'public-read',
        ContentType: fileType
    };

    // s3.getSignedUrl('putObject', params, async (error, url) => { 
    //     if (error) {
    //         console.log("S3 error = ", error)
    //         return error
    //     } else {
    //         console.log("S3 url = ", url)
    //         return url
    //     }
    // })
    try {   
        const url = await s3.getSignedUrl('putObject', params);
        console.log("S3 url = ", url);
        return url
    } catch (error) {
        console.log("S3 error =", error)
        throw new Error(`S3 Error`)
    }
}

module.exports = {
  generateUploadURL,
};
