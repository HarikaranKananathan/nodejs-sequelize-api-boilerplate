const express = require('express');
const router = express.Router();
const userController = require('../../../../../app/http/Controller/setting/user.controller');

const {
  validateBodyWithToken,
  validateToken,
  validateBody
} = require('../../../../../util/validator.util');

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/setting/user.validator');

router.get('/search', validateToken(), userController.search);

router
  .route('/')
  .get(validateToken(), userController.getAll)
  .post(validateBody(createRequest),userController.create);

router
  .route('/:id')
  .get(userController.show)
  .patch(validateBodyWithToken(updateRequest), userController.edit)
  .delete(validateToken(), userController.delete);

module.exports = router;
