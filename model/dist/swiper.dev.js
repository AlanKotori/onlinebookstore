"use strict";

//  引入db.js
var db = require('../db');

var Schema = db.Schema;
var codeSchema = new Schema({
  id: Number,
  //主ID
  img_name: String,
  //图片名称
  img_url: String //图片地址

});
module.exports = db.model('swiper', codeSchema, 'swiper');