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
        this.createFence();
        let castle = new Castle({x : -60*this.inv, y : -0.7, z : -68*this.inv});
        let market = new Market({x : -60, y : -0.7, z : -40*this.inv});
        let wc = new Toilet({x : -55*this.inv, y : -0.7, z : 20*this.inv});
        this.objects.push(castle, market, wc);

        let turret = new TurretFree({x : -30*this.inv, y : -0.4, z :20 *this.inv},{x : 0, y : 0, z : 0});
        this.objects.push(turret);
        turret = new TurretFree({x : -30*this.inv, y : -0.4, z :-20 *this.inv},{x : 0, y : 0, z : 0});
        this.objects.push(turret);
        
        // let whaleH0 = new whaleHouse({x : -50*this.inv, y : 0, z : 75*this.inv}, {y : Math.PI / 2});
         let whaleH1 = new whaleHouse({x : -80*this.inv, y : -0.7, z : 34*this.inv}, {y : 0});
         this.objects.push(whaleH1);
        // this.objects.push(whaleH0, whaleH1);
        // let brHouse = new brightHouse({x : 0, y : -0.7, z : 0});

         let witchH0 = new witchHouse({x : -50*this.inv, y : -0.7, z : -75*this.inv}, {y : 0});
         this.objects.push(witchH0)
        // let witchH1 = new witchHouse({x : -25*this.inv, y : -0.7, z : -80*this.inv}, {y : 0});
        // let witchH2 = new witchHouse({x : -80*this.inv, y : -0.7, z : -70*this.inv}, {y : 1});
        // let witchH3 = new witchHouse({x : -80*this.inv, y : -0.7, z : -34*this.inv}, {y : Math.PI / 2});
       // this.objects.push(witchH0, witchH1, witchH2, witchH3);

        let skyPillar = new skyTower({x : 0, y : 75, z : 0});
        this.objects.push(skyPillar);
    }


    createFence(){
        let index = 0;
        while (index < 180) {
            index++;
            let fence
            if (index < 60 && index != 30 && index != 29 && index != 31) {
                fence = new Fence({x : -10*this.inv, y : 0.1, z : (1+(index*2)-60), ry:Math.PI/2});
                this.objects.push(fence);
            } else if (index > 60  && index < 90) {
                if (this.inv == 1)
                    fence = new Fence({x : -10+(-(index-60)*2), y : 0.1, z : 57, ry:0});
                else
                    fence = new Fence({x : (-8+(-(index-60)*2)) *this.inv, y : 0.1, z : 57, ry:0});
                this.objects.push(fence);
            } else if (index > 90  && index < 150) {
                let fence = new Fence({x : -68*this.inv, y : 0.1, z :  (((index-90)*2)-59) , ry:Math.PI/2});
                this.objects.push(fence);
            } else if (index > 150  && index < 180) {
                if (this.inv == 1)
                    fence = new Fence({x : (-70+((index-150)*2))*this.inv, y : 0.1, z :-61, ry:0});
                else
                    fence = new Fence({x : (-68+((index-150)*2))*this.inv, y : 0.1, z :-61, ry:0});
                this.objects.push(fence);
            }
        }
    }
}