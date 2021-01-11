const config = require('./config/config');

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
global.requireContext = require('require-context');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'storage')));

// routes
app.use('/api', require('./routes/api'));
app.use('/', require('./routes/web'));

// Set the default views directory to html folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('pretty-error').start();

require('./service');

const { validator, cache, getToken } = require('./util');

global.validator = validator;
global.cache = cache;
global.getToken = getToken;

//Create a Server
const server = app.listen(
  config.development.appPort,
  config.development.appAddress,
  function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
  }
);
