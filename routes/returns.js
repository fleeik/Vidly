const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const {Rental} = require('../models/rental');
const {Movie} = require('../models/movies');
const Joi = require('joi');
const validate = require('../middleware/validate');



router.post('/', [auth, validate(validateReturn)], async (req, res) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId)

    if(!rental) return res.status(404).send('Rental not found.');

    if (rental.dateReturned) return res.status(400).send('Return already processed.')

    rental.return();
    await rental.save();

    await Movie.updateOne(
        { _id: rental.movie._id }, 
        {
        $inc: { numberInStock: 1}
        }
    );

    return res.send(rental);
});

//validation function schema
function validateReturn(req) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });

    return schema.validate(req);
}

module.exports = router;