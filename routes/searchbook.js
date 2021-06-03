var express = require('express');

var router = express.Router();
var url = require('url');
var user = require('../model/user');
var bookpage = require('../model/bookpage');

var cart = require('../model/cart');
var buying = require('../model/buying');//总订单
var buyback = require('../model/buyback');//退货单
var buysend = require('../model/buysend');//发货单
router.get('/', function(req, res, next) {
    var total = 0;
    // Number把字符串类型转化为数字类型
    // var keywords = new RegExp(req.body.keywords);
    var keyword = url.parse(req.url,true).query.keywords;
    var keywords = new RegExp(url.parse(req.url,true).query.keywords);
    var page = Number(url.parse(req.url,true).query.page) || 1;
    if(page<=0){
        page=1;
    }
    console.log(page);
    bookpage.find({bookname:keywords},function(error,result){
      total = result;
      bookpage.find({bookname:keywords},function(error,data2){
        res.render('index',{
          data2:data2,
          total:total.length,
          page:page,
          keyword:keyword,
          title:'搜索图书'
        });
      }).skip(20 * (page-1)).limit(20);
    })
  });


  router.get('/buying', function(req, res, next) {
    var total = 0;
    // Number把字符串类型转化为数字类型
    // var keywords = new RegExp(req.body.keywords);
    var keyword = url.parse(req.url,true).query.keywords;
    var userid = url.parse(req.url,true).query.id;
    var keywords = new RegExp(url.parse(req.url,true).query.keywords);
    var page = Number(url.parse(req.url,true).query.page) || 1;
    if(page<=0){
        page=1;
    }
    console.log(page);
    bookpage.find({bookname:keywords},function(error,bookpage){
      buysend.find({userid:userid},function(error,buysend){
        user.find({userid:userid},function(error,user){
        buying.find({userid:userid},function(error,buying){
          buyback.find({userid:userid},function(error,buyback){
          let totelmoney = 0;
          let totelbuymoney = 0;
          let totelbackmoney = 0;
          for(let i=0;i<buysend.length;i++){
              
              totelmoney =  buysend[i].buy_money + totelmoney;
          }
          for(let i=0;i<buying.length;i++){
              
            totelbuymoney =  buying[i].buy_money + totelbuymoney;
        }
          for(let i=0;i<buyback.length;i++){
              
            totelbackmoney =  buyback[i].buy_money + totelbackmoney;
        }
          cart.find({userid:userid},function(error,cart){
          res.render('loginsuccess', { title: '网上书店' , cart:cart,totelmoney:totelmoney,user:user,bookpage:bookpage,buysend:buysend,totelbuymoney:totelbuymoney,totelbackmoney:totelbackmoney});
          })
          })
        })
    })
    })
    })
  });


module.exports = router;