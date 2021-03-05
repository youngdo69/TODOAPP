const express = require ('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');

MongoClient.connect('mongodb+srv://youngdo69:11jsreal@cluster0.mbojt.mongodb.net/myFirstDatabase?retryWrites=true&w=majorityL', function(에러, client){
    if (에러) return console.log(에러)

    db = client.db('TodoApp');

    // db.collection('post').insertOne({_id: 100, 이름: 'John', 나이: 20}, function(에러,결과){
    //     console.log('저장완료');
    // });

    app.listen(8080, function() {
      console.log('listening on 8080')
    })
  })

// 누군가가 /pet 으로 방문을 하면 pet 관련한 안내문을 띄워주자

app.get('/pet', function(요청, 응답){
    응답.send('펫 용품 쇼핑할 수 있는 페이지 입니다.');
});   

    
app.get('/beauty', function(req, 응답){
    응답.send('뷰티 용품 쇼핑할 수 있는 페이지 입니다.');
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/write', function(req, res){
    res.sendFile(__dirname + '/write.html');
});

// 어떤 사람이 /add 경로로 post 요청을 하면 ? ? 를 해주세요
app.post('/add', function(요청,응답){
    응답.send('전송완료');
    console.log(요청.body.title);
   
    db.collection('counter').findOne({name: "게시물갯수"}, function(에러, 결과){
        console.log(결과.totalPost);
        var 총게시물갯수 = 결과.totalPost;
        db.collection('post').insertOne({ _id: 총게시물갯수 + 1, 제목: 요청.body.title, 날짜: 요청.body.date}, function(에러,결과){
            console.log('저장완료');
            
            db.collection('counter').updateOne({name: "게시물갯수"}, { $inc: {totalPost: 1} }, function(에러, 결과){
                if(에러){ return console.log(에러) }
            })
        }); 


    });
    
});

app.get('/list', function(요청, 응답){
    db.collection('post').find().toArray(function(에러, 결과){
      console.log(결과)
      응답.render('list.ejs', { posts : 결과 })
    });
  })

app.delete('/delete', function(요청,응답){
    console.log(요청.body);
    요청.body._id = parseInt(요청.body._id);
    db.collection('post').deleteOne(요청.body, function(에러, 결과){
        console.log('삭제완료');
    })
})