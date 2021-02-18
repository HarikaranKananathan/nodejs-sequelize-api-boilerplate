const service = require('../../../service/auth/auth.service');

const loginTransformer = require('../../transformer/auth/login.transformer')
const userTransformer = require('../../transformer/auth/user.transformer')

const log4js = require('../../../../config/log4js');
const log = log4js.getLogger('auth.controller.js');

exports.authenticate = (req, res) =>
  service
    .authenticate(req.body)
    .then((doc) => res.json(new loginTransformer(doc)))
    .catch((err) => catchError(res, err, log));

exports.user = async (req, res) =>
  service
    .user(req.headers)
    .then((doc) => res.json(new userTransformer(doc)))
    .catch((err) => catchError(res, err, log));
