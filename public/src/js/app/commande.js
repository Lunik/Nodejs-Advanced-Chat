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
		if(r[0] && r[0] == '('+r[0].replace(/[()]/g,'')+')' && USER.ranks.moderation < 1){
			addServerMessage(r[0]+' is a private room.');
			playSound('error');
			setParamRoom(USER.room);
		} else {
			//salle prive ou non
			if(r[1] && r[1] != 'false')
				r[1] = true;
			else
				r[1] = false;

			//verif du nom de salle
			if(r[0]){
				if(USER.ranks.moderation < 1){
					r[0] = r[0].substring(0,9);
					r[0] = r[0].replace(/[^\w\s]/gi,'');
				}
			} else {
				r[0] = 'Default';
			}

			if(r[0] != USER.room){
				socket.emit('command', {
					'uid': USER.uid,
					'command': {
						'cmd':'join',
						'param': {room: r[0], priv: r[1]}
					}
				});
			} else {
				addServerMessage('You are already in \"'+r[0]+'\" room.');
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
	var commandReturn = execCommand(commande);
	//affichages des resultats de la commande
	if(commandReturn.message)
		addServerMessage(commandReturn.message);

}

function execCommand(data){
	var valRetour = {};
	if(data.param[0])
		data.param[0] = data.param[0].replace('@','');

	switch(data.cmd){

		case 'login':
			COMMANDS.login(data.param[0]);
			valRetour = {
				'etat': 1,
				'message': ''
			};
			break;

		case 'logout':
			COMMANDS.logout();
			valRetour = {
				'etat': 1,
				'message': ''
			};
			break;

		case 'list':
			COMMANDS.list();
			valRetour = {
				'etat': 1,
				'message': ''
			};
			break;

		case 'kick':
			COMMANDS.kick(data.param[0]);
			valRetour = {
				'etat': 1,
				'message': ''
			};
			break;

		case 'ban':
			COMMANDS.ban(data.param[0]);
			valRetour = {
				'etat': 1,
				'message': ''
			};
			break;

		case 'removeMsg':
			COMMANDS.removeMsg(data.param[0]);
			valRetour = {
				'etat': 1,
				'message': ''
			};
			break;

		case 'clear':
			COMMANDS.clear();
			valRetour = {
				'etat': 1,
				'message': ''
			};
			break;

		case 'clean':
			COMMANDS.clean();
			valRetour = {
				'etat': 1,
				'message': ''
			};
			break;

		case 'command':
			COMMANDS.command();
			valRetour = {
				'etat': 1,
				'message': ''
			};
			break;

		case 'popup':
			COMMANDS.popup(data.param.join(' '));
			valRetour = {
				'etat': 1,
				'message': ''
			};
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

			valRetour = {
				'etat': 1,
				'message': ''
			};
			break;
		case 'version':
			COMMANDS.version();
			valRetour = {
				'etat': 1,
				'message': ''
			};
			break;
		case 'quit':
			COMMANDS.quit();
			valRetour = {
				'etat': 1,
				'message': ''
			};
			break;
		case 'join':
			COMMANDS.join(data.param);
			valRetour = {
				'etat': 1,
				'message': ''
			};
			break;
		case 'slow':
			COMMANDS.slow(data.param[0]);
			valRetour = {
				'etat': 1,
				'message': ''
			};
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
