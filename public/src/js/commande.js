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
		default:
			valRetour = {
				'etat': 0,
				'message': "Command not found"
			};
			break;
	}

	return valRetour;
}