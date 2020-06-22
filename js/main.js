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

        document.getElementById("wave").innerHTML= 1;
        document.getElementById("health").innerHTML= mainPlayer.lives;
        document.getElementById("money").innerHTML= mainPlayer.money;
        
        
    });
    socket.on('addOtherPlayer', function(data){
        let player = new Player(data);
        app.add(player);
    });

    socket.on('removeOtherPlayer', function(data){
        app.remove(data.playerId);
    });

    socket.on('updateZone', function(data){
        app.updateZone(data);
    });

    socket.on('associateZone', function(data){
        app.associateZone(data);
    });




document.addEventListener("click",handler,true);
var stopEventClick = true;

function startTimer(duration) {
    
    var timer = duration;
    let interval = setInterval(function () {

        --timer;
        if (timer == 0) {
            if (socket.connected == false) {
                document.getElementById("timer").innerHTML = "Maximo de jogadores";
                document.getElementById("instructions").style.backgroundColor  = "black";
            } else {
                clearInterval(interval) ;
                stopEventClick = false;
                document.getElementById("timer").innerHTML = "Click to play";
            }
        }
    }, 1000);
}


window.onload = function () {
    var time = 6;

        startTimer(time);
};



function handler(e){
    if (stopEventClick) {
        e.stopPropagation();
        e.preventDefault();
    }
}
