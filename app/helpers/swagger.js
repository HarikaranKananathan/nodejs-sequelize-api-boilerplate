const express = require('express');
const router = express.Router();
const fs = require('fs');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

// const css = require('../../public/styles/swagger.css');

// const customCss = fs.readFileSync(process.cwd() + css, 'utf8');

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = router;
