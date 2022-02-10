const mysql =require("mysql");
const express = require("express");
// const covdata = require('../india/api.json');
// console.log(covidata);
const router = express.Router();
var fs =require('fs');
const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

router.get('/',(req,res) => {
    res.render('index.hbs');
});
router.get('/register',(req,res) => {
    res.render('register.hbs');
});
router.get('/login',(req,res) => {
    res.render('login.hbs');
});
router.get('/home', (req,res) => {
    if(req.session.userId){
        var name , image;
        db.query('SELECT * FROM userfinal where email = ?',[req.session.userId],(err,result) => {
           name = result[0].name;
           image = result[0].image;
           console.log('name is '+name+'image name is'+image);
           return res.render('home.hbs',{name, image});
        })
    } else {
        res.redirect('/');
    }
})
router.get('/logout' , (req,res) => {
    req.session.destroy();
    res.redirect('/');
});

 router.get('/view', (req,res) =>{
            if(req.session.userId){
        var name , image;
        db.query('SELECT * FROM userfinal where email = ?',[req.session.userId],(err,result) => {
           name = result[0].name;
           image = result[0].image;
           console.log('name is '+name+'image name is'+image);
           fs.readFile('C:/users/sky/ss.txt', 'utf8',(err,data) =>{
               console.log(data);
           return res.render('home.hbs',{name, image});
    }); 
 });
}else {
    res.redirect('/');
  }
});
router.get('/india',(req,res) =>
{
 res.render('india.hbs',{item:covdata})
});

 module.exports = router;

 