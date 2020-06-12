


class Wall extends THREE.Object3D {

    constructor(position, inversion) {
        super();
        this.createWall(position.x, position.y, position.z, inversion);
    }

    createWall(x, y, z, inv) {

        var group = new THREE.Group();
        group.add(this.backWall(-70*inv, 1, 0));
        group.add(this.lrWall(-40*inv, 1, -59));
        group.add(this.lrWall(-40*inv, 1, 59));
        group.add(this.frontWall(-11*inv, 1, 31.5));
        group.add(this.frontWall(-11*inv, 1, -31.5));
    
        group.add(this.towerWall(-11*inv, 1, 5));
        group.add(this.towerWall(-11*inv, 1, -5));
        group.add(this.towerWall(-11.5*inv, 1, -58.2));
        group.add(this.towerWall(-11.5*inv, 1, 58.2));
        group.add(this.towerWall(-69.5*inv, 1,-58.2));
        group.add(this.towerWall(-69.5*inv, 1, 58.2));

        group.add(this.towerDoors(-12.9*inv, 0.4, 5, 0));
        group.add(this.towerDoors(-12.9*inv, 0.4, -5,0));

        
        group.add(this.towerDoors(-13.02*inv, 0.4, 56.98, Math.PI/(1.3* inv)));
        group.add(this.towerDoors(-13.02*inv, 0.4, -56.98, Math.PI/(-1.3* inv)));

        
        group.add(this.towerDoors(-67.98*inv, 0.4, 56.98, Math.PI/(-1.3* inv)));
        group.add(this.towerDoors(-67.98*inv, 0.4, -56.98, Math.PI/(1.3* inv)));

        group.position.set(x, y, z, inv);
        
        group.castShadow = true;
        this.mesh = group;
    }

    backWall(x, y, z) {

        var fenceGeometry = new THREE.CubeGeometry(2, 3.5, 118);
        var material = new THREE.TextureLoader().load("images/stonewall2.jpg");
        material.wrapS = material.wrapT = THREE.RepeatWrapping;
        material.offset.set( 0, 0);
        material.repeat.set( 40, 2);
        var stoneMaterial = new THREE.MeshPhongMaterial( { map: material, side: THREE.DoubleSide });
        var wallCube = new THREE.Mesh( fenceGeometry, stoneMaterial );
        wallCube.position.set(x, y, z);
        wallCube.castShadow = true;
        return wallCube;
    }

    lrWall(x, y, z) {

        var fenceGeometry = new THREE.CubeGeometry(58, 3.5, 2);
        var material = new THREE.TextureLoader().load("images/stonewall2.jpg");
        material.wrapS = material.wrapT = THREE.RepeatWrapping;
        material.offset.set( 0, 0);
        material.repeat.set( 40, 2);
        var stoneMaterial = new THREE.MeshPhongMaterial( { map: material, side: THREE.DoubleSide });
        var wallCube = new THREE.Mesh( fenceGeometry, stoneMaterial );
        wallCube.position.set(x, y, z);
        wallCube.castShadow = true;
        return wallCube;
    }

    frontWall(x, y, z) {

        var fenceGeometry = new THREE.CubeGeometry(2, 3.5, 53);
        var material = new THREE.TextureLoader().load("images/stonewall2.jpg");
        material.wrapS = material.wrapT = THREE.RepeatWrapping;
        material.offset.set( 0, 0);
        material.repeat.set( 40, 2);
        var stoneMaterial = new THREE.MeshPhongMaterial( { map: material, side: THREE.DoubleSide });
        var wallCube = new THREE.Mesh( fenceGeometry, stoneMaterial );
        wallCube.position.set(x, y, z);
        wallCube.castShadow = true;
        return wallCube;
    }

    towerWall(x, y, z) {
        var geometry = new THREE.CylinderGeometry( 2, 2, 5, 20 );
        var material = new THREE.TextureLoader().load("images/stonewall2.jpg");
        material.wrapS = material.wrapT = THREE.RepeatWrapping;
        material.offset.set( 0, 0);
        material.repeat.set( 10, 2.5);
        var stoneMaterial = new THREE.MeshPhongMaterial( { map: material, side: THREE.DoubleSide });
        var cylinder = new THREE.Mesh( geometry, stoneMaterial );

        cylinder.position.set(x, y, z);
        cylinder.castShadow = true;
        return cylinder;
    }


 
    towerDoors(x, y, z, ry) {
        var geometry = new THREE.BoxGeometry( 0.2, 2.25, 1.25, 20 );
        var material = new THREE.TextureLoader().load("images/door1.png");
    
        var woodMaterial = new THREE.MeshPhongMaterial( { map: material });
        var door = new THREE.Mesh( geometry, woodMaterial );

        door.position.set(x, y, z);
        door.rotation.y = ry;
        door.castShadow = true;
        return door;
    }
    update(){

    }
    getMesh() {
        return this.mesh;
    }
}

class pathWall extends THREE.Object3D   {
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
        var wallTexture = new THREE.TextureLoader().load("images/stone.jpg");
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
        var wallTexture = new THREE.TextureLoader().load("images/stone.jpg");
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

