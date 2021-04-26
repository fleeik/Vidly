const config = require('config');


module.exports = function() {
    //console.log(config.has('jwtPrivateKey'));
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
        process.exit(1);
    }
}