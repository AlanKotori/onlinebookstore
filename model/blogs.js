//  引入db.js
const db = require('../db');  

const Schema = db.Schema;
    /*
        博客帖子都需要什么字段:
        title  标题
        create_date   创建日期
        last_date     最后修改日期
        content       帖子内容
        visitor       浏览数量
        tag           标签
        id            number
    */
var blogSchema = new Schema({
    id:Number,
    title:String,
    create_date:String,
    last_date:String,
    content:String,
    visitor:Number,
    tag:String
})

module.exports = db.model('blog',blogSchema,'blog');