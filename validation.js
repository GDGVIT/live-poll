//jshint esversion:6
//VALIDATION
const Joi = require("@hapi/joi");

//REGISTER VALIDATION
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .required()
    });
    return schema.validate(data);
};
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .required()
    });
    return schema.validate(data);
};
const action_typeValidation = data => {
    const schema = Joi.object({
        action_type: Joi.string().required(),
        title: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports.action_typeValidation = action_typeValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
