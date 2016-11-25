var express = require('express');
var app = express();

app.use(express.static('public'));
app.use('/dist', express.static('dist'));

app.listen(9000, function(){
  console.log('App started on port: 9000');
})