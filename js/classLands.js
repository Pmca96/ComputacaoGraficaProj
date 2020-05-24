

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


class pathWall extends Land {
    constructor(position, inversion) {
        super();
        this.createPathWall(position.x, position.y, position.z, inversion)
    }

    createPathWall(x, y, z, inv) {

        var group = new THREE.Group();
        //grouo add - methods
        group.add(this.wallCorner(-11, 0, -2.75*inv));
        group.add(this.wallCorner(11, 0, -2.75*inv));
        group.add(this.wall(-17*inv, 0, -2.75*inv, [12.5, 1.5, 0.3]));
        group.add(this.wallCorner(-23*inv, 0, -2.75*inv));
        group.add(this.wall(-14.5*inv, 0, 2.75*inv, [7, 1.5, 0.3]));
        group.add(this.wallCorner(-18*inv, 0, 2.75*inv));
        group.add(this.wall(-23*inv, 0, 13*inv,[0.3, 1.5, 49]));
        group.add(this.wallCorner(-23*inv, 0, 37.5*inv));
        group.add(this.wall(-18*inv, 0, 22.5*inv,[0.3, 1.5, 39.5]));
        group.add(this.wallCorner(-18*inv, 0, 42.5*inv));
        group.add(this.wall(-31.5*inv,0 , 42.5*inv, [26.5, 1.5, 0.3]));
        group.add(this.wallCorner(-45*inv, 0, 42.5*inv));
        group.add(this.wall(-31.5*inv,0 , 37.5*inv,[17, 1.5, 0.3]));
        group.add(this.wallCorner(-40*inv, 0, 37.5*inv));
        group.add(this.wall(-40*inv,0 , 26*inv, [0.3, 1.5, 23]));
        group.add(this.wallCorner(-40*inv, 0, 14.5*inv));
        group.add(this.wall(-45*inv,0 , 26*inv, [0.3, 1.5, 33]));
        group.add(this.wallCorner(-45*inv, 0, 9.5*inv));
        group.add(this.wall(-34*inv,0 , 14.5*inv, [11.5, 1.5, 0.3]));
        group.add(this.wallCorner(-28*inv, 0, 14.5*inv));
        group.add(this.wall(-39*inv,0 , 9.5*inv, [12, 1.5, 0.3]));
        group.add(this.wallCorner(-33*inv, 0, 9.5*inv));
        group.add(this.wall(-28*inv,0 , 8.5*inv,[0.3, 1.5, 12]));
        group.add(this.wallCorner(-28*inv, 0, 2.5*inv));
        group.add(this.wall(-33*inv,0 , 3.5*inv, [0.3, 1.5, 12]));
        group.add(this.wallCorner(-33*inv, 0, -2.5*inv));
        group.add(this.wall(-25.5*inv,0 , 2.5*inv, [5, 1.5, 0.3]));
        group.add(this.wallCorner(-23*inv, 0, 2.5*inv));
        group.add(this.wall(-30.5*inv,0 , -2.5*inv, [5, 1.5, 0.3]));
        group.add(this.wallCorner(-28*inv, 0, -2.5*inv));
        group.add(this.wall(-28*inv,0 , -9.5*inv, [0.3, 1.5, 14]));
        group.add(this.wallCorner(-28*inv, 0, -16.5*inv));
        group.add(this.wallCorner(-23*inv, 0, -11.5*inv));
        group.add(this.wall(-24*inv,0 , -16.5*inv, [8, 1.5, 0.3]));
        group.add(this.wallCorner(-20*inv, 0, -16.5*inv));
        group.add(this.wall(-19*inv,0 , -11.5*inv , [8, 1.5, 0.3]));
        group.add(this.wallCorner(-15*inv, 0, -11.5*inv));
        group.add(this.wall(-20*inv,0 , -30*inv, [0.3, 1.5, 27]));
        group.add(this.wallCorner(-20*inv, 0, -43.5*inv));
        group.add(this.wall(-15*inv,0 , -30*inv, [0.3, 1.5, 37]));
        group.add(this.wallCorner(-15*inv, 0, -48.5*inv));
        group.add(this.wall(-28*inv,0 , -43.5*inv, [16, 1.5, 0.3]));
        group.add(this.wallCorner(-36*inv, 0, -43.5*inv));
        group.add(this.wall(-28*inv,0 , -48.5*inv, [26, 1.5, 0.3]));
        group.add(this.wallCorner(-41*inv, 0, -48.5*inv));
        group.add(this.wall(-36*inv,0 , -33.5*inv, [0.3, 1.5, 20]));
        group.add(this.wallCorner(-36*inv, 0, -23.5*inv));
        group.add(this.wall(-41*inv,0 , -38.5*inv, [0.3, 1.5, 20]));
        group.add(this.wallCorner(-41*inv, 0, -28.5*inv));
        group.add(this.wall(-40*inv,0 , -23.5*inv,[8, 1.5, 0.3])); 
        group.add(this.wallCorner(-44*inv, 0, -23.5*inv));
        group.add(this.wall(-45*inv,0 , -28.5*inv,[8, 1.5, 0.3]));
        group.add(this.wallCorner(-49*inv, 0, -28.5*inv));
        group.add(this.wall(-44*inv,0 , -11*inv, [0.3, 1.5, 25]));
        group.add(this.wallCorner(-44*inv, 0, 1.5*inv));
        group.add(this.wall(-49*inv,0 , -16*inv , [0.3, 1.5, 25]));
        group.add(this.wallCorner(-49*inv, 0, -3.5*inv));
        group.add(this.wall(-49.5*inv,0 , 1.5*inv, [10.5, 1.5, 0.3]));
        group.add(this.wallCorner(-54.5*inv, 0, 1.5*inv));
        group.add(this.wall(-52*inv,0 , -3.5*inv, [5.5, 1.5, 0.3]));
        group.add(this.wallCorner(-54.5*inv, 0, -3.5*inv));
        group.position.set(x, y, z, inv);
        this.mesh = group;
    }

    wallCorner(x, y, z ) {

        var wallGeometry = new THREE.CubeGeometry(0.5, 2, 0.5);
        var wallTexture = new THREE.TextureLoader().load("images/stonewall2.jpg");
        wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
        wallTexture.offset.set( 0, 0 );
        wallTexture.repeat.set( 1, 2 );
        var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide });
        var wallCube = new THREE.Mesh( wallGeometry, wallMaterial );
        wallCube.position.set(x, y, z);
        wallCube.receiveShadow = true;    
        wallCube.castShadow = true;
        return wallCube;
    }

    wall(x, y, z, size) {

        var wallGeometry = new THREE.CubeGeometry(size[0], size[1], size[2]);
        var wallTexture = new THREE.TextureLoader().load("images/stonewall2.jpg");
        wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
        wallTexture.offset.set( 0, 0 );
        wallTexture.repeat.set( (size[0]+size[2])/1, 2.5 );
        var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture, side: THREE.DoubleSide });
        var wallCube = new THREE.Mesh( wallGeometry, wallMaterial );
        wallCube.position.set(x, y, z);
        wallCube.receiveShadow = true;    
        wallCube.castShadow = true;
        return wallCube;
    }


    getMesh() {
        return this.mesh;
    }
}

export { Labyrinth, Land , Route , pathWall };