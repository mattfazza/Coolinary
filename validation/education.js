const Validator = require('validator');
const isEmpty = require('./is-empty'); //importing like this is a big workaround, but I couldn't get 'import to work'

module.exports = function validateEducationInput(data) {

    let errors = {};

    //if it's not empty, it is whatever it is which is data.name.  If it is empty, then it's gonna be an empty string


    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.school)) {
        errors.school = 'school field is required';
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'degree field is required';
    }

    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'fieldofstudy field is required';
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = 'from date field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};