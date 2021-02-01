const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const handler = require('./app.js').handler; 
app.get('/thumbnail', async (req, res) => {
  const event = {"queryStringParameters" : {"imageName": req.query.imageName, "res" : req.query.res}}
  result = await handler(event);
  console.log(result);
  res.status = 200;
  res.send(result);
});
 
 
app.listen(5555, () =>
  console.log(`Example app listening on port 5555!`),
);