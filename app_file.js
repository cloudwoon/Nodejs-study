var express = require('express');
var app = express(); //애플리케이션 객체를 리턴함.
var bodyParser = require('body-parser');
var fs = require('fs'); //파일시스템 모듈 가져오기

app.use(bodyParser.urlencoded({extended:false}));
app.set('views', './views_file');//템플릿을 어떤 디렉토리에 저장할건지를 명시해줌.
app.set('view engine','jade');//템플릿 엔진으로 jade를 쓴다는 것을 명시.
app.locals.pretty = true;//jade 템플릿이 html로 바뀔 때 자동 줄바꿈 해줌.

app.get('/topic/new', function(req,res){
    res.render('new');
})

app.get('/topic', function(req,res){
    fs.readdir('data', function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        //files에는 data 폴더에 담긴 파일들이 배열로 담겨있음.
        res.render('view', {topics:files});
    })
})
app.post('/topic', function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title,description, function(err){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        res.send('Success!');
    });
})
app.listen(3000,function(){
    console.log('Connected, 3000 port!');
})