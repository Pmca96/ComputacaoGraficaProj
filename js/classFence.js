class Fence extends THREE.Object3D {

    constructor(position) {
        super();
        this.createFence(position.x, position.y, position.z, position.ry);
    }

    createFence(x, y, z, ry) {

        var group = new THREE.Group();
        group.add(this.verticalFence(1, 0, 1));
        group.add(this.verticalFence(3, 0, 1));
        group.add(this.horizontalFence(2, -0.15, 1));
        group.add(this.horizontalFence(2, 0.8, 1));
        group.add(this.obliqualRLFence(2, .3, 1.05));
        group.add(this.obliqualLRFence(2, .3, 0.95));
        group.position.set(x, y, z);
        this.mesh = group;
        this.mesh.rotation.y = ry;
    }

    verticalFence(x, y, z) {

        var fenceGeometry = new THREE.CubeGeometry(0.35, 2, 0.35);
        var fenceTexture = new THREE.TextureLoader().load("images/wood64x64.png");
        fenceTexture.wrapS = fenceTexture.wrapT = THREE.RepeatWrapping;
        var fenceMaterial = new THREE.MeshPhongMaterial( { map: fenceTexture, side: THREE.DoubleSide });
        var fenceCube = new THREE.Mesh( fenceGeometry, fenceMaterial );
        fenceCube.position.set(x, y, z);
        fenceCube.castShadow = true;
        return fenceCube;
    }

    horizontalFence(x, y, z) {

        var fenceGeometry = new THREE.CubeGeometry(2, 0.25, 0.2);
        var fenceTexture = new THREE.TextureLoader().load("images/wood64x64.png");
        var fenceMaterial = new THREE.MeshPhongMaterial( { map: fenceTexture, side: THREE.DoubleSide });
        var fenceCube = new THREE.Mesh( fenceGeometry, fenceMaterial );
        fenceCube.position.set(x, y, z);
        fenceCube.castShadow = true;
        return fenceCube;
    }

    obliqualRLFence(x, y, z) {

        var fenceGeometry = new THREE.CubeGeometry(2, 0.25, 0.05);
        var fenceTexture = new THREE.TextureLoader().load("images/wood64x64.png");
        var fenceMaterial = new THREE.MeshPhongMaterial( { map: fenceTexture, side: THREE.DoubleSide });
        var fenceCube = new THREE.Mesh( fenceGeometry, fenceMaterial );
        fenceCube.rotation.z = 0.4;
        fenceCube.position.set(x, y, z);
        fenceCube.castShadow = true;
        return fenceCube;
    }

    obliqualLRFence(x, y, z) {

        var fenceGeometry = new THREE.CubeGeometry(2, 0.25, 0.05);
        var fenceTexture = new THREE.TextureLoader().load("images/wood64x64.png");
        var fenceMaterial = new THREE.MeshPhongMaterial( { map: fenceTexture, side: THREE.DoubleSide });
        var fenceCube = new THREE.Mesh( fenceGeometry, fenceMaterial );
        fenceCube.rotation.z = -0.4;
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
