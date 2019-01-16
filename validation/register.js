const Validator = require('validator');
const isEmpty = require('./is-empty'); //importing like this is a big workaround, but I couldn't get 'import to work'

module.exports = function validateRegisterInput(data) {

    let errors = {};

    //if it's not empty, it is whatever it is which is data.name.  If it is empty, then it's gonna be an empty string

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';


    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters (max 30)';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};