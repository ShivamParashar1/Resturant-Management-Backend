var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors= require('cors');
var jwt = require('jsonwebtoken')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var statecityRouter = require('./routes/statecity');
var restaurantRouter = require('./routes/restaurant');
var categoryRouter = require('./routes/category');
var fooditemsRouter = require('./routes/fooditems')
var superAdimRouter = require('./routes/superadmin');
var tableRouter= require('./routes/tablebooking');
var waiterRouter= require('./routes/waiter')
var waitertableRouter= require('./routes/waitertable')
var billingRouter= require('./routes/billing')
var adminRouter= require('./routes/admin')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/superadmin',superAdimRouter);
app.use('/admin',adminRouter)

/*app.use((req,res,next)=>{
  const token= req.headers.authorization;
  console.log(token)
   jwt.verify(token,"shhhhhh",function(err, decoded){
    console.log(err,decoded)
    if(decoded){
      next();
    }
    else{
      res.status(401).json({sataus:false, message:"Invalid token"})
    }
   })
}) */

app.use('/billing',billingRouter)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/statecity',statecityRouter);
app.use('/restaurants', restaurantRouter);
app.use('/category',categoryRouter);
app.use('/fooditems',fooditemsRouter);
app.use('/table',tableRouter);
app.use('/waiters',waiterRouter)
app.use('/waitertable',waitertableRouter)


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
