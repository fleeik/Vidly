const {Customer, validate} = require('../models/customer');
const auth = require('../middleware/auth');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();



//create get endpoint
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers); 
});

//select particular customer
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The Customer with the given ID was not found');
    res.send(customer);
});

//post new customer
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    res.send(customer);
});

//update customer
router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, {new: true});

    if (!customer) return res.status(404).send('The Customer with the given ID was not found');
    res.send(customer);
});

//delete customer
router.delete('/:id', auth, async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if (!customer) return res.status(404).send('The Customer with the given ID was not found');

    res.send(customer);
});


module.exports = router;
 