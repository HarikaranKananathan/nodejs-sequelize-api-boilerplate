const express = require('express');
const router = express.Router();
const userController = require('../../../../../app/http/Controller/setting/user.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/setting/user.validator');

router.get('/search', validateToken(), userController.search);

router
  .route('/')
  .get(validateToken(), userController.getAll)
  .post(validateBodyWithToken(createRequest), userController.create);

router
  .route('/:id')
  .get(validateToken(), userController.show)
  .patch(validateBodyWithToken(updateRequest), userController.edit)
  .delete(validateToken(), userController.delete);

module.exports = router;
