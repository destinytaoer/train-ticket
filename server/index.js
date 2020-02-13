const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.end('hello')
})

app.listen(5000, ()=> console.log('service started at localhost:5000'))