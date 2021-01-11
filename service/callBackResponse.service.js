const callbackWithData = (data) => ({ status: true, data });
const callbackWithSuccessMessage = (data) => ({ status: true, data });
const callbackWithFalseMessage = (data) => ({ status: false, data });
const callbackWithDefaultError = () => ({
  status: false,
  data: 'Unknown Error occurred.',
});

global.callBackResponse = {
  callbackWithData,
  callbackWithSuccessMessage,
  callbackWithFalseMessage,
  callbackWithDefaultError,
};

module.exports.callBackResponse;
