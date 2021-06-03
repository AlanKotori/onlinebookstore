//  引入db.js
const db = require('../db');  

const Schema = db.Schema;
    
var codeSchema = new Schema({
    id:Number,//主ID
    bookname:String,//书名
    author:String,//作者
    price:Number,//价格
    newprice:Number,//促销价格
    weight:Number,//重量
    publish:String,//出版社
    book_isbn:String,//ISBN
    edition:Number,//版次
    package:String,//包装
    format:String,//开本
    publish_date:String,//出版时间
    number_page:Number,//页数
    book_features:String,//产品特色，img地址
    book_edutorchoice:String,//编辑推荐
    book_introduction:String,//内容介绍
    book_author:String,//作者简介
    book_review:String,//精彩书评
    book_picture:String,//图书封面img
})


module.exports = db.model('bookpage',codeSchema,'bookpage');