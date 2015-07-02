COMMANDS = {
	'login': function(mdp){
		if(mdp){
			socket.emit('command', {
				'uid': USER.uid,
				'command': {
					'cmd':'login',
					'param': mdp
				}
			});
		} else {
			addServerMessage('Wrong Password.');
			playSound('error');
		}
	},
	'logout': function(){
		if(USER.ranks.moderation >= 1){
			socket.emit('command', {
				'uid': USER.uid,
				'command': {
					'cmd':'logout',
					'param': []
				}
			});
		} else {
			addServerMessage('Not permitted.');
			playSound('error');
		}
	},
	'list': function (){
		var usr = getAllUsernameRoom(USER.room);
		var listUsr = '';
		for(var i=0; i< usr.length ;i++){
			listUsr = listUsr+'<span class="username">'+usr[i]+'</span>, ';
		}
		addServerMessage(listUsr);
	},
	'kick': function (username){
		if(USER.ranks.moderation >= 1){
			var uid = getUidFromUsername(username);
			if(uid){
				socket.emit('command', {
					'uid': USER.uid,
					'command': {
						'cmd':'kick',
						'param': uid
					}
				});
			} else {
				addServerMessage(username+' not found.');
				playSound('error');
			}
		} else {
			addServerMessage('Not permitted.');
			playSound('error');
		}
	},
	'ban': function (username){
		if(USER.ranks.moderation >= 2){
			socket.emit('command', {
				'uid': USER.uid,
				'command': {
					'cmd':'ban',
					'param': username
				}
			});
		} else {
			addServerMessage('Not permitted.');
			playSound('error');
		}
	},
	'removeMsg': function(cid){
		if(USER.ranks.moderation >= 1){
			if($('.msg.'+cid).length && !$('.msg.'+cid+' .text .deleted').length){
				socket.emit('command', {
					'uid': USER.uid,
					'command': {
						'cmd':'removeMsg',
						'param': cid
					}
				});
			}
		} else {
			addServerMessage('Not permitted.');
			playSound('error');
		}
	},
	'clear': function(){
		clearChat();
		addServerMessage('Chat cleared');
	},
	'clean': function(){
		if(USER.ranks.moderation >= 2){
			socket.emit('command', {
				'uid': USER.uid,
				'command': {
					'cmd':'clean',
					'param': []
				}
			});
		} else {
			addServerMessage('Not permitted.');
			playSound('error');
		}
	},
	'command': function(){
		addServerMessage('<a href="https://github.com/Lunik/Lunik-Chat-V2.0/blob/master/README.md#commandes" target="_blank">Commands list.</a>');
	},
	'popup': function(html){
		if(USER.ranks.moderation >= 2){
			if(html){
				socket.emit('command', {
					'uid': USER.uid,
					'command': {
						'cmd':'popup',
						'param': html
					}
				});
			}
		} else {
			addServerMessage('Not permitted.');
			playSound('error');
		}
	},
	'msg': function(msg){
		if(msg.toUid){
			addChatMessage(msg);
			socket.emit('command', {
				'uid': USER.uid,
				'command': {
					'cmd':'msg',
					'param': msg
				}
			});
		} else {
			addServerMessage("User not Found.");
			playSound('error');
		}
	},
	'version': function(){
		addServerMessage("Chat version: "+VERSION);
	},
	'quit': function(){
		clearData();
		location.reload();
	},
	'join': function(r){
		if(r.room && r.room == '('+r.room.replace(/[()]/g,'')+')' && USER.ranks.moderation < 1 && !r.invite){
			addServerMessage(r.room+' is a private room.');
			playSound('error');
			setParamRoom(USER.room);
		} else {
			//salle prive ou non
			if(r.priv && r.priv != 'false')
				r.priv = true;
			else
				r.priv = false;

			//verif du nom de salle
			if(r.room){
				if(USER.ranks.moderation < 1 && !r.invite){
					r.room = r.room.substring(0,9);
					r.room = r.room.replace(/[^\w\s]/gi,'');
				}
			} else {
				r.room = 'Default';
			}

			if(r.room != USER.room){
				socket.emit('command', {
					'uid': USER.uid,
					'command': {
						'cmd':'join',
						'param': {room: r.room, priv: r.priv, invite: r.invite}
					}
				});
			} else {
				addServerMessage('You are already in \"'+r.room+'\" room.');
				playSound('error');
			}
		}
	},
	'slow': function(slow){
		if(USER.ranks.moderation >= 1){
			if(slow && slow == parseInt(slow, 10)){
				slow = parseInt(slow, 10);
				socket.emit('command', {
					'uid': USER.uid,
					'command': {
						'cmd':'slow',
						'param': slow
					}
				});
			} else {
				addServerMessage('Slow actuel: '+SLOW+'s.');
			}
		} else {
			addServerMessage('Slow actuel: '+SLOW+'s.');
		}
	},
	'invite': function(inviteUid){
		if(inviteUid){
			socket.emit('command', {
				'uid': USER.uid,
				'command': {
					'cmd': 'invite',
					'param': inviteUid
				}
			});
		} else {
			addServerMessage("User not Found.");
			playSound('error');
		}
	}
}

function sendCommand(){
	var commandeMsg = $inputMessage.val();
	if(commandeMsg){
		cleaInput($inputMessage);

		commandeMsg = commandeMsg.split(' ');
		var commande = {
			'cmd': commandeMsg.shift().substring(1),
			'param': commandeMsg
		}
	}

	//exectution de la commande
	execCommand(commande);

}

function execCommand(data){
	var valRetour = {};
	if(data.param[0])
		data.param[0] = data.param[0].replace('@','');

	switch(data.cmd){

		case 'login':
			COMMANDS.login(data.param[0]);
			break;

		case 'logout':
			COMMANDS.logout();
			break;

		case 'list':
			COMMANDS.list();
			break;

		case 'kick':
			COMMANDS.kick(data.param[0]);
			break;

		case 'ban':
			COMMANDS.ban(data.param[0]);
			break;

		case 'removeMsg':
			COMMANDS.removeMsg(data.param[0]);
			break;

		case 'clear':
			COMMANDS.clear();
			break;

		case 'clean':
			COMMANDS.clean();
			break;

		case 'command':
			COMMANDS.command();
			break;

		case 'popup':
			COMMANDS.popup(data.param.join(' '));
			break;

		case 'msg':
			var target = data.param[0];
			var message = data.param;
			message.shift();
			message = message.join(' ');

			var dataMsg = {
				'user': USER,
				'toUid':getUidFromUsername(target),
				'message': {
					'id': generateMsgCid(),
					'text': message,
					'private': true
				}
			};

			COMMANDS.msg(dataMsg);
			break;

		case 'version':
			COMMANDS.version();
			break;

		case 'quit':
			COMMANDS.quit();
			break;

		case 'join':

			COMMANDS.join({
				room: data.param[0],
				priv: data.param[1]
			});
			break;

		case 'invite':
			COMMANDS.invite(getUidFromUsername(data.param[0]));
			break;

		case 'slow':
			COMMANDS.slow(data.param[0]);
			break;

		default:
			playSound('error');
			valRetour = {
				'etat': 0,
				'message': "Command not found."
			};
			break;
	}

	return valRetour;
}
