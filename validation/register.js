const Validator = require('validator');
const isEmpty = require('./is-empty'); //importing like this is a big workaround, but I couldn't get 'import to work'

module.exports = function validateRegisterInput(data) {

    let errors = {};

    //if it's not empty, it is whatever it is which is data.name.  If it is empty, then it's gonna be an empty string

    data.name = !isEmpty(data.name) ? data.name : '';


    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};