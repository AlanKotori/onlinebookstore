var mongoose = require('../db');
var Schema = mongoose.Schema;
var book = new Schema({
    name:{
        type:String
    },
    author:{
        type:String
    },
    publisher:{
        type:String
    },
    keywords:{
        type:String
    },
    date:{
        type:String
    },
    rate:{
        type:String
    },

    comment:{
        type:String
    },
    num:{
        type:Number
    }
})

module.exports = mongoose.model('book',book);
