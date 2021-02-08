var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jsonwebtoken')

var mongoose = require('mongoose')

mongoose.set('useFindAndModify', false);

/* Configuração do Mongo */
//----------------------------------------------------------------------------
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/PEI2020';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function() {
    console.log("Conexão ao MongoDB realizada com sucesso...")
});
//---------------------------------------------------------------------------


var apiRouter = require('./routes/api') 


var app = express();

// -----------------------------------------------------------------------
//Verificar o token na API

app.use(function(req, res, next){
  if(req.originalUrl != '/api/token'){
    // Autorização
    const token = req.query.token;
    if (!token) return res.status(401).json({message: 'Sem token.' });
    
    jwt.verify(token, "DAW-PRI-2020-recurso", function(err, decoded) {
      if (err) return res.status(500).json({message: 'Falha na autenticação do token.' });

      next();
    })
  }
  else next()
});


// -----------------------------------------------------------------------

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use ('/api',apiRouter)

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
  res.status(err.status || 500).jsonp({error: err.message});

});

module.exports = app;
