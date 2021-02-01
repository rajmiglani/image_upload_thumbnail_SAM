'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3({
  signatureVersion: 'v4',
});

const Sharp = require('sharp');

const SOURCE_BUCKET = "upload-image-s3uploadbucket-zbdh3mxddnsc";
const DEST_BUCKET = "thumbnailbucket567";
                                    
module.exports = {
  handler : async function (event) {
    const imageName = event.queryStringParameters.imageName + ".jpg";
    const res = event.queryStringParameters.res;
    const width = Math.sqrt(parseInt(res));
    const height = Math.sqrt(parseInt(res));
  console.log(res);
    var response;
  
    S3.getObject({Bucket: SOURCE_BUCKET, Key: imageName}).promise()
      .then(data => Sharp(data.Body)
        .resize(width, height)
        .toFormat('png')
        .toBuffer()
      )
      .then(data => S3.putObject({
          Body: data,
          Bucket: DEST_BUCKET,
          ContentType: 'image/png',
          Key: imageName,
        }).promise()
      )
      .then((result) => {
        response = result
        console.log("res",result)
      }
          
      )
      .catch(err => console.log(err))
      
    return response;
  }
}
