class Zone {
    constructor( data , inv = 1){
        this.x = data.x;
        this.y = data.y;
        this.z = data.z;
        this.inv = inv;  //INVERTER CENÁRIO
        this.objects = [];
        this.createZone(); 
    }

    createZone() {
        let wall1 = new Wall({x : 0, y : 0, z : 0}, this.inv);
        this.objects.push(wall1);

        this.createBuildings();
        this.createTurrets();  
       
    }

    createTurrets (){
        let turret = new TurretFree({x : -30*this.inv, y : -0.4, z :20 *this.inv});
        this.objects.push(turret);
        turret = new TurretFree({x : -30*this.inv, y : -0.4, z :-20 *this.inv});
        this.objects.push(turret);
    }

    createBuildings(){
        let castle = new Castle({x : -60*this.inv, y : -0.7, z : -65}, this.inv);
        let market = new Market({x : -60*this.inv, y : -0.7, z : -40*this.inv},  this.inv);
        let wc = new Toilet({x : -55*this.inv, y : -0.7, z : 20*this.inv},  this.inv);
        this.objects.push(castle, market, wc);

      
        
        let whaleH0 = new whaleHouse({x : -50*this.inv, y : -0.7, z : 75*this.inv}, {y : Math.PI / 2},  this.inv);
        let whaleH1 = new whaleHouse({x : -80*this.inv, y : -0.7, z : 34*this.inv}, {y : 0},  this.inv);
        
        this.objects.push(whaleH0, whaleH1);

        let witchH0 = new witchHouse({x : -50*this.inv, y : -0.7, z : -75*this.inv}, {y : 0},  this.inv);
        // let witchH1 = new witchHouse({x : -80*this.inv, y : -0.7, z : -70*this.inv}, {y : 1});
        // let witchH2 = new witchHouse({x : -25*this.inv, y : -0.7, z : -80*this.inv}, {y : 0});
        let witchH3 = new witchHouse({x : -80*this.inv, y : -0.7, z : -34*this.inv}, {y : Math.PI / 2},  this.inv);
        this.objects.push(witchH0, witchH3);

        let skyPillar = new skyTower({x : 0, y : 50, z : 0},  this.inv);
        this.objects.push(skyPillar);
    }

}