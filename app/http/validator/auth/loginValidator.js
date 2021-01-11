'use strict';
const Joi = require('@hapi/joi');

const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).options({ abortEarly: false });

module.exports.login = login;
