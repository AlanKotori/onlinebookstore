var express = require('express');
var router = express.Router();
var user = require('../model/user');
var findcode = require('../model/code');
var bookpage = require('../model/bookpage');
var cart = require('../model/cart');
var buying = require('../model/buying');//总订单
var buyback = require('../model/buyback');//退货单
var buysend = require('../model/buysend');//发货单
const { createTestAccount } = require('nodemailer');

router.get('/', function(req, res) {
    user.find({},function(error,data){
        res.render('userbase', { data: data });
    })
  
});


router.post('/userupdate', function(req, res) {
    user.find({userid:req.body.userid},function(error,data){
        res.render('userupdate', { data: data });
    })
});

router.post('/saveuser', function(req, res) {
    // user.create
    let userid=req.body.userid;
    let yanzhengcode = req.body.code
    console.log(yanzhengcode);
    console.log(req.body.usermail);
    
    findcode.find({email:req.body.usermail},function(error,data){
        console.log(data[0].code)
        console.log(data[0].code-Date.now())

        if((Date.now()-data[0].time)<=300000){
            if(data[0].code==yanzhengcode){
          user.find({userid:userid},function(error,data){
        if(data==''){
            user.create({
            userid:req.body.userid,
            userwho:req.body.userwho,
            usermail:req.body.usermail,
            username:req.body.username,
            userpasswd:req.body.userpasswd,
            userwhere:req.body.userwhere
        },function(error,data){
            if(error) throw error;
            //  重定向
            res.redirect('/login')
            }) 
        }else{
            res.render('join', { title: '该账号已被注册' });
        }
    })  
        }else{
            res.render('join',{ title: '邮箱验证码不正确'});
        }
        }else{
            res.render('join',{
                title: '验证码有效期为5分钟，已过有效期'
            })
        }
        
    })
     
});



router.post('/saveur', function(req, res) {
    
    user.create({
        userid:req.body.userid,
        userwho:req.body.userwho,
        usermail:req.body.usermail,
        username:req.body.username,
        userpasswd:req.body.userpasswd,
        userwhere:req.body.userwhere
    },function(error,data){
        if(error) throw error;
        //  重定向
        res.redirect('back')
    })
});

router.get('/useradd',function(req,res){
    res.render('useradd', { title: '加入新内容' });
})

router.post('/del', function(req, res) {
    console.log(req.body);
    user.remove({
       userid:req.body.del
    },function(error,data){
        //  重定向
        //  重新请求了/database
        res.redirect('/userbase')

        
    })
});


router.post('/update', function(req, res) {
    user.findOneAndUpdate({
        _id:req.body._id
    },{
        $set:{
            userid:req.body.userid,
            userwho:2,
            usermail:req.body.usermail,
            username:req.body.username,
            userpasswd:req.body.userpasswd,
            userwhere:req.body.userwhere
        }
    },{},function(error,data){
        //  重定向
        //  重新请求了/bookbase
        user.find({userid:req.body.userid},function(error,data){
            res.render('userupdate', { data: data });
        })
    })
});

router.post('/loginmessage',function(req,res){
    let userid=req.body.userid;
    let userpasswd=req.body.userpasswd;
    
    user.find({userid:userid},function(error,user){
        if(user==''){
            res.render('login',{title: '该账户不存在'});
        }

        else if(user[0].userpasswd==userpasswd){
            if(user[0].userwho==2){
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
            }
            else{
                let usernamec=user[0].username;
                res.render('houtai',{username:usernamec})
            }
        }
        
        else{
            res.render('login',{title: '密码错误，请重新登陆'});
        }
    })
})


module.exports = router;