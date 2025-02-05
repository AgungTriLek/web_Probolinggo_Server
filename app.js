var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session')
var cors = require('cors')


var dashboardRouter = require('./app/dashboard/router');
var contentRouter = require('./app/content-informasi/router');
var contentKecamatanRouter = require('./app/content-kecamatan/router');
var contentAkuntabilitasRouter = require('./app/content-akuntabilitas/router');
var contentPengumumanRouter = require('./app/content-pengumuman/router');
var userRouter = require('./app/user/router');
var apiRouter = require('./app/api/router');
var categoryAkuntabilitasRouter = require('./app/category-akuntabilitas/router');
var categoryInformasiRouter = require('./app/category-informasi/router');
var categoryKecamatanRouter = require('./app/category-kecamatan/router');

var app = express();
const URL = `/api/v1`;
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { }
}))
app.use(flash());
app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/adminlte', express.static(path.join(__dirname, '/node_modules/admin-lte/')));

app.use('/',  userRouter);
app.use('/dashboard',  dashboardRouter);
app.use('/content-informasi', contentRouter);
app.use('/content-kecamatan', contentKecamatanRouter);
app.use('/content-akuntabilitas', contentAkuntabilitasRouter);
app.use('/content-pengumuman', contentPengumumanRouter);
app.use('/category-informasi', categoryInformasiRouter);
app.use('/category-kecamatan', categoryKecamatanRouter);
app.use('/category-akuntabilitas', categoryAkuntabilitasRouter);

// api
app.use(`${URL}/contents`,  apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
