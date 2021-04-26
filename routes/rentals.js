const auth = require('../middleware/auth');
const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movies');
const {Customer} = require('../models/customer');
const express = require('express');
const router = express.Router();

//create get endpoint
router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals); 
});

//post new customer
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(404).send('Invalid customer ID');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send('Invalid movie ID');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

    var rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    rental = await rental.save();
    movie.numberInStock--;
    movie.save();
    res.send(rental);
});

module.exports = router;