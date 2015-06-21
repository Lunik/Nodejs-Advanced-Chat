var VERSION = '2.4.0';
 
// Initialize varibles
var $window = $(window);
var $usernameInput = $('.usernameInput'); // Input for username
var $messages = $('.messages'); // Messages area
var $inputMessage = $('.inputMessage'); // Input message input box

var $loginPage = $('.login.page'); // The login page
var $chatPage = $('.chat.page'); // The chatroom page

//Client infos
var USER;
var USERS;
var $currentInput = $usernameInput.focus();

//var socket = io.connect('http://lunik-chat-v2.herokuapp.com/');
var socket = io();

//lancement du chat
Main();

function Main(){
	initModules();
}

/**
@brief Initialise tous les modules
*/
function initModules(){
	//Module d'evenement
	$.getScript('/src/js/event.js');
	$.getScript('/src/js/user.js');
	$.getScript('/src/js/storage.js');
	$.getScript('/src/js/socketEvent.js');
	$.getScript('/src/js/message.js');
	$.getScript('/src/js/commande.js');
	$.getScript('/src/js/parametre.js');
	$.getScript('/src/js/emoji.js');
	$.getScript('/src/js/popup/popup.js');
}

function currentHour(){
	var d = new Date();

	return d.getHours()+':'+d.getMinutes();
}