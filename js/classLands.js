class Land extends THREE.Object3D {
    constructor() {
        super();
    }
}

class Route extends Land {
    constructor(position) {
        super();
        this.createRoude(position);
    }

    createRoude(position) {
        let geometry =new THREE.BoxGeometry( 15, 0.01, 200 );
        //let geometry =new THREE.BoxGeometry( 1, 0.01, 1 );
        let texture = new THREE.TextureLoader().load("images/rode1.jpg");
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set( 0, 0 );
        texture.repeat.set( 8, 100 );
        var material = new THREE.MeshPhongMaterial( {map: texture} );
        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.receiveShadow=true;
    }
    
    getMesh() {
        return this.mesh;
    }           

    update(){
        //let rad = this.mesh.children[2].rotation.y + 1;
           //w this.mesh.children[2].rotation.y += -0.01; 

    }
}
