class Wall extends THREE.Object3D {

    constructor(position, inversion) {
        super();
        this.createWall(position.x, position.y, position.z, inversion);
    }

    createWall(x, y, z, inv) {

        var group = new THREE.Group();
        group.add(this.backWall(-70*inv, 0, 0));
        group.add(this.lrWall(40*inv, 0, -59));
        group.add(this.lrWall(-40*inv, 0, 59));
        group.add(this.frontWall(-11*inv, 0, 31.5));
        group.add(this.frontWall(-11*inv, 0, -31.5));
        group.position.set(x, y, z, inv);
        this.mesh = group;
    }

    backWall(x, y, z) {

        var fenceGeometry = new THREE.CubeGeometry(2, 7, 120);
        var fenceTexture = new THREE.TextureLoader().load("images/wood64x64.png");
        fenceTexture.wrapS = fenceTexture.wrapT = THREE.RepeatWrapping;
        fenceTexture.offset.set( 0, 0);
        fenceTexture.repeat.set( 6, 20);
        var fenceMaterial = new THREE.MeshPhongMaterial( { map: fenceTexture, side: THREE.DoubleSide });
        var fenceCube = new THREE.Mesh( fenceGeometry, fenceMaterial );
        fenceCube.position.set(x, y, z);
        fenceCube.castShadow = true;
        return fenceCube;
    }

    lrWall(x, y, z) {

        var fenceGeometry = new THREE.CubeGeometry(60, 7, 2);
        var fenceTexture = new THREE.TextureLoader().load("images/wood64x64.png");
        fenceTexture.wrapS = fenceTexture.wrapT = THREE.RepeatWrapping;
        fenceTexture.offset.set( 0, 0);
        fenceTexture.repeat.set( 6, 20);
        var fenceMaterial = new THREE.MeshPhongMaterial( { map: fenceTexture, side: THREE.DoubleSide });
        var fenceCube = new THREE.Mesh( fenceGeometry, fenceMaterial );
        fenceCube.position.set(x, y, z);
        fenceCube.castShadow = true;
        return fenceCube;
    }

    frontWall(x, y, z) {

        var fenceGeometry = new THREE.CubeGeometry(2, 7, 55);
        var fenceTexture = new THREE.TextureLoader().load("images/wood64x64.png");
        fenceTexture.wrapS = fenceTexture.wrapT = THREE.RepeatWrapping;
        fenceTexture.offset.set( 0, 0);
        fenceTexture.repeat.set( 6, 20);
        var fenceMaterial = new THREE.MeshPhongMaterial( { map: fenceTexture, side: THREE.DoubleSide });
        var fenceCube = new THREE.Mesh( fenceGeometry, fenceMaterial );
        fenceCube.position.set(x, y, z);
        fenceCube.castShadow = true;
        return fenceCube;
    }

    update(){

    }
    getMesh() {
        return this.mesh;
    }
}
