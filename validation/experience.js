const Validator = require('validator');
const isEmpty = require('./is-empty'); //importing like this is a big workaround, but I couldn't get 'import to work'

module.exports = function validateExperienceInput(data) {

    let errors = {};

    //if it's not empty, it is whatever it is which is data.name.  If it is empty, then it's gonna be an empty string


    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Job title field is required';
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = 'company field is required';
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = 'from date field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};