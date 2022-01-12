let express = require("express");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let dbo = require('./database/conn');

const projectRouter = require('./routes/projects');
const studentRouter = require('./routes/student');



var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.use('/api/projects', projectRouter);
app.use('/api/student', studentRouter);

//app.get("/test", function (request, response) {
//   var user_name = request.query.user_name;
//   response.end("Hello " + user_name + "!");
// });

app.get("/add/:n1/:n2", function (request, response) {
  const a = parseInt(request.params.n1);
  const b = parseInt(request.params.n2);
  const result = a + b || null;
  console.log(result);
  if (result == null) {
      response.status(400).json({error:'bad input, the input should be two numbers'});
  } else {
      response.json({ result: result });
  }

});

app.post("/project", function (request, response){
  if(!request.body)
      response.sendStatus(500);

    dbo.getDB()
      .collection("project")
      insertOne(request.body);

    response.sendStatus(204);
});

//socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);

});



dbo.connect((err) => {

  if(err){
    console.error(err);
    process.exit();
  }

  http.listen(port, () => { 
    console.log("Listening on port ", port);
  });

});



//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();
