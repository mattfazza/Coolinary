const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {

    let errors = {};

    //if it's not empty, it is whatever it is which is data.name.  If it is empty, then it's gonna be an empty string


    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';


    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to be between 2 and 4 characters';
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }

    if (Validator.isEmpty(data.status)) {
        errors.skills = 'Skills field is required';
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required';
    }

    //if website isn't empty, validate url
    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL';
        }
    }
    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL';
        }
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };

};