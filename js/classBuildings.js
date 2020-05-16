class Castle extends THREE.Object3D {

    constructor(position) {
        super();
        this.createCastle(position.x, position.y, position.z);
    }
    
    createCastle(x, y, z){
        let path = "models/castelo/scene.gltf";
        let material = "";

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.scale.x = 0.8;
        this.scale.y = 0.8;
        this.scale.z = 0.8;

        loadMesh1(path, material, this, function (fn) {

        });
    }
    getMesh() {
        return this.mesh;
        
    }
    update(){
    }
    
}

class Market extends THREE.Object3D {

    constructor(position) {
        super();
        this.createMarket(position.x, position.y, position.z);
    }

    createMarket(x, y, z){
        let path = "models/mercado/scene.gltf";
        let material = "";

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.scale.x = 2;
        this.scale.y = 2;
        this.scale.z = 2;

        loadMesh1(path, material, this, function (fn) {

        });
    }
    getMesh() {
        return this.mesh;

    }
    update(){
    }

}

class Toilet extends THREE.Object3D {

    constructor(position) {
        super();
        this.createToilet(position.x, position.y, position.z);
    }

    createToilet(x, y, z){
        let path = "models/toilet/scene.gltf";
        let material = "";

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.scale.x = 1;
        this.scale.y = 1;
        this.scale.z = 1;
        this.rotation.y = 90;

        loadMesh1(path, material, this, function (fn) {

        });
    }
    getMesh() {
        return this.mesh;

    }
    update(){
    }

}

class whaleHouse extends THREE.Object3D {

    constructor(position, rotation) {
        super();
        this.createWhaleHouse(position.x, position.y, position.z, rotation.y);
    }

    createWhaleHouse(x, y, z, rt){
        let path = "models/whale_house/scene.gltf";
        let material = "";

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.scale.x = 1;
        this.scale.y = 1;
        this.scale.z = 1;
        this.rotation.y = rt;

        loadMesh1(path, material, this, function (fn) {

        });
    }

    getMesh() {
        return this.mesh;
    }
    update(){
    }
}

// class brightHouse extends THREE.Object3D {
//
//     constructor(position) {
//         super();
//         this.createBrightHouse(position.x, position.y, position.z);
//     }
//
//     createBrightHouse(){
//         let path = "models/house/scene.gltf";
//         let material = "";
//
//         loadMesh1(path, material, this, function (fn) {
//
//         });
//     }
//
//     getMesh() {
//         console.log(this.mesh);
//         return this.mesh;
//     }
//     update(){
//     }
// }

// class Plaza extends THREE.Object3D {
//
//     constructor(position) {
//         super();
//         this.createMedPlaza(position.x, position.y, position.z);
//     }
//
//     createMedPlaza(){
//         let path = "models/medieval_plaza/scene.gltf";
//         let material = "";
//
//         loadMesh1(path, material, this, function (fn) {
//
//         });
//     }
//
//     getMesh() {
//         return this.mesh;
//     }
//     update(){
//     }
// }

class witchHouse extends THREE.Object3D {

    constructor(position, rotation) {
        super();
        this.createWitchHouse(position.x, position.y, position.z, rotation.y);
    }

    createWitchHouse(x, y, z, rt){
        let path = "models/witchs_cottage/scene.gltf";
        let material = "";

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.scale.x = 0.2;
        this.scale.y = 0.2;
        this.scale.z = 0.2;
        this.rotation.y = rt;

        loadMesh1(path, material, this, function (fn) {

        });
    }

    getMesh() {
        return this.mesh;
    }
    update(){
    }
}

class skyTower extends THREE.Object3D {

    constructor(position) {
        super();
        this.createSkyTower(position.x, position.y, position.z);
    }

    createSkyTower(x, y, z){
        let path = "models/skyTower/scene.gltf";
        let material = "";

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.scale.x = 0.2;
        this.scale.y = 0.2;
        this.scale.z = 0.2;

        loadMesh1(path, material, this, function (fn) {

        });
    }

    getMesh() {
        return this.mesh;
    }
    update(){
    }
}


function loadMesh1(path, textureM, objectClass, fn) {
 
    let loader = new THREE.GLTFLoader();
 

    let currPlayer = this.mesh;

    let textureLoader;
    let texture;

    if (textureM !="") {
        textureLoader = new THREE.TextureLoader();
        texture = textureLoader.load(textureM );
        texture.flipY = false;
    }
    

    loader.load( path, function ( gltf ) {
        objectClass.mesh = gltf.scene;
        objectClass.mesh.rotation.y = objectClass.rotation.y;
        objectClass.mesh.castShadow = true;
        objectClass.mesh.traverse( function ( child ) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                if (textureM !="") { 
                    child.material.map=texture;
                }
            }
        });
     
        objectClass.mesh.position.x = objectClass.position.x;
        objectClass.mesh.position.y = objectClass.position.y;
        objectClass.mesh.position.z = objectClass.position.z;


        objectClass.mesh.scale.x = objectClass.scale.x;
        objectClass.mesh.scale.y = objectClass.scale.y;
        objectClass.mesh.scale.z = objectClass.scale.z;

        fn(objectClass);
    } );
}