/* configure express */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const logger = require('morgan');

app.use('/static', express.static('public'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(logger('dev'));

/* Set up routes */
const mainRoutes = require('./routes/index');
const bookRoutes = require('./routes/books');
app.use('/', mainRoutes);
app.use('/books', bookRoutes);

app.use((req, res, next) => {
  const err = new Error(`Sorry! That page doesn't exist.`);
  err.title = 'Not Found';
  err.status = 404;
  next(err);
});

/**
 * Development error handler.
 * Displays stacktrace to user.
 */
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (err.status === 404) {
      res.render('not_found');
    } else {
      res.render('error');
    }
  });
}

/**
 * Production error handler.
 * Doesn't display stacktrace to user.
 */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  if (err.status === 404) {
    res.render('not_found');
  } else {
    res.render('error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port);
