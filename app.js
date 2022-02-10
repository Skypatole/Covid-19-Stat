const mysql =require("mysql");
const express = require("express");
const app = express();
const path =require('path');
//const covied
const router = express.Router();
const dotenv =require("dotenv");
const cookieParser = require('cookie-parser');
// const session = require('express-session')

dotenv.config({path:'./.env'});
app.set('view engine','hbs');
const pathDirectory = path.join(__dirname,'./public');
console.log(__dirname);
app.use(express.static(pathDirectory));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());



//database connection start here 
const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
    // database:'nodejs-login'
});
db.connect(function(err) {
    if(err) throw err;
    console.log('Mysql Connected!');
});

    // define Router
    app.use('/', require('./routes/pages'));
    app.use('/auth', require('./routes/auth'));
  

app.listen(5001,  ()=> {
    console.log("Server is running on the port 5001......");
})



//nodemailer

var nodemailer = require('nodemailer');
const { getMaxListeners } = require("process");

var transport = nodemailer.createTransport(
{
    service: 'gmail',
    auth:{
        user:'patoleakash457@gmail.com',
        pass:'klig nyhk ygdx kctv'
    }
}
)

// send to mail

var mailOptions = {
    from:'patoleakash457@gmail.com',
    to:'akashpatole9619@gmail.com, akarshachidurala1819@gmail.com', 
    subject:'Registration mail',
    text:'Thank you for reaching us! You are successfully registered.',
}

transport.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error)
    }else{
        console.log("Email sent" + info.response)
    }
})


