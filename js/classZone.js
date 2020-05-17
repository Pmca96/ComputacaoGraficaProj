
import { TurretFree, Turret,Turret1,Turret2  } from './classTurrets.js';
import {Castle,Market,whaleHouse, witchHouse,skyTower, Toilet} from './classBuildings.js';
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
        let turret = new TurretFree({x : -30*this.inv, y : -0.4, z :20 *this.inv});
        this.objects.push(turret);
        turret = new TurretFree({x : -50*this.inv, y : -0.4, z :-20 *this.inv});
        this.objects.push(turret);

        turret = new Turret2({x : -40*this.inv, y : -0.4, z :30 *this.inv});
        turret.levelUp();
        this.objects.push(turret);

        turret = new Turret2({x : -40*this.inv, y : -0.4, z :-30 *this.inv});
        this.objects.push(turret);
        
        turret = new Turret1({x : -50*this.inv, y : -0.4, z :40 *this.inv});
        this.objects.push(turret);
        turret = new Turret1({x : -50*this.inv, y : -0.4, z :-40 *this.inv});
        turret.levelUp();
        this.objects.push(turret);
    }

    createBuildings(){
        let castle = new Castle({x : -60*this.inv, y : -0.7, z : -65*this.inv}, this.inv);
        let market = new Market({x : -60*this.inv, y : -0.7, z : -40*this.inv},  this.inv);
        let wc = new Toilet({x : -55*this.inv, y : -0.7, z : 20*this.inv},  this.inv);
        this.objects.push(castle, market, wc);
        
        let whaleH0 = new whaleHouse({x : -50*this.inv, y : -0.7, z : 80*this.inv}, {y : Math.PI / 2},  this.inv);
        let whaleH1 = new whaleHouse({x : -85*this.inv, y : -0.7, z : 34*this.inv}, {y : 0},  this.inv);
        
        this.objects.push(whaleH0, whaleH1);

        let witchH0 = new witchHouse({x : -50*this.inv, y : -0.7, z : -80*this.inv}, {y :  Math.PI / 2},  this.inv);
        let witchH1 = new witchHouse({x : -88*this.inv, y : -0.7, z : -34*this.inv}, {y : Math.PI / 2},  this.inv);
        this.objects.push(witchH0, witchH1);

        let skyPillar = new skyTower({x : -30*this.inv, y : 50, z : -30*this.inv},  this.inv);
        this.objects.push(skyPillar);
    }

}