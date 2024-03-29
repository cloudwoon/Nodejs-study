var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}))
app.get('/form', function(req,res){
  res.render('form');
});
app.post('/form_receiver',function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+', '+description); 
});

app.get('/topic/:id',function(req,res){
  var topics = [
    'Javascript is ...',
    'Nodejs is ...',
    'Express is ...'
  ];
  var output =  `
  <a href="/topic/0">Javascript</a><br>
  <a href="/topic/1">Nodejs</a><br>
  <a href="/topic/2">Express</a><br><br>
  ${topics[req.params.id]}
  `
  res.send(output);
});

app.get('/topic/:id/:mode', function(req,res){
  res.send(req.params.id+','+req.params.mode);
})

app.get('/template', function(req,res){
  res.render('temp');
});

app.get('/',function(req,res){
  res.send('Hello Home page!');
});

app.get('/login',function(req,res){
  res.send('Please Login..');
});

app.listen(3000, function(){
  console.log('Connected 3000 port!');
})

app.get('/route',function(req,res){
  res.send('Hello Router, <img src="/woon.png">');
});

app.get('/dynamic',function(req,res){
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        안녕 다이나믹!
    </body>
  </html>
  `
  res.send(output);
});