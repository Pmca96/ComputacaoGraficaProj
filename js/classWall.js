


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



