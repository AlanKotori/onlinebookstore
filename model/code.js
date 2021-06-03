//  引入db.js
const db = require('../db');  

const Schema = db.Schema;
    
var codeSchema = new Schema({
    email:String,
    code:Number,
    time:Number
})

module.exports = db.model('code',codeSchema,'code');