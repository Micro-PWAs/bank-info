var compression = require('compression');
var express = require('express');
var fetch = require('node-fetch');
var app = express();
var cache = {};

app.use(compression());
app.use(express.static('public'));
app.use('/dist', express.static('dist'));

app.use('/api/:path', function(req, res){
  var path = req.params.path;
  if(cache[path]){
    res.json( cache[path] );
    return;
  }

  fetch(`http://api.techm.co.in/api/${path}`)
  .then( response => response.json())
  .then( json => {
    cache[path] = json;
    res.json( json );
  }).catch(err => {
    console.log(err.toString());
    res.end(404);
  })
});

app.listen(9000, function(){
  console.log('App started on port: 9000');
})