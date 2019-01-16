const Validator = require('validator');
const isEmpty = require('./is-empty'); //importing like this is a big workaround, but I couldn't get 'import to work'

module.exports = function validateLoginInput(data) {

    let errors = {};

    //if it's not empty, it is whatever it is which is data.name.  If it is empty, then it's gonna be an empty string


    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};