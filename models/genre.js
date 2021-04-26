const mongoose = require('mongoose');
const Joi = require('joi');

//define genre schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    }
});    

const Genre = mongoose.model('Genre', genreSchema);


//validation function schema
function validateGenre(name) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });

    return schema.validate(name);
}

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
module.exports.genreSchema = genreSchema;

