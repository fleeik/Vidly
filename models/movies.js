const {genreSchema} = require('./genre');
const mongoose = require('mongoose');
const Joi = require('joi');

//define schema
const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
    },
    genre: { 
        type: genreSchema,  
        required: true
    },
    numberInStock: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
    }
}));

//validation function schema
function validateMovie(name) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    });
    return schema.validate(name);
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;


