var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override'); // Import method-override

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fotosRouter = require('./routes/fotos'); // Import fotosRouter

var app = express();
// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(methodOverride('_method')); // Apply method-override BEFORE routes
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); // Add method-override before routes

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/fotos', fotosRouter); // Use fotosRouter

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;