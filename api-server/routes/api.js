var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

var Teams = require('../controllers/team')

// TOKEN lado da api

router.get('/token', function(req,res){
  var sub = "Exame"
  var data = new Date().toISOString().substring(0,10)
  const token = jwt.sign({sub,data}, "DAW-PRI-2020-recurso",{
      expiresIn: 3600 // expires in 1h
    });
    return res.status(200).json({ token: token });
  })

//----------------------------------

// GET /api/teams - Devolve a lista de equipes, com os campos: _id, team, pitch1, pitch2, techPitch, businessReport, 
//techReport, e nmembers (número de membros da equipe);
router.get('/teams', function(req,res,next){
    Teams.listar()
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})

// [1 val.] GET /api/teams/:id - Devolve toda a informação de uma equipe (o registo completo em JSON);
router.get('/teams/:id', function(req,res,next){
    Teams.procurar(req.params.id)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})

//[1 val.] GET /api/teams/:id/members/:idMember - Devolve a informação de um membro da equipe (o registo em JSON)
router.get('/teams/:id/members/:membro',function(req,res,next){
    Teams.procurarMembro(req.params.id,req.params.membro)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })

})

//[1 val.] POST /api/teams - Insere uma equipe na base de dados (o registo é fornecido em JSON no body);
router.post('/teams', function(req,res,next){
    Teams.inserir(req.body)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})

//[0.5 val.] POST /api/teams/:id/members - Insere um novo membro numa determinada equipe (o registo do novo membro é fornecido em JSON no body);
    router.post('/listas/:id', function(req,res,next){  
        Teams.inserirMembro(req.params.id,req.body)
        .then(dados => res.status(200).jsonp(dados) )
        .catch(e => res.status(500).jsonp({error: e}))
  })

/* [0.5 val.] DELETE /api/teams/:id/members/:idMember - Apaga um membro duma equipe, devolve um booleano como resultado; */
router.delete('/teams/:id/members/:idMember',function(req,res,next){
    Teams.apagarMembro(req.params.id,req.params.prod)
      .then(dados => res.status(200).jsonp(true) )
      .catch(e => res.status(500).jsonp(false))
  })
  
 
//[1 val.] DELETE /api/teams/:id - Apaga uma equipe, devolve um booleano como resultado;
 
 router.delete('/teams/:id',function(req,res,next){
    Teams.apagar(req.params.id)
      .then(dados => res.status(200).jsonp(true) )
      .catch(e => res.status(500).jsonp(false))
  })




/*
router.post('/tipo', function(req,res,next){
    Teams.inserir(req.body)
        .then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})

router.delete('/:id', function(req,res,next){
    Colletion.apagar(req.params.id)
        ..then(dados => {
            res.jsonp(dados)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})


 */

module.exports = router;
