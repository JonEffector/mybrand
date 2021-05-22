const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Article = require('../models/article');
const articleRouter = require('./article');
var router =express.Router();

mongoose.connect('mongodb://localhost:27017/BlogDB', {useNewUrlParser:true, useCreateIndex:true});


router.use(express.urlencoded({extended:false}));
router.use(methodOverride('_method'))


router.get('/articles',(req,res)=>{
  res.render('blog/articles');

});



router.get("/", async(req,res)=>{
  const articles = await Article.find().sort({createdAt:'desc'});
  res.render('articles/index',{articles:articles})
})


router.use("/articles",articleRouter);


module.exports = router