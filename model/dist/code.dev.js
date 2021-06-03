"use strict";

//  引入db.js
var db = require('../db');

var Schema = db.Schema;
var codeSchema = new Schema({
  email: String,
  code: Number,
  time: Number
});
module.exports = db.model('code', codeSchema, 'code');