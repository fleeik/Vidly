const mongoose = require('mongoose');
const Joi = require('joi');


//define schema
const customerSchema = new mongoose.Schema({
    isGold: Boolean,
    name:{
        type: String,
        required: true,
        minLength: 5,
        maxLength: 10,
    },
    phone: String,
});

//create model
const Customer = mongoose.model('Customer', customerSchema);

//validate data from request.
function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        phone: Joi.string().min(5).required(),
        isGold: Joi.boolean()
    });
    return schema.validate(customer);
}


module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
