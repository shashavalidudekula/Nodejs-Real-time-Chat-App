var express = require("express");
var app = express();
var port = process.env.PORT || 3700;

// Set view of '/' end point
app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});


app.get('/shasha', function(request, response) {
    //response.send("<h2><center>Welcome to Node JS app</h2>");
    response.set("Content-Type","text/html");
    response.write("<h2><center><u>Node JS  Application </u></center></h2>");
	
    response.write("<h2><center>Welcome to  Mithun Technologies. Please Contact +91-9980923226 for more information or send an email to devopstrainingblr@gmail.com <center></h2>" );
    response.end();
    
  })

// use our puclic/chat.js file as listener
app.use(express.static(__dirname + '/public'));
// Set port
var midPort = app.listen(port, function () {
    console.log('Node.js listening on port ' + port);
})

var io = require('socket.io').listen(midPort);
// set up socket connection
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'Welcome to the Real Time Web Chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
