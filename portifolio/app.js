// import bodyParser from 'body-parser';

const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const blogRouter = require('./routes/blog');
const cvRouter = require('./routes/mycv')
const express = require('express');
const app = express();


app.use("/cv",cvRouter);
app.use("/blog",blogRouter);




// view engine setup
// app.set('views', path.join(__dirname,'/views/'));
// app.engine('html', exphbs({extname:'html'}));
app.set('view engine', 'ejs');

// static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// bodyparser midlleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.render('layouts/main');
  
  });

  app.post('/send',(req,res)=>{
    
    // console.log(req.body);
    const output = `
    <p>you have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name:${req.body.name}</li>
      <li>Email:${req.body.email}</li>
      <li>Subject:${req.body.subject}</li>
      <li>Message:${req.body.message}</li>
    </ul>
    `;
    
    async function main() {

        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, 
          auth: {
            user: 'senezaj2020@gmail.com', 
            pass: 'contagious2020', 
          },
          tls:{
              rejectUnauthorized:false
          }
        });
      
        
        let info = await transporter.sendMail({
          from: req.body.email, 
          to: "senezaj2020@gmail.com", 
          subject: "Hello ", 
        
          html: output
        });
      
        console.log("Message sent: %s", info.messageId);
        
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
      }
      
    main().catch(console.error);
    res.render('layouts/main',{msg:'your mesage has been sent.'})
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})