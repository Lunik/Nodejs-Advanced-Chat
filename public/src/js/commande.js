COMMANDS = {
	'login': function(mdp){
		socket.emit('command', {
			'uid': USER.uid,
			'command': {
				'cmd':'login',
				'param': mdp
			}
		});
	},
	'logout': function(){
		socket.emit('command', {
			'uid': USER.uid,
			'command': {
				'cmd':'logout',
				'param': []
			}
		});
	},
	'list': function (){
		socket.emit('command', {
			'uid': USER.uid,
			'command': {
				'cmd':'list',
				'param': []
			}
		});
	},
	'kick': function (username){
		if(getUidFromUsername(username)){
			socket.emit('command', {
				'uid': USER.uid,
				'command': {
					'cmd':'kick',
					'param': username
				}
			});
		} else {
			addServerMessage(username+' not found');
		}
	},
	'removeMsg': function(cid){
		if($('.msg.'+cid).length && !$('.msg.'+cid+' .text .deleted').length){
			socket.emit('command', {
				'uid': USER.uid,
				'command': {
					'cmd':'removeMsg',
					'param': cid
				}
			});
		}
	},
	'clean': function(){
		socket.emit('command', {
			'uid': USER.uid,
			'command': {
				'cmd':'clean',
				'param': []
			}
		});
	},
	'command': function(){
		addServerMessage('<a href="https://github.com/Lunik/Lunik-Chat-V2.0/blob/master/README.md#commandes" target="_blank">Commands list</a>');
	}
}

function sendCommand(){
	var commandeMsg = cleanMessage($inputMessage.val());
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

		case 'removeMsg':
			COMMANDS.removeMsg(data.param[0]);
			valRetour = {
				'etat': 1,
				'message': ''
			};
			break;

		case 'clear':
			clearChat();
			addServerMessage('Chat cleared');
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
			
		default:
			valRetour = {
				'etat': 0,
				'message': "Command not found"
			};
			break;
	}

	return valRetour;
}





