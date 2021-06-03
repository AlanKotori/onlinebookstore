const { request } = require('express');
var express = require('express');
var router = express.Router();
var bookpage = require('../model/bookpage');
var buying = require('../model/buying');
var buyback = require('../model/buyback');
var buybackhistory = require('../model/buybackhistory');
var buysend = require('../model/buysend');
var cart = require('../model/cart');
const user = require('../model/user');


router.get('/', function(req, res) {
    buying.find({},function(error,data){
        res.render('buyingbase', { data: data });
    })
  
});

router.post('/find', function(req, res) {
    let pageid = req.body.pageid
    buying.find({pageid:pageid},function(error,data){
        res.render('buyingbase', { data: data });
    })
});

router.post('/findsend', function(req, res) {
    let pageid = req.body.pageid
    buysend.find({pageid:pageid},function(error,data){
        res.render('buysend', { data: data });
    })
});

router.post('/findback', function(req, res) {
    let pageid = req.body.pageid
    buyback.find({pageid:pageid},function(error,data){
        res.render('backbuybase', { data: data });
    })
});


router.get('/send', function(req, res) {
    buysend.find({},function(error,data){
        res.render('buysend', { data: data });
    })
  
});

router.get('/backbuybase', function(req, res) {
    buyback.find({},function(error,data){
        res.render('backbuybase', { data: data });
    })
  
});

router.get('/backbuyhistory', function(req, res) {
    buybackhistory.find({},function(error,data){
        res.render('backhistory', { data: data });
    })
  
});


router.post('/savegoods', function(req, res) {
    let pageid = Math.ceil(Math.random()*10000000);
    // blog.create
    buying.create({
        userid:req.body.userid,
        bookname:req.body.bookname,
        buy_date:Date(),
        bookid:req.body.bookid,
        buy_where:req.body.buy_where,
        buy_money:req.body.buy_money,
        pageid:pageid
    },function(error,data){

        buysend.create({
            userid:req.body.userid,
            bookname:req.body.bookname,
            buy_date:Date(),
            bookid:req.body.bookid,
            buy_where:req.body.buy_where,
            buy_money:req.body.buy_money,
            pageid:pageid
        },function(error,data){
            cart.findOneAndRemove({cartid:req.body.cartid},function(error,data){
                if(error) throw error;
            //  重定向
            let userid = req.body.userid;
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
            })

            
        })


    })
});



router.post('/savegoodsfromcart', function(req, res) {
    let userid = req.body.userid;
    //从cart返回的有userid，bookid,cartid
    user.find({userid:userid},function(error,user){
        let book_id = req.body.bookid;
        let cartid = '';
        if(req.body.cartid)
        cartid = req.body.cartid;
        bookpage.find({id:book_id},function(error,bookpage){
            res.render('next', { title: '请点击下一步继续完成购买' ,user:user,bookpage:bookpage,cartid:cartid});
            })
        })
});

router.post('/userback',function(req,res){
    buying.find({pageid:req.body.pageid},function(error,buying){
        user.find({userid:req.body.userid},function(error,user){
            if(error) throw error;
            res.render('nextback', { user:user , title:'请确认您的退款信息' ,buying:buying });
        })
    })
})

router.post('/backgoods', function(req, res) {
    buying.find({pageid:req.body.pageid},function(error,data8){
        let userid=req.body.userid;
        let bookname=req.body.bookname;
        let buy_where=req.body.buy_where;
        let buy_money=req.body.buy_money;
        let pageid=req.body.pageid;
        let back_why=req.body.back_why;
        buybackhistory.create({
            userid:userid,
            bookname:bookname,
            buy_date:Date(),
            buy_where:buy_where,
            buy_money:buy_money,
            pageid:pageid,
            back_why:back_why
        },function(error,data){
        buyback.create({
        userid:userid,
        bookname:bookname,
        buy_date:Date(),
        buy_where:buy_where,
        buy_money:buy_money,
        pageid:pageid,
        back_why:back_why
    },function(error,data){
            buysend.findOneAndRemove({
                pageid:req.body.pageid
                },function(error,data){
                        
                             if(error) throw error;
                            //  重定向
                            let userid = req.body.userid;
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
                        }) 
                
            })
       })
    })
});




router.post('/del', function(req, res) {
    console.log(req.body);
    buying.remove({
        _id:req.body.del
    },function(error,data){
        //  重定向
        //  重新请求了/bookbase
        res.redirect('back')
    })
});

router.post('/delback', function(req, res) {
    console.log(req.body);
    buyback.remove({
        _id:req.body.del
    },function(error,data){
        //  重定向
        //  重新请求了/bookbase
        res.redirect('back')
    })
});

router.post('/delbackhistory', function(req, res) {
    console.log(req.body);
    buybackhistory.remove({
        _id:req.body.del
    },function(error,data){
        //  重定向
        //  重新请求了/bookbase
        res.redirect('back')
    })
});
router.post('/delsend', function(req, res) {
    console.log(req.body);
    buysend.remove({
        _id:req.body.del
    },function(error,data){
        //  重定向
        //  重新请求了/bookbase
        res.redirect('back')
    })
});


module.exports = router;