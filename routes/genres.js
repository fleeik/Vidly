const validateObjectid = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre');
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();


//get all genres
router.get('/', async (req, res) => {
    //throw new Error('Could not get the genres.');
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

//get particular genre
router.get('/:id', validateObjectid, async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The Genre with the given ID was not found');
    res.send(genre);
});    


//post new genre
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var genre = new Genre({
        name: req.body.name
    });
    genre = await genre.save();
    res.send(genre);
});

//update genre
router.put('/:id', [auth, validateObjectid], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, 
        {new: true});
    if (!genre) return res.status(404).send('The Genre with the given ID was not found');

    res.send(genre);
});


//delete genre
router.delete('/:id', [auth, admin, validateObjectid], async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id)
    if (!genre) return res.status(404).send('The Genre with the given ID was not found');

    res.send(genre)
});

 
module.exports = router;