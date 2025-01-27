
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
    if (world.players.length >= 2) {
        console.log("disconeccted")
        socket.disconnect();
    }
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

        world.zone.map((i) => {
            socket.emit('updateZone', i);
        });
    });

    socket.on('updatePosition', function(data){
        if ( data.x === undefined)
            return 0;
        var newData = world.updatePlayerData(data);
        
        socket.broadcast.emit('updatePosition', newData);
    });



    socket.on('disconnect', function(){
        io.emit('removeOtherPlayer', player);
        world.removePlayer( player );
        world.removeZONE(player);
    });

    //ZONE

    socket.on('associateZone', function(data){
        if (world.zoneForId(world.zone,data.playerId) == -1)
            world.zone.push(new world.Zone(data));
        data.index = world.zone.indexOf(world.zone[world.zone.length-1]);
        socket.broadcast.emit('associateZone', data);
    });

    socket.on('updateZone', function(data){
        let zoneFinder = world.zoneForId(world.zone, data.playerId);
        if (zoneFinder != -1) {
            zoneFinder.updateZoneData(data);
            data.index = world.zone.indexOf(zoneFinder);
            socket.broadcast.emit('updateZone', data);
        }
        
    });
    socket.on('requestUpdateZone', function(){
        world.zone.map((i, ind) => {
            i.index = ind;
            socket.emit('updateZone', i);
        });
        
        
    });

});

// Handle environment changes
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
 
http.listen(port, ip_address, function(){
    console.log( "Listening on " + ip_address + ", server_port " + port );
});

/*
http.listen(3000, function(){
   console.log('listening on *: 3000');
});
*/
