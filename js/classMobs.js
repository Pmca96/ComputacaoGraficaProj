class Mobs extends THREE.Object3D {
    constructor(position, inv, timeSpawn) {
        super();
        this.inv = inv;
        this.timeSpawn = timeSpawn;
        this.spline = new Spline(position,inv, timeSpawn);
        this.pt = 0;
        this.tangent = 0;
        this.radians = 0;
        this.t = 0;
        this.signalVector = 1;
        if (this.position.y < 0)
            this.signalVector = -1
        this.up = new THREE.Vector3( 0, 0, 1 );
    }

    moveOnSpline(currentTime) {
        if (currentTime > this.timeSpawn && this.t < 1)  {
            this.mesh.visible = true;
            this.pt = this.spline.spline.getPoint(this.t);
            this.mesh.position.set( this.pt.x, this.pt.y, this.pt.z );
            
            let axis = new THREE.Vector3( );
            // get the tangent to the curve
            this.tangent = this.spline.spline.getTangent( this.t ).normalize();

            // calculate the axis to rotate around
            axis.crossVectors( this.up, this.tangent ).normalize();
            
            // calcluate the angle between the up vector and the tangent
            this.radians = Math.acos( this.up.dot( this.tangent ) );
        
            // set the quaternion
            this.mesh.quaternion.setFromAxisAngle( axis, this.radians);
            this.t += 0.00025;
            this.t += 0.00225;
            return this.t;
        }
        return 0;
      }
}


class Wolf extends Mobs {

    constructor(position, inv, timeSpawn, levelUp) {
        super(position, inv, timeSpawn);
        this.life = 200*levelUp;
        this.coins = 40/levelUp;
        this.timeSpawn = timeSpawn;
        this.createWolf(position.x, position.y, position.z, inv);
    }

    createWolf(x, y, z, inv){
        let path = "models/wolf/Wolf-Blender-2.82a.gltf";
        let material = "";

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.scale.x = 4;
        this.scale.y = 4;
        this.scale.z = 3;
        if (this.position.z > 0)
            this.rotation.y = Math.PI;
        loadMesh2(path, material, this, function (fn) {
            fn.visible=false;
      
        });
    }

    getMesh() {
        return this.mesh;
    }
    update(){
    }
}


class Spline {
    constructor(position, inv, timeSpawn) {
        
        this.spline = new THREE.CatmullRomCurve3([
            new THREE.Vector3(position.x, position.y, position.z),
            new THREE.Vector3(position.x, position.y, position.z*2/3),
            new THREE.Vector3(position.x, position.y, position.z/3),
            new THREE.Vector3(-2*inv, position.y, 0),
           // new THREE.Vector3(-10*inv, position.y+1, 0),
            new THREE.Vector3(-20*inv, position.y, 0),
            
            new THREE.Vector3(-20*inv, position.y, 20*inv),
            //new THREE.Vector3(-20*inv, position.y+1, 40*inv),
            new THREE.Vector3(-21*inv, position.y, 41*inv),
            new THREE.Vector3(-31*inv, position.y, 41*inv),
            new THREE.Vector3(-42*inv, position.y, 40*inv),
           // new THREE.Vector3(-42*inv, position.y+1, 39*inv),
            new THREE.Vector3(-42*inv, position.y, 24*inv),
           // new THREE.Vector3(-42*inv, position.y+1, 12*inv),
            new THREE.Vector3(-41*inv, position.y, 11*inv),
           // new THREE.Vector3(-31*inv, position.y+1, 11*inv),
            new THREE.Vector3(-31*inv, position.y, 10*inv),
            new THREE.Vector3(-30*inv, position.y, 0),
            new THREE.Vector3(-25*inv, position.y, 0),
            new THREE.Vector3(-24.5*inv, position.y, -7.5*inv),
            new THREE.Vector3(-25*inv, position.y, -15*inv),
            new THREE.Vector3(-19*inv, position.y, -13*inv),
            new THREE.Vector3(-18*inv, position.y, -27*inv),
            new THREE.Vector3(-19*inv, position.y, -45*inv),
            new THREE.Vector3(-28*inv, position.y, -45*inv),
            new THREE.Vector3(-37*inv, position.y, -46*inv),
            new THREE.Vector3(-38*inv, position.y, -34*inv),
            new THREE.Vector3(-37*inv, position.y, -26.5*inv),
            new THREE.Vector3(-47*inv, position.y, -26*inv),
            new THREE.Vector3(-47*inv, position.y, -13*inv),
            new THREE.Vector3(-47*inv, position.y, -1*inv),
            new THREE.Vector3(-55*inv, position.y, -0.3*inv),
        ], false, "centripetal", 0);
        var material = new THREE.LineBasicMaterial({
            color: 0xff00f0,
        });
        var geometry = new THREE.Geometry();
        for(var i = 0; i < this.spline.getPoints(200).length; i++){
            geometry.vertices.push(this.spline.getPoints(200)[i]);  
        }
        this.line = new THREE.Line(geometry, material);
        
    }

    getLine() {
        return this.line;
    }
}



var loader = new THREE.GLTFLoader();

//GLTF loader
function loadMesh2(path, textureM, objectClass, fn) {
    

    let textureLoader;
    let texture;

    if (textureM !="") {
        textureLoader = new THREE.TextureLoader();
        texture = textureLoader.load(textureM );
        texture.flipY = false;
    }

    loader.load( path, function ( gltf ) {
        
        objectClass.mesh = gltf.scene;
        objectClass.mesh.castShadow = true;
        objectClass.mesh.receiveShadow = true;
        objectClass.mesh.traverse( function ( child ) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                if (textureM !="") { 
                    child.material.map=texture;
                }
            }
        });

        
        objectClass.mesh.rotation.y = objectClass.rotation.y;
  
        objectClass.mesh.position.x = objectClass.position.x;
        objectClass.mesh.position.y = objectClass.position.y;
        objectClass.mesh.position.z = objectClass.position.z;

        objectClass.mesh.scale.x = objectClass.scale.x;
        objectClass.mesh.scale.y = objectClass.scale.y;
        objectClass.mesh.scale.z = objectClass.scale.z;

        // inicio animation of mobs
        objectClass.clip = [];
        objectClass.animations = gltf.animations;
        objectClass.mixer = new THREE.AnimationMixer( objectClass.mesh );
        
        objectClass.animations.map((v,i) => {
            objectClass.clip[i] = objectClass.mixer.clipAction(v);
        })
        objectClass.clip[0].play();
        // fim animation of mobs
        fn(objectClass);
    } );
}

export { Mobs, Wolf };