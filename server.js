// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));


var Users = {
	'count':0,
	'usernames':[]
};

io.on('connection', function (socket) {

	//Quand le client emet un 'send message'
	socket.on('send msg', function(data){
		//On emet au client d'exectuter 'new message'
		console.log('<'+data.user.username+'> '+data.message.text);
		socket.broadcast.emit('new msg', data);
	});

	socket.on('add user', function (username) {
		username = username.replace(" ","_");
		username = username.replace(/[^a-zA-Z0-9-_-]/g,'');

		if(!username || username == "<Server>" || Users.usernames[username]){
			username = "visiteur-"+Math.floor((Math.random() * 10000) + 1);
		}

		// we store the username in the socket session for this client
    	socket.username = username;

    	// add the client's username to the global list
    	Users.usernames[username] = username;
    	Users.count++;

    	console.log('<server> '+username+' join');

    	socket.emit('login', {
	  		username: username,
	  		allUsers: Users
    	});

    	socket.broadcast.emit('user joined', {
      		username: socket.username,
	  		allUsers: Users
    	});
	});

	socket.on('disconnect', function () {
	 	console.log('<server> '+socket.username+' left');
    	// remove the username from global usernames list
	   	delete Users.usernames[socket.username];
      	Users.count--;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        allUsers: Users
      });
  	});

});

function genereCid(username){
	Math.floor((Math.random() * 10000) + 1)
}


