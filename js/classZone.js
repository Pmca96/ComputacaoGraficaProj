class Zone {
    constructor( data ){
        this.x = data.x;
        this.y = data.y;
        this.z = data.z;
        this.objects = [];
        this.createZone();  
    }

    createZone() {
        this.createFence();
        let castle = new Castle({x : 0, y : 0, z :0});
        this.objects.push(castle);
    }


    createFence(){
        let index = 0;
        while (index < 180) {
            index++;
            if (index < 60 && index != 30 && index != 29 && index != 31) {
                let fence = new Fence({x : -10, y : 0.1, z : 1+(index*2)-60, ry:Math.PI/2});
                this.objects.push(fence);
            } else if (index > 60  && index < 90) {
                let fence = new Fence({x : -10+(-(index-60)*2), y : 0.1, z : 57, ry:0});
                this.objects.push(fence);
            } else if (index > 90  && index < 150) {
                let fence = new Fence({x : -68, y : 0.1, z :  ((index-90)*2)-59, ry:Math.PI/2});
                this.objects.push(fence);
            } else if (index > 150  && index < 180) {
                let fence = new Fence({x : -70+((index-150)*2), y : 0.1, z :  -61, ry:0});
                this.objects.push(fence);
            }
        }
    }
}