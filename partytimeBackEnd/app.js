var app = require('./config/server');
const port = 3333;

app.listen(port,function(){
  console.log(`servidor On, servindo na porta ${port}`);
});
