// Collection controller

var Equipas = require('../models/team')


module.exports.listar = () => {
    return Equipas
        .aggregate([{"$unwind": "$members"},
             {"$group": {
                "_id": "$_id",
                "team": {"$first":"$team"},
                "pitch1": {"$first":"$pitch1"},
                "pitch2": {"$first":"$pitch2"},
                "techPitch": {"$first":"$techPitch"},
                "businessReport": {"$first":"$businessReport"},
                "techReport": {"$first":"$techReport"},
                "members": {"$sum":1}                       

        }
    }
])
}

module.exports.procurar = id => {
    return Equipas
        .findOne({_id: id}) 
        .exec()
}

module.exports.procurarMembro = (idT,m) => {
    return Equipas
        .aggregate([
            {"$unwind": "$members"},
            {"$match": {"members.id": m, "_id": idT}},
            {"$project": {
                _id: 0,
                "id": "$members.id",
                "equipa": "$team",
                "curso": "$members.course",
                "nome": "$members.name",
                "scores": "$members.scores"}
        }
    ])       
}

module.exports.inserir = e => {
     
    var novaEquipa = new Equipas(e)    
    return novaEquipa.save()
}

module.exports.inserirMembro = (idE, m) => {
    
    return Equipas 
        .findOneAndUpdate({_id: idE}, {$push:{members: m}})
        .exec()
}

module.exports.apagar = id => {
    return Equipas
        .findOneAndDelete({_id: id})
        .exec()
}

module.exports.apagarMembro = (idE, m) => {
    return Equipas
        .findOneAndUpdate({_id: idE}, {$pull:{members:{id: m}}})
        .exec()
  }
