var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */

router.get('/', function(req, res, next) {
  axios.get('http://localhost:8000/api/teams?token=' + req.cookies.token)
    .then(dados => res.render('index', {dados: dados.data})) //dados usar np pug
    .catch(e => res.render('error', {error: e}));
})

//listar
router.get('/equipa/:id',function(req,res,next){
	axios.get('http://localhost:8000/api/teams/' +req.params.id +  '?token=' + req.cookies.token)
	  .then(dados => res.render('lista', {lista: dados.data}))
	  .catch(e => res.render('error', {error: e}));
  })
  

//apagar uma equipa
router.post('/equipa/:id',function(req,res,next){
	axios.delete('http://localhost:8000/api/listas/' +req.params.id +  '?token=' + req.cookies.token)
	  .then(res.redirect('/'))
	  .catch(e => res.render('error', {error: e}));
  })


module.exports = router;
