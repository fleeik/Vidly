
const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);


//throw new Error('Something failed during startup');

//env private key
//set vidly_jwtPrivateKey=mySecureKey

//valid user token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc2MzU1MjNjN2NiNDA4YmNmZWFjYTAiLCJpYXQiOjE2MTgzNTk2MzR9.XAkCqGvGF48U1ZfLvGgn5smekev5eiLiR4iVtjGdLcs

//homepage
app.get('/', (req, res) => {
    res.send('Hello World!')
});


//PORT
const port = process.env.PORT || 3000;

const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;