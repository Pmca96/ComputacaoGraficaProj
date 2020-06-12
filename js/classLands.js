

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


class Labyrinth extends Land {
    constructor(position, inversion) {
        super();
        this.createLabyrinth(position.x, position.y, position.z, inversion);
    }

    createLabyrinth(x, y, z, inv) {

        var group = new THREE.Group();
        group.add(this.fbPath(-15*inv, -0.5, 0,  [15, 0.01, 4]));
        group.add(this.fbPath(-31.5*inv, -0.5, 40*inv, [26, 0.01, 4]));
        group.add(this.fbPath(-36.5*inv, -0.5, 12*inv, [8, 0.01, 4]));
        group.add(this.fbPath(-28*inv, -0.5, 0, [9, 0.01, 4]));
        group.add(this.fbPath(-19.5*inv, -0.5, -14*inv, [8, 0.01, 4]));
        group.add(this.fbPath(-28*inv, -0.5, -46*inv, [25, 0.01, 4]));
        group.add(this.fbPath(-40.5*inv, -0.5, -26*inv, [8, 0.01, 4]));
        group.add(this.fbPath(-52*inv, -0.5, -1*inv, [7, 0.01, 4]));
        group.add(this.lrPath(-20.5*inv, -0.5, 20*inv, [4, 0.01, 36]));
        group.add(this.lrPath(-42.5*inv, -0.5, 24*inv, [4, 0.01, 28]));
        group.add(this.lrPath(-30.5*inv, -0.5, 8*inv, [4, 0.01, 12]));
        group.add(this.lrPath(-25.5*inv, -0.5, -9*inv, [4, 0.01, 14]));
        group.add(this.lrPath(-17.5*inv, -0.5, -30*inv, [4, 0.01, 28]));
        group.add(this.lrPath(-38.5*inv, -0.5, -36*inv, [4, 0.01, 16]));
        group.add(this.lrPath(-46.5*inv, -0.5, -13.5*inv, [4, 0.01, 29]));
        group.position.set(x, y, z, inv);
        this.mesh = group;
    }

    fbPath(x, y, z, size) {

        var pathGeometry = new THREE.CubeGeometry(size[0], size[1], size[2]);
        var pathTexture = new THREE.TextureLoader().load("images/rode1.jpg");
        pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
        pathTexture.offset.set( 0, 0 );
        pathTexture.repeat.set( (size[0] + size[2])/2, 2 );
        var pathMaterial = new THREE.MeshPhongMaterial( { map: pathTexture, side: THREE.DoubleSide });
        var pathCube = new THREE.Mesh( pathGeometry, pathMaterial );
        pathCube.position.set(x, y, z);
        pathCube.receiveShadow = true;    
        return pathCube;
    }

    lrPath(x, y, z,size) {

        var pathGeometry = new THREE.CubeGeometry(size[0], size[1], size[2]);
        var pathTexture = new THREE.TextureLoader().load("images/rode1.jpg");
        pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
        pathTexture.offset.set( 0, 0);
        pathTexture.repeat.set( 2,(size[0] + size[2])/2 );
        var pathMaterial = new THREE.MeshPhongMaterial( { map: pathTexture, side: THREE.DoubleSide });
        var pathCube = new THREE.Mesh( pathGeometry, pathMaterial );
        pathCube.position.set(x, y, z);
        pathCube.receiveShadow = true;    
        return pathCube;
    }

    getMesh() {
        return this.mesh;
    }
}




export { Labyrinth, Land , Route  };