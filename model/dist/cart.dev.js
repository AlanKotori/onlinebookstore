"use strict";

//  引入db.js
//  购物车
var db = require('../db');

var Schema = db.Schema;
var codeSchema = new Schema({
  userid: Number,
  //购买用户ID
  bookname: String,
  //书名
  book_number: Number,
  //数量
  book_id: Number,
  //图书ID
  // buy_date:String,//购买时间
  // buy_where:String,//发货位置
  buy_money: Number,
  //图书价格
  cartid: Number
});
module.exports = db.model('cart', codeSchema, 'cart');