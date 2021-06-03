var express = require('express');
var router = express.Router();
var blog = require('../model/blogs');
var book = require('../model/book')
var url = require('url');
var bookpage = require('../model/bookpage');
var swiper = require('../model/swiper');
var buying = require('../model/buying');//总订单
var buyback = require('../model/buyback');//退货单
var buybackhistory = require('../model/buybackhistory');//退货单
var buysend = require('../model/buysend');//发货单
var cart = require('../model/cart');//购物车
var user = require('../model/user');//用户表
const { time } = require('console');

/* GET home page. */

router.get('/', function(req, res) {
  swiper.find({},function(error,data){
    bookpage.find({},function(error,data2){
      res.render('index', { data: data ,title:'网上书店',data2:data2});
  })
  })

});



router.post('/mybook', function(req, res) {
  console.log(req.body.userid);
  let userid=req.body.userid;
  buying.find({userid},function(error,buying){
    buyback.find({userid},function(error,buyback){
    buybackhistory.find({userid},function(error,buybackhistory){
      buysend.find({userid},function(error,buysend){
        cart.find({userid},function(error,cart){
          user.find({userid},function(error,user){
    
            res.render('mybook', { buying: buying , title:'我的订单管理' , buyback: buyback ,buysend: buysend,userid:userid,cart:cart,user:user,buybackhistory:buybackhistory});
          })
        })
        })
      })
    })    
  })

});


router.post('/main',function(req,res){
  let userid=req.body.userid;
  user.find({userid:userid},function(error,user){
    bookpage.find({},function(error,bookpage){
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
      })
    })
      })
    })
      
  })
})



router.get('/artist',function(req,res){
  blog.find({},function(error,data){
    res.render('artist', { 
      data: data,
      title:'首页'
     });
})
})

router.get('/news',function(req,res){
  res.render('books',{
      title:'新品推荐',
      imgurl_a:'http://47.106.245.68/image/bookshop/top_swiper/1.jpg',
      imgurl_b:'http://47.106.245.68/image/bookshop/top_swiper/2.jpg',
      imgurl_c:'http://47.106.245.68/image/bookshop/top_swiper/3.jpg',
      page_num:'2'
  })
})

router.get('/max',function(req,res){
  res.render('books', { 
  title: '特色书店',
      imgurl_a:'http://47.106.245.68/image/bookshop/top_swiper/1.jpg',
      imgurl_b:'http://47.106.245.68/image/bookshop/top_swiper/2.jpg',
      imgurl_c:'http://47.106.245.68/image/bookshop/top_swiper/3.jpg',
      page_num:'3'
  });
})

router.get('/ebook',function(req,res){
  res.render('books', { 
    title: '数字内容',
    imgurl_a:'http://47.106.245.68/image/bookshop/top_swiper/1.jpg',
    imgurl_b:'http://47.106.245.68/image/bookshop/top_swiper/2.jpg',
    imgurl_c:'http://47.106.245.68/image/bookshop/top_swiper/3.jpg',
    page_num:'4'
  });
})

router.get('/me',function(req,res){
  res.render('me',{
      title:'我的'
  })
})

router.get('/help',function(req,res){
  res.render('help',{
      title:'售后服务'
  })
})

router.get('/houtai',function(req,res){
  res.render('houtai',{
      title:'后台管理系统'
  })
})

router.get('/join',function(req,res){
  res.render('join',{
      title:'加入我们'
  })
})

router.get('/buysuccess',function(req,res){
  res.render('buysuccess',{
      title:'订单创建成功'
  })
})

router.get('/buydropsuccess',function(req,res){
  res.render('buydropsuccess',{
      title:'订单删除成功'
  })
})

router.get('/login',function(req,res){
  res.render('login',{
      title:'登陆'
  })
})

router.get('/bookshop',function(req,res){
  res.render('bookshop',{
      title:'网上书店'
  })
})

router.get('/bookmessage',function(req,res){
  res.render('bookmessage',{

  })
})






module.exports = router;
