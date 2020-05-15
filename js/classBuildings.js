

class Castle extends THREE.Object3D {
    constructor(position) {
        super();
        
        this.position.x = position.x;
        this.position.y = position.y;
        this.position.z = position.z;
        this.createCastle();
    }
    
    createCastle(){
        let path = "models/Castle/castle.gltf";
        let material = "models/Castle/base_color.png";
        loadMesh1(path, material, this, function (fn) {
            
            fn.setMesh(fn.mesh);
        });
    }
    getMesh() {
        return this.mesh;
        
    }

    setMesh(mesh){
        this.mesh = mesh;
    }
    update(){
    }
    
}


function loadMesh1(path, textureM, objectClass, fn) {
 
    let loader = new THREE.GLTFLoader();
 

    let currPlayer = this.mesh;
    let xValue = objectClass.position.x;
    let yValue = objectClass.position.y;
    let zValue = objectClass.position.z;

    let textureLoader;
    let texture;

    if (textureM !="") {
        textureLoader = new THREE.TextureLoader();
        texture = textureLoader.load(textureM );
        texture.flipY = false;
    }
    

    loader.load( path, function ( gltf ) {
        objectClass.mesh = gltf.scene;
        objectClass.mesh.rotation.set(0,5,0);
        objectClass.mesh.castShadow = true;
        objectClass.mesh.traverse( function ( child ) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                if (textureM !="") { 
                    child.material.map=texture;
                }
            }
        });
     
        objectClass.mesh.position.x = xValue;
        objectClass.mesh.position.y = yValue;
        objectClass.mesh.position.z = zValue;

        objectClass.mesh.scale.x = 0.1;
        objectClass.mesh.scale.y = 0.1;
        objectClass.mesh.scale.z = 0.1;

        fn(objectClass);
    } );
}