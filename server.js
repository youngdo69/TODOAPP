const express = require ('express');
const app = express();

app.listen(8080, function(){
    console.log('listening on 8080')
});

// 누군가가 /pet 으로 방문을 하면 pet 관련한 안내문을 띄워주자

app.get('/pet', function(req, 응답){
    응답.send('펫 용품 쇼핑할 수 있는 페이지 입니다.');
});   

    
app.get('/beauty', function(req, 응답){
    응답.send('뷰티 용품 쇼핑할 수 있는 페이지 입니다.');
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});