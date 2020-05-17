var socket = io();
export default socket;

import  Application from './classStructure.js';
import  Player from './classPlayer.js';

var app;
socket.on('connect', function(){
    app = new Application();
    socket.emit('requestOldPlayers', {});
    
});

socket.on('updatePosition', function(data){
    var player = app.playerForId(data.playerId);
    player.updatePlayerPosition(data);
});

socket.on('createPlayer', function(data){
    let mainPlayer = new Player(data);
    app.add(mainPlayer);
    app.setMainPlayer(mainPlayer);
    
});
socket.on('addOtherPlayer', function(data){
    let player = new Player(data);
    app.add(player);
});

socket.on('removeOtherPlayer', function(data){
    app.remove(data.playerId);
});

