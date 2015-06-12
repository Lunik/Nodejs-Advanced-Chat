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
	'usernames':{}
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


    	// add the client's username to the global list
    	var cid = genereCid(username);
    	Users.usernames[cid] = {
    		'username': username,
    		'ranks': {
    			'moderation':0
    		},
    		'cid': cid
    	}
    	Users.count = Users.count+1;

    	// we store the username in the socket session for this client
    	socket.username = username;
    	socket.cid = cid;

    	console.log('<server> '+username+' join');

    	socket.emit('login', {
	  		user: Users.usernames[cid],
	  		allUsers: Users
    	});

    	socket.broadcast.emit('user joined', {
      		username: socket.username,
	  		allUsers: Users
    	});
	});

	socket.on('disconnect', function () {
		if(socket.username){
		 	console.log('<server> '+socket.username+' left');
	    	// remove the username from global usernames list
		   	delete Users.usernames[socket.cid];
	      	Users.count--;

	      // echo globally that this client has left
	      socket.broadcast.emit('user left', {
	        username: socket.username,
	        allUsers: Users
	      });
	  	}
	});


	///////////////
	// Commandes //
	///////////////

	socket.on('command',function(data){
		console.log('['+Users.usernames[data.cid].username+'] execute '+data.command.cmd+' '+data.command.param);
		var user = Users.usernames[data.cid];
		var command = data.command;
		var execCommand = 0;
		switch(command.cmd){
			case 'list':
				if(user.ranks.moderation >= 1){
					socket.emit('cmd', {
						'valRetour': getAllUsernameConnected(),
						'callback': ''
					});
					execCommand = 1;
					console.log('----> OK');
				}
				break;
			default:
				socket.emit('cmd', {
						'valRetour': "Command not found",
						'callback': ''
					});
				break;
		}

		if(!execCommand){
			socket.emit('cmd', {
						'valRetour': 'Not permitted',
						'callback': ''
					});
			console.log('----> FAIL');
		}
	});
});

function genereCid(username){
	var cid=1234567891234567;
	for(var i=0; i < username.length; i=i+3){
		if(username[i] && username[i+1])
			cid = cid - (username.charCodeAt(i)*username.charCodeAt(i+1));
		else if(username[i]){
			cid = cid - username.charCodeAt(i)
		}

		cid = cid.toString();
		cid = cid.split("").reverse().join("");
		cid = Number(cid);

		if(username[i+2])
			cid = cid * username.charCodeAt(i+2);
	}

	cid = Math.abs(cid) % 10000000000000000;
	return "cid-"+cid;
}

function getAllUsernameConnected(){
	var usernames = [];
	for (var cid in Users.usernames){
		usernames.push(Users.usernames[cid].username);
	}

	return usernames;
}

