//SECTION Error Response
const customError = (res, message) =>
  res.status(422).json({ status: false, message });
const notFound = (res) =>
  res.status(404).json({ status: false, message: 'Endpoint not found.' });
const unexpectedError = (res) =>
  res
    .status(500)
    .json({ status: false, message: '500 - Internal Server Error' });

const forbiddenError = (res) =>
  res.status(403).json({ status: false, message: 'Forbidden' });
const unauthorizedError = (res) => res.status(401).send('Unauthorized');
//!SECTION

//SECTION  Success Response
const successWithMessage = (res, message) =>
  res.status(200).json({ status: false, message });
const successWithData = (res, data) => res.status(200).json({ data: data });
const successWithBoolean = (res, message) =>
  res.send(200, { success: message });
//!SECTION

// SECTION Validation Error Response
const validationError = (res, message, error) =>
  res.status(422).json({ status: false, message, error });
//!SECTION

global.response = {
  customError,
  notFound,
  unexpectedError,
  successWithData,
  successWithMessage,
  successWithBoolean,
  unauthorizedError,
  forbiddenError,
  validationError,
};
global.catchError = (res, err) => {
  res.status(500).send(err.message);
};

module.exports.response;
