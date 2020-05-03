class Obj extends THREE.Object3D{
    constructor(x,y,z){
        super();
        this.position.set(x, y, z);
    }
}

class Fence extends Obj {

    constructor(position) {
        super();
        this.createFence(position.x, position.y, position.z);
    }

    createFence(x, y, z) {

        var group = new THREE.Group();
        group.add(this.verticalFence(1, 0, 1));
        group.add(this.verticalFence(3, 0, 1));
        group.add(this.horizontalFence(2, -0.15, 1));
        group.add(this.horizontalFence(2, 0.8, 1));
        group.add(this.obliqualRLFence(2, .3, 1.05));
        group.add(this.obliqualLRFence(2, .3, 0.95));
        group.position.set(x, y, z);
        this.mesh = group;
    }

    verticalFence(x, y, z) {

        var fenceGeometry = new THREE.CubeGeometry(0.35, 2, 0.35);
        var fenceTexture = new THREE.TextureLoader().load("images/wood.png");
        fenceTexture.wrapS = fenceTexture.wrapT = THREE.RepeatWrapping;
        var fenceMaterial = new THREE.MeshPhongMaterial( { map: fenceTexture, side: THREE.DoubleSide });
        var fenceCube = new THREE.Mesh( fenceGeometry, fenceMaterial );
        fenceCube.position.set(x, y, z);
        return fenceCube;
    }

    horizontalFence(x, y, z) {

        var fenceGeometry = new THREE.CubeGeometry(2, 0.25, 0.2);
        var fenceTexture = new THREE.TextureLoader().load("images/wood.png");
        fenceTexture.wrapS = fenceTexture.wrapT = THREE.RepeatWrapping;
        var fenceMaterial = new THREE.MeshPhongMaterial( { map: fenceTexture, side: THREE.DoubleSide });
        var fenceCube = new THREE.Mesh( fenceGeometry, fenceMaterial );
        fenceCube.position.set(x, y, z);
        return fenceCube;
    }

    obliqualRLFence(x, y, z) {

        var fenceGeometry = new THREE.CubeGeometry(2, 0.25, 0.05);
        var fenceTexture = new THREE.TextureLoader().load("images/wood.png");
        fenceTexture.wrapS = fenceTexture.wrapT = THREE.RepeatWrapping;
        var fenceMaterial = new THREE.MeshPhongMaterial( { map: fenceTexture, side: THREE.DoubleSide });
        var fenceCube = new THREE.Mesh( fenceGeometry, fenceMaterial );
        fenceCube.rotation.z = 0.4;
        fenceCube.position.set(x, y, z);
        return fenceCube;
    }

    obliqualLRFence(x, y, z) {

        var fenceGeometry = new THREE.CubeGeometry(2, 0.25, 0.05);
        var fenceTexture = new THREE.TextureLoader().load("images/wood.png");
        fenceTexture.wrapS = fenceTexture.wrapT = THREE.RepeatWrapping;
        var fenceMaterial = new THREE.MeshPhongMaterial( { map: fenceTexture, side: THREE.DoubleSide });
        var fenceCube = new THREE.Mesh( fenceGeometry, fenceMaterial );
        fenceCube.rotation.z = -0.4;
        fenceCube.position.set(x, y, z);
        return fenceCube;
    }

    getMesh() {
        return this.mesh;
    }
}

class Application {
   constructor() {
       this.objects = [];
   }

   add(mesh) {
       if (Array.isArray(mesh)){
           for(var index in mesh){
               this.objects.push(mesh[index]);
               if (mesh[index] instanceof Obj) {
                   scene.add(mesh[index].getMesh() );
               }
           }
       } else {
           this.objects.push(mesh);
           scene.add(mesh.getMesh());
       }
   }
}

let app = new Application();

let objs = [
    new Fence({x : 1, y : 0, z : 1}),
    new Fence({x : 3, y : 0, z : 3}),
    new Fence({x : 3, y : 0, z : 5})
];
app.add(objs);