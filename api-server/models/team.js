var mongoose = require('mongoose')

var teamSchema = new mongoose.Schema({ 
    
    _id: String,
    guid: String,
    team: String,
    pitch1: Boolean,
    pitch2: Boolean,
    techPitch: Boolean,
    businessReport: Boolean,
    techReport: Boolean,
    members: [
        {
        id: String,
        name:String,
        course: String,
        scores: [Number]
    }
    ]    
});

module.exports = mongoose.model('team', teamSchema)