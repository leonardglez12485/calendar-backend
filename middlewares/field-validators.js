const { response } = require("express");
const { validationResult } = require("express-validator");

const fieldValidator = (req, res = response, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({
            message: 'Validation error',
            status: 'error',
            errors: errors.mapped(),
        });
    }
    next();
}

module.exports = {
    fieldValidator,
}