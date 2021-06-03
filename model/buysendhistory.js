//  引入db.js
//  发货单列表
const db = require('../db');  

const Schema = db.Schema;
    
var codeSchema = new Schema({
    userid:Number,//购买用户ID
    bookname:String,//书名
    book_number:Number,//数量
    buy_date:String,//购买时间
    buy_where:String,//发货位置
    buy_money:Number,//图书价格
    pageid:Number
})


module.exports = db.model('buysendhistory',codeSchema,'buysendhistory');