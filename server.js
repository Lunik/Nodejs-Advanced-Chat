// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5000;
var md5 = require('md5'); //crypt

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));


var Users = {
	'count':0,
	'usernames':{}
};
var DEFAULSERVERNAME = 'SERVER';

var password = {
	'moderateur': 'd7163e6377d20276113e4e54efb61ad8',
	'admin': '21232f297a57a5a743894a0e4a801fc3'
}

io.on('connection', function (socket) {

	//Quand le client emet un 'send message'
	socket.on('send msg', function(data){
		//On emet au client d'exectuter 'new message'
		data.user.username = Users.usernames[data.user.uid].username;
		console.log('<'+data.user.username+'> '+data.message.text);
		socket.broadcast.emit('new msg', data);
	});

	socket.on('add user', function (username) {
		username = username.replace(" ","_");
		username = username.replace(/[^a-zA-Z0-9-_-]/g,'');
		usernameUp = username.toUpperCase();

		if(!username || usernameUp == DEFAULSERVERNAME || Users.usernames[username]){
			username = "visiteur-"+Math.floor((Math.random() * 10000) + 1);
		}


    	// add the client's username to the global list
    	var uid = genereUid(username);
    	Users.usernames[uid] = {
    		'username': username,
    		'ranks': {
    			'moderation':0
    		},
    		'uid': uid
    	}
    	Users.count = Users.count+1;

    	// we store the username in the socket session for this client
    	socket.username = username;
    	socket.uid = uid;

    	console.log(DEFAULSERVERNAME+' '+username+' join');

    	socket.emit('login', {
	  		user: Users.usernames[uid],
	  		allUsers: Users,
	  		serverName: DEFAULSERVERNAME
    	});

    	socket.broadcast.emit('user joined', {
      		username: socket.username,
	  		allUsers: Users
    	});
	});

	socket.on('disconnect', function () {
		if(socket.username){
		 	console.log(DEFAULSERVERNAME+' '+socket.username+' left');
	    	// remove the username from global usernames list
		   	delete Users.usernames[socket.uid];
	      	Users.count--;

	      // echo globally that this client has left
	      socket.broadcast.emit('user left', {
	        username: socket.username,
	        allUsers: Users
	      });
	  	}
	});

	socket.on('user info', function(uid){
		socket.emit('user info', Users.usernames[uid]);
	});
	///////////////
	// Commandes //
	///////////////

	socket.on('command',function(data){
		console.log('['+Users.usernames[data.uid].username+'] execute '+data.command.cmd+' '+data.command.param);
		var user = Users.usernames[data.uid];
		var command = data.command;
		var execCommand = 0;
		switch(command.cmd){
			case 'login':
				if(md5(data.command.param) == password.moderateur){
					promoteUser(data.uid,'moderation',1);
					socket.emit('cmd', {
						'valRetour': 1,
						'callback': 'login'
					});
					execCommand = 1;
					console.log('----> OK');
				} else if(md5(data.command.param) == password.admin){
					promoteUser(data.uid,'moderation',2);
					socket.emit('cmd', {
						'valRetour': 2,
						'callback': 'login'
					});
					execCommand = 1;
					console.log('----> OK');
				} else {
					socket.emit('cmd', {
						'valRetour': "Wrong password.",
						'callback': 'login'
					});
					execCommand = 1;
					console.log('----> FAIL');
				}
				break;

			case 'logout':
				promoteUser(data.uid,'moderation',0);
				socket.emit('cmd', {
						'valRetour': 0,
						'callback': 'logout'
					});
				execCommand = 1;
				console.log('----> OK');
				break;
			case 'list':
				if(user.ranks.moderation >= 1){
					socket.emit('cmd', {
						'valRetour': getAllUsernameConnected(),
						'callback': 'list'
					});
					execCommand = 1;
					console.log('----> OK');
				}
				break;
			case 'kick':
				if(user.ranks.moderation >= 1){
					execCommand = 1;
					console.log('kick '+data.command.param);

					socket.broadcast.emit('cmd', {
							'valRetour': data.command.param,
							'callback': 'kick'
					});

					var cid = generateMsgCid();
					socket.broadcast.emit('new msg', {
						'user': getServerUser(),
						'message': {
							'id': cid,
							'text': data.command.param+" was kicked by "+user.username
						}
					});

					socket.emit('new msg', {
						'user': getServerUser(),
						'message': {
							'id': cid,
							'text': data.command.param+" was kicked by "+user.username
						}
					});

					console.log('----> OK');
				}
				break;

			case 'removeMsg':
				if(user.ranks.moderation >= 1){
					execCommand = 1;

					socket.emit('cmd', {
							'valRetour': data.command.param,
							'callback': 'removeMsg'
					});

					socket.broadcast.emit('cmd', {
							'valRetour': data.command.param,
							'callback': 'removeMsg'
					});

					console.log('----> OK');
				}
				break;

			case 'clean':
				if(user.ranks.moderation >= 2){
					socket.emit('cmd', {
							'valRetour': 'Chat cleaned',
							'callback': 'clean'
					});

					socket.broadcast.emit('cmd', {
							'valRetour': '',
							'callback': 'clean'
					});

					execCommand = 1;
					console.log('----> OK');
				}
				break;
			default:
				socket.emit('cmd', {
						'valRetour': "Command not found.",
						'callback': ''
					});
				break;
		}

		if(!execCommand){
			socket.emit('cmd', {
						'valRetour': "Not permitted.",
						'callback': ''
					});
			console.log('----> FAIL');
		}
	});
});

function genereUid(username){
	var uid=1234567891234567;
	for(var i=0; i < username.length; i=i+3){
		if(username[i] && username[i+1])
			uid = uid - (username.charCodeAt(i)*username.charCodeAt(i+1));
		else if(username[i]){
			uid = uid - username.charCodeAt(i)
		}

		uid = uid.toString();
		uid = uid.split("").reverse().join("");
		uid = Number(uid);

		if(username[i+2])
			uid = uid * username.charCodeAt(i+2);
	}

	uid = Math.abs(uid) % 10000000000000000;
	return "uid-"+uid;
}

function getAllUsernameConnected(){
	var usernames = [];
	for (var uid in Users.usernames){
		usernames.push(Users.usernames[uid].username);
	}

	return usernames;
}

function promoteUser(uid, type, rank){
	Users.usernames[uid].ranks[type] = rank;
}

function generateMsgCid(){
	var date = new Date();
	var cid = date.getDate()+''+date.getMonth()+''+date.getYear()+''+date.getUTCHours()+''+date.getMinutes()+''+date.getSeconds()+''+date.getMilliseconds();
	cid = cid+''+Math.floor(Math.random()*10000);
	return cid;
}

function getServerUser(){
	return {
		'username': DEFAULSERVERNAME,
		'ranks': {
			'moderation': 1000
		}
	};
}
