const auth = require('../middleware/auth');
const {Movie, validate} = require('../models/movies');
const express = require('express');
const mongoose = require('mongoose');
const { Genre } = require('../models/genre');
const router = express.Router();

//create get endpoint
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies); 
});

//select particular movie
router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('Invalid Movie');
    res.send(movie);
});

//post new customer
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('Invalid genre');

    var movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    res.send(movie);
});

//update movie
router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('Invalid genre');

    const movie = await Movie.findByIdAndUpdate(req.params.id, 
        {
            title: req.body.title,
            genre: { 
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
    }, {new: true});

    if (!movie) return res.status(404).send('The Movie with the given ID was not found');
    res.send(movie);
});

//delete movie
router.delete('/:id', auth, async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    
    if (!movie) return res.status(404).send('The Movie with the given ID was not found');

    res.send(movie);
});


module.exports = router;