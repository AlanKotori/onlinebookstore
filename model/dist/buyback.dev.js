"use strict";

//  引入db.js
//  退货单
var db = require('../db');

var Schema = db.Schema;
var backbuySchema = new Schema({
  userid: Number,
  //退款用户ID
  bookname: String,
  //书名
  book_number: Number,
  //数量
  buy_date: String,
  //购买时间
  buy_where: String,
  //发货位置
  buy_money: Number,
  //退款价格
  back_why: String,
  pageid: Number
});
module.exports = db.model('buyback', backbuySchema, 'buyback');