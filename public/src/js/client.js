var VERSION;
 
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
	$.get('/src/js/event.js');
	$.get('/src/js/user.js');
	$.get('/src/js/socketEvent.js');
	$.get('/src/js/message.js');
	$.get('/src/js/commande.js');
}

function currentHour(){
	var d = new Date();

	return d.getHours()+':'+d.getMinutes();
}