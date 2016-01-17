# Lunik-Chat-V2.0

[![js-npm](https://img.shields.io/npm/v/standard.svg?style=flat)](https://npmjs.org/package/standard)
[![socketio](https://img.shields.io/badge/socket.io-v1.4.4%20-green.svg)](http://socket.io/)
[![express](https://img.shields.io/badge/express-v4.13.3%20-green.svg)](http://expressjs.com/)

## [DEMO](http://chat.guillaume-lunik.fr/)

## Installation:
	$ git clone https://github.com/Lunik/Nodejs-Advanced-Chat.git
	$ cd Nodejs-Advanced-Chat
	$ npm install

## Run
	$ npm run start

## Commandes:

X argument obligateur
(X) argument optionnel

### Utilisateurs classique

|Commande | Arguments |  Description |
|:------:|:---------:|:--------------------------------------:|
| /command | | Affiche le lien vers la liste des commandes |
| /login | Password | Connection moderateur / admin |
| /logout | | Deconnection moderateur / admin |
| /clear | | Efface le chat |
| /msg | Pseudo | Envoyer un message Privé |
| /quit |  | Quitte le chat |
| /join | Salle (Mot de passe)| Se connecter à une salle |
| /invite | Pseudo | Inviter un utilisateur dans sa salle |
| /slow | | Affiche le temps minimum entre chaque message |
| /code | | Ecrire du code formaté dans le chat |

### Moderateurs

|Command | Arguments |  Description |
|:------:|:---------:|:--------------------------------------:|
| /list | | Affiche la liste des utilisateurs connectés |
| /kick | Pseudo | Ejecte un utilisateur du chat |
| /slow | | Affiche le temps entre chaque message |
| /slow | Secondes | Change le temps minimum entre chaque message |

### Administrateurs

|Command | Arguments |  Description |
|:------:|:---------:|:--------------------------------------:|
| /clean | | Efface le chat pour tous les utilisateurs |
| /ban | Pseudo | Banni le pseudo + kick l'utilisateur |
| /popup | HTML | Affiche un popup sur tous les ecrans |
