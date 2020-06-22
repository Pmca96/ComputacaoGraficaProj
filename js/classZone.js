import socket from './main.js';
import { TurretFree  } from './classTurrets.js';
import {Castle,Market,MedievalHouse, SkyTower, Toilet,Houses,FantasyHouses, LittlePolly} from './classBuildings.js';
import {Labyrinth} from './classLands.js';
import Wave from './classWave.js';
export default class Zone {
    constructor( data , inv = 1){
        this.x = data.x;
        this.y = data.y;
        this.z = data.z;
        this.inv = inv;  //INVERTER CENÁRIO
        this.objects = [];
        this.turret = [0,0,0,0,0,0];
        this.turretUpgrades = [0,0,0,0,0,0];
        this.turretClass = [];
        this.playerId;
        this.wave=0;
        this.waves = [];
        this.timeBetweenWaves = 20;
        this.timer = 1;
        this.createZone(); 
    }

    createZone() {
        let wall = new Wall({x : 0, y : 0, z : 0}, this.inv);
        this.objects.push(wall);

        let labyrinth = new Labyrinth({x : 0, y : 0, z : 0}, this.inv);
        this.objects.push(labyrinth);

        this.createBuildings();
        this.createTurrets();  

        let labWall = new pathWall({x : 0, y : 0, z : 0}, this.inv);
        this.objects.push(labWall);

        this.createWave(0);
    }

    createTurrets (){
        this.turretClass.push(new TurretFree({x : -27*this.inv, y : -0.4, z :20 *this.inv}));
        this.turretClass.push(new TurretFree({x : -38*this.inv, y : -0.4, z :-16 *this.inv}));
        this.turretClass.push(new TurretFree({x : -33*this.inv, y : -0.4, z :27 *this.inv}));
        this.turretClass.push(new TurretFree({x : -28*this.inv, y : -0.4, z :-30 *this.inv}));
        this.turretClass.push(new TurretFree({x : -36*this.inv, y : -0.4, z :6 *this.inv}));
        this.turretClass.push(new TurretFree({x : -48*this.inv, y : -0.4, z :-35 *this.inv}));
    }

    createBuildings(){
        let castle = new Castle({x : -60*this.inv, y : -0.7, z : -65*this.inv}, this.inv);
        let market = new Market({x : -60*this.inv, y : -0.7, z : -40*this.inv},  this.inv);
        let wc = new Toilet({x : -55*this.inv, y : -0.7, z : 20*this.inv},  this.inv);
        this.objects.push(castle, market, wc);
        
        let MHouse1 = new FantasyHouses({x : -50*this.inv, y : -0.7, z : 80*this.inv}, {y : Math.PI / 2},  this.inv);
        let MHouse2 = new FantasyHouses({x : -88*this.inv, y : -0.7, z : -34*this.inv}, {y : Math.PI / 2},  this.inv);
        let MHouse3 = new FantasyHouses({x : -88*this.inv, y : -0.7, z : 49*this.inv}, {y : Math.PI / 2},  this.inv);
        this.objects.push(MHouse1, MHouse2,MHouse3);

        let MedievalHouse1 = new MedievalHouse({x : -80*this.inv, y : -0.7, z : 80*this.inv}, {y : -Math.PI / 3+Math.PI},  this.inv);
        let MedievalHouse2 = new MedievalHouse({x : -80*this.inv, y : -0.7, z : -80*this.inv}, {y : Math.PI / 3 },  this.inv);
        this.objects.push(MedievalHouse1, MedievalHouse2);
        
        let LittlePolly1 = new LittlePolly({x : -92*this.inv, y : -0.7, z : 11*this.inv}, {y : Math.PI / 2},  this.inv);
        let LittlePolly2 = new LittlePolly({x : -92*this.inv, y : -0.7, z : -11*this.inv}, {y : Math.PI / 2},  this.inv);
        let LittlePolly3 = new LittlePolly({x : -35*this.inv, y : -0.7, z : 85*this.inv}, {y :  Math.PI},  this.inv);
        let LittlePolly4 = new LittlePolly({x : -35*this.inv, y : -0.7, z : -85*this.inv}, {y : 0},  this.inv);
        this.objects.push(LittlePolly1, LittlePolly2,LittlePolly3,LittlePolly4);
        
        let Houses1 = new Houses({x : -50*this.inv, y : -0.7, z : -80*this.inv}, {y :  Math.PI / 2},  this.inv);
        let Houses2 = new Houses({x : -88*this.inv, y : -0.7, z : 34*this.inv}, {y : Math.PI / 2},  this.inv);
        let Houses3 = new Houses({x : -88*this.inv, y : -0.7, z : -49*this.inv}, {y : Math.PI / 2},  this.inv);
        this.objects.push(Houses1, Houses2,Houses3);

        let skyPillar = new SkyTower({x : -30*this.inv, y : 50, z : -30*this.inv},  this.inv);
        this.objects.push(skyPillar);
    }
   
    associatePlayer(playerId){
        this.playerId = playerId;
        let data = {};
        data.playerId = playerId;
        data.x = this.x;
        data.y = this.y;
        data.z = this.z;
        data.inv = this.inv;
        data.wave = this.wave;
        data.turretUpgrades = this.turretUpgrades;
        data.turret = this.turret;
        socket.emit('associateZone', data);
    }

    updateZone(data){
        this.wave = data.wave;
        this.turret = data.turret;
        this.turretUpgrades = data.turretUpgrades;
    }

    createWave(isMainPlayerOfStructure) {
        let createdWave;
        if (this.waves.length > 10 ) { 
            createdWave = new Wave(Math.round(this.waves.length/10)); // levelUp
            for (let index = 0; index < (this.waves.length%10) + 5; index++) {
                let randomX = 0;
                let randomZ = 0;
                let position = {x:-7, y:0.7, z:80};
                createdWave.addWolf(position, this.inv, (index+1) * 3);
            }
        } else { 
            createdWave = new Wave(1);
            for (let index = 0; index < this.waves.length+1; index++) {
                
                let randomX = Math.floor(Math.random() * 14) - 7;
                let randomZ = Math.floor(Math.random() * 40) - 20 ;
                if (randomZ <= 0 )
                    randomZ += 95;
                else 
                    randomZ -= 95;
                let position = {x:randomX, y:-0.7, z:randomZ};
                    
                createdWave.addWolf(position, this.inv, index + 2);
            }
        }
        this.waves.push(createdWave);
        if (isMainPlayerOfStructure == 1)
            document.getElementById("wave").innerHTML = this.waves.length-1;
    }

    startTimer() {
        var self = this;
        self.timer = self.timeBetweenWaves;
        let interval = setInterval(function () {
            self.timer -=  1;
            if (self.timer == 0) 
                clearInterval(interval) ;
            else  {
                let min = Math.floor(self.timer / 60);
                let sec = Math.floor(self.timer % 60);
                document.getElementById("counterTime").innerHTML = ('00' + min).slice(-2)+":"+('00' + sec).slice(-2);
            }
                
        }, 1000);
    }
    
}

