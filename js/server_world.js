// store all players
var players = [];
var zone = [] ;
var wc1 = 0;
var wc2 = 0;

function Player(){
    this.playerId = players.length;
    if (wc1 == 0) {
        this.wc = 1;
        wc1=1;
        this.x = -55;
        this.y = 0.7;
        this.z = 20;
    } else if (wc2 == 0) {
        this.wc = 2;
        wc2=1;
        this.x = 55;
        this.y = 0.7;
        this.z = -20;
    } else {
        this.wc = 0;
        this.x = 1;
        this.y = 0.7;
        this.z = 1;
    }
    this.r_x = 0;
    this.r_z = 0;
    this.sizeX = 1;
    this.sizeY = 1;
    this.sizeZ = 1;
    this.speed = 0.2;
    this.turnSpeed = 0.02;
}

var addPlayer = function(id){

    var player = new Player();
    player.playerId = id;
    players.push( player );

    return player;
};

var removePlayer = function(player){
    if (player.wc == 1)
        wc1 = 0;
    if (player.wc == 2)
        wc2 = 0;
    var index = players.indexOf(player);

    if (index > -1) 
        players.splice(index, 1);
    
};

var updatePlayerData = function(data){
    var player = playerForId(data.playerId);
try {

    player.x = data.x;
}
catch(Exeception ) {
    return 0;
}
    player.y = data.y;
    player.z = data.z;
    player.r_x = data.r_x;
    player.r_y = data.r_y;
    player.r_z = data.r_z;

    return player;
};

var playerForId = function(id){

    var player;
    for (var i = 0; i < players.length; i++)
        if (players[i].playerId === id){
            player = players[i];
            break;
        }
    

    return player;
};


class Zone {
    constructor( data){
        this.x = data.x;
        this.y = data.y;
        this.z = data.z;
        this.inv = zone.length == 0 ? -1 : 1; 
        
        this.playerId = data.playerId;
        this.wave = data.wave;
        this.turret= data.turret;
        this.turretUpgrades = data.turretUpgrades;
    }

    updateZoneData (data) {
        this.playerId = data.playerId;
        this.wave = data.wave;
        this.turret = data.turret;
        this.turretUpgrades = data.turretUpgrades;
    }

}

var zoneForId = function(data, id){
    var zone = -1;
    for (var i = 0; i < data.length; i++)
        if (data[i].playerId === id){
            zone = data[i];
            break;
        }
    return zone;
};

module.exports.players = players;
module.exports.addPlayer = addPlayer;
module.exports.removePlayer = removePlayer;
module.exports.updatePlayerData = updatePlayerData;
module.exports.playerForId = playerForId;
module.exports.zone = zone;
module.exports.Zone = Zone;
module.exports.zoneForId = zoneForId;
