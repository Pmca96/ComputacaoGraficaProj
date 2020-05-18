class Buildings extends THREE.Object3D {
    constructor(position, inv) {
        super();
    }
}

class Castle extends Buildings {

    constructor(position, inv) {
        super();
        this.createCastle(position.x, position.y, position.z, inv);
    }
    
    createCastle(x, y, z, inv){
        let path = "models/castelo/scene.gltf";
        let material = "";

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.scale.x = 0.8;
        this.scale.y = 0.8;
        this.scale.z = 0.8;

        if (inv != 1)
            this.rotation.y = Math.PI;
        console.log(this.rotation.y);
        loadMesh1(path, material, this, function (fn) {

        });
    }
    getMesh() {
        return this.mesh;
        
    }
    update(){
    }
    
}

class Market extends Buildings {

    constructor(position, inv) {
        super();
        this.createMarket(position.x, position.y, position.z, inv);
    }

    createMarket(x, y, z, inv){
        let path = "models/mercado/scene.gltf";
        let material = "";

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.scale.x = 2;
        this.scale.y = 2;
        this.scale.z = 2;

        if (inv != 1)
            this.rotation.y = Math.PI;

        loadMesh1(path, material, this, function (fn) {

        });
    }
    getMesh() {
        return this.mesh;

    }
    update(){
    }

}

class Toilet extends Buildings {

    constructor(position, inv) {
        super();
        this.createToilet(position.x, position.y, position.z, inv);
    }

    createToilet(x, y, z, inv){
        let path = "models/toilet/scene.gltf";
        let material = "";

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.scale.x = 1;
        this.scale.y = 1;
        this.scale.z = 1;

        this.rotation.y = Math.PI/2;
        if (inv != 1)
            this.rotation.y = -Math.PI/2;

        loadMesh1(path, material, this, function (fn) {

        });
    }
    getMesh() {
        return this.mesh;

    }
    update(){
    }

}

class MedievalHouse extends Buildings {

    constructor(position, rotation, inv) {
        super();
        this.createHouse(position.x, position.y, position.z, rotation.y, inv);
    }

    createHouse(x, y, z, rt, inv){
        let path = "models/medieval_house/scene.gltf";
        let material = "";

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.scale.x = 0.4;
        this.scale.y = 0.4;
        this.scale.z = 0.4;
        if (inv != 1)
            this.rotation.y = rt+Math.PI;
        else
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

class Houses extends Buildings {

    constructor(position, rotation, inv) {
        super();
        this.createHouse(position.x, position.y, position.z, rotation.y, inv);
    }

    createHouse(x, y, z, rt, inv){
        let path = "models/fantasy_house/scene.gltf";
        let material = "";

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.scale.x = 0.04;
        this.scale.y = 0.04;
        this.scale.z = 0.04;
        if (inv != 1)
            this.rotation.y = rt+Math.PI;
        else
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

class FantasyHouses extends Buildings {

    constructor(position, rotation, inv) {
        super();
        this.createHouse(position.x, position.y+8, position.z, rotation.y, inv);
    }

    createHouse(x, y, z, rt, inv){
        let path = "models/fantasy_house1/scene.gltf";
        let material = "";

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.scale.x = 8;
        this.scale.y = 8;
        this.scale.z = 8;
        if (inv != 1)
            this.rotation.y = rt+Math.PI;
        else
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

class LittlePolly extends Buildings {

    constructor(position, rotation, inv) {
        super();
        this.createPolly(position.x, position.y+6.5, position.z, rotation.y, inv);
    }

    createPolly(x, y, z, rt, inv){
        let path = "models/littlePolly/scene.gltf";
        let material = "";

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.scale.x = 7;
        this.scale.y = 7;
        this.scale.z = 7;
        if (inv != 1)
            this.rotation.y = rt+Math.PI;
        else
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

class Forge extends Buildings {

    constructor(position, rotation, inv) {
        super();
        this.createForge(position.x, position.y, position.z, rotation.y, inv);
    }

    createForge(x, y, z, rt, inv){
        let path = "models/forge/scene.gltf";
        let material = "";

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.scale.x = 0.01;
        this.scale.y = 0.01;
        this.scale.z = 0.01;
        if (inv != 1)
            this.rotation.y = rt+Math.PI;
        else
            this.rotation.y = rt;

        loadMesh1(path, material, this, function (fn) {

        });
    }

    getMesh() {
        
        return this.mesh.traverse();
    }
    update(){
    }
}

class SkyTower extends Buildings {

    constructor(position, inv) {
        super();
        this.createSkyTower(position.x, position.y, position.z, inv);
    }

    createSkyTower(x, y, z, inv){
        let path = "models/skyTower/scene.gltf";
        let material = "";

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.scale.x = 0.2;
        this.scale.y = 0.2;
        this.scale.z = 0.2;
        if (inv != 1)
            this.rotation.y = Math.PI;
   
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
        // objectClass.mesh.material.flatShading = true;
        // let count = Math.floor( objectClass.mesh.geometry.attributes.position.count * 0.875 ); // number of vertices to remove
        // objectClass.mesh.geometry = modifier.modify( objectClass.mesh.geometry, count );
        
        objectClass.mesh.position.x = objectClass.position.x;
        objectClass.mesh.position.y = objectClass.position.y;
        objectClass.mesh.position.z = objectClass.position.z;


        objectClass.mesh.scale.x = objectClass.scale.x;
        objectClass.mesh.scale.y = objectClass.scale.y;
        objectClass.mesh.scale.z = objectClass.scale.z;

        fn(objectClass);
    } );
}


export { Castle,Market,MedievalHouse, Forge,SkyTower ,Houses, Toilet, FantasyHouses,LittlePolly};