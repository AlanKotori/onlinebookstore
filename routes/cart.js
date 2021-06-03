const { request } = require('express');
var express = require('express');
var router = express.Router();
var bookpage = require('../model/bookpage');
var buying = require('../model/buying');
var buyback = require('../model/buyback');
var buybackhistory = require('../model/buybackhistory');
var buysend = require('../model/buysend');
var user = require('../model/user');
var bookpage = require('../model/bookpage');
var cart = require('../model/cart');


router.get('/', function(req, res) {
    cart.find({},function(error,data){
        res.render('cartbase', { data: data });
    })
  
});

router.post('/addcart', function(req, res) {
    // blog.create
    let userid = req.body.userid;
    let cartid = Math.ceil(Math.random()*10000000);
    cart.create({
        userid:req.body.userid,
        bookname:req.body.bookname,
        book_id:req.body.bookid,
        buy_money:req.body.buy_money,
        cartid:cartid
    },function(error,data8){
        if(error) throw error;
        //  重定向
        user.find({userid:userid},function(error,user){
        bookpage.find({},function(error,bookpage){
            buysend.find({userid:userid},function(error,buysend){
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

    })
});

router.post('/delcart', function(req, res) {
    cart.remove({
        _id:req.body.del
    },function(error,data8){
        let userid = req.body.userid;
        if(error) throw error;
        //  重定向
        bookpage.find({},function(error,bookpage){
            user.find({userid:userid},function(error,user){
            buysend.find({userid:userid},function(error,buysend){
              buying.find({userid:userid},function(error,buying){
                buyback.find({userid:userid},function(error,buyback){
                buybackhistory.find({userid:userid},function(error,buybackhistory){
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
            res.render('loginsuccess', { title: '网上书店' , cart:cart,totelmoney:totelmoney,user:user,bookpage:bookpage,buysend:buysend,totelbuymoney:totelbuymoney,totelbackmoney:totelbackmoney,buybackhistory:buybackhistory});
            })
            })
          }) })
          })
        })
        })
    })
});


router.post('/delcartfrommybook', function(req, res) {
    cart.remove({
        _id:req.body.del
    },function(error,data8){
        let userid = req.body.userid;
        if(error) throw error;
        //  重定向
        buying.find({userid},function(error,buying){
            buyback.find({userid},function(error,buyback){
            buybackhistory.find({userid},function(error,buybackhistory){
                buysend.find({userid},function(error,buysend){
                cart.find({userid},function(error,cart){
                    user.find({userid},function(error,user){
            
                    res.render('mybook', { buying: buying , title:'我的订单管理' , buyback: buyback ,buysend: buysend,userid:userid,cart:cart,user:user,buybackhistory:buybackhistory});
                    })
                })
                })})
            })    
            })
    })
});



module.exports = router;