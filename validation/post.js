const Validator = require('validator');
const isEmpty = require('./is-empty'); //importing like this is a big workaround, but I couldn't get 'import to work'

module.exports = function validatePostInput(data) {

    let errors = {};

    //if it's not empty, it is whatever it is which is data.name.  If it is empty, then it's gonna be an empty string
    data.text = !isEmpty(data.text) ? data.text : '';

    if (!Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }

    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = 'Post must be between 10 and 300 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};