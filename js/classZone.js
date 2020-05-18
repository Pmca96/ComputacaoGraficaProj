
import { TurretFree, Turret,Turret1,Turret2  } from './classTurrets.js';
import {Castle,Market,MedievalHouse, Forge,SkyTower, Toilet,Houses,FantasyHouses, LittlePolly} from './classBuildings.js';
import {Labyrinth} from './classLands.js';
export default class Zone {
    constructor( data , inv = 1){
        this.x = data.x;
        this.y = data.y;
        this.z = data.z;
        this.inv = inv;  //INVERTER CENÁRIO
        this.objects = [];
        this.createZone(); 
    }

    createZone() {
        let wall = new Wall({x : 0, y : 0, z : 0}, this.inv);
        this.objects.push(wall);

        let labyrinth = new Labyrinth({x : 0, y : 0, z : 0}, this.inv);
        this.objects.push(labyrinth);

        this.createBuildings();
        this.createTurrets();  
       
    }

    createTurrets (){
        let turret = new TurretFree({x : -27*this.inv, y : -0.4, z :20 *this.inv});
        this.objects.push(turret);
        turret = new TurretFree({x : -38*this.inv, y : -0.4, z :-16 *this.inv});
        this.objects.push(turret);

        turret = new Turret2({x : -33*this.inv, y : -0.4, z :27 *this.inv});
        turret.levelUp();
        this.objects.push(turret);

        turret = new Turret2({x : -28*this.inv, y : -0.4, z :-30 *this.inv});
        this.objects.push(turret);
        
        turret = new Turret1({x : -36*this.inv, y : -0.4, z :6 *this.inv});
        this.objects.push(turret);
        turret = new Turret1({x : -48*this.inv, y : -0.4, z :-35 *this.inv});
        turret.levelUp();
        this.objects.push(turret);
    }

    createBuildings(){
        let castle = new Castle({x : -60*this.inv, y : -0.7, z : -65*this.inv}, this.inv);
        let market = new Market({x : -60*this.inv, y : -0.7, z : -40*this.inv},  this.inv);
        let wc = new Toilet({x : -55*this.inv, y : -0.7, z : 20*this.inv},  this.inv);
        this.objects.push(castle, market, wc);
        
        let MHouse1 = new FantasyHouses({x : -50*this.inv, y : -0.7, z : 80*this.inv}, {y : Math.PI / 2},  this.inv);
        let MHouse2 = new FantasyHouses({x : -88*this.inv, y : -0.7, z : -34*this.inv}, {y : 0},  this.inv);
        
        this.objects.push(MHouse1, MHouse2);

        // let Forge1 = new Forge({x : -88*this.inv, y : -0.7, z : 7*this.inv}, {y : Math.PI / 2},  this.inv);
        // let Forge2 = new Forge({x : -88*this.inv, y : -0.7, z : -7*this.inv}, {y : Math.PI / 2},  this.inv);
        // this.objects.push(Forge1, Forge2);

        
        let LittlePolly1 = new LittlePolly({x : -88*this.inv, y : -0.7, z : 7*this.inv}, {y : Math.PI / 2},  this.inv);
        let LittlePolly2 = new LittlePolly({x : -88*this.inv, y : -0.7, z : -7*this.inv}, {y : Math.PI / 2},  this.inv);
        this.objects.push(LittlePolly1, LittlePolly2);

        let Houses1 = new Houses({x : -50*this.inv, y : -0.7, z : -80*this.inv}, {y :  Math.PI / 2},  this.inv);
        let Houses2 = new Houses({x : -88*this.inv, y : -0.7, z : 34*this.inv}, {y : Math.PI / 2},  this.inv);
        this.objects.push(Houses1, Houses2);

        let skyPillar = new SkyTower({x : -30*this.inv, y : 50, z : -30*this.inv},  this.inv);
        this.objects.push(skyPillar);
    }

}