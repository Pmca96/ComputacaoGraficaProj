
const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const world = require('./js/server_world');

app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// Handle connection
io.on('connection', function(socket){
    console.log('a user connected');

    var id = socket.id;
    world.addPlayer(id);

    var player = world.playerForId(id);
    socket.emit('createPlayer', player);

    socket.broadcast.emit('addOtherPlayer', player);

    socket.on('requestOldPlayers', function(){
        for (var i = 0; i < world.players.length; i++){
            if (world.players[i].playerId != id) {
                socket.emit('addOtherPlayer', world.players[i]);
            }
        }
    });
    socket.on('updatePosition', function(data){
        if ( data.x === undefined)
            return 0;
        var newData = world.updatePlayerData(data);
        
        socket.broadcast.emit('updatePosition', newData);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
        io.emit('removeOtherPlayer', player);
        world.removePlayer( player );
    });

});

// Handle environment changes
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 
http.listen(port, ip_address, function(){
    console.log( "Listening on " + ip_address + ", server_port " + port );
});

/*
http.listen(3000, function(){
   console.log('listening on *: 3000');
});
*/
