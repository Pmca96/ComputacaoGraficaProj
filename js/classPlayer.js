
import socket from './main.js';
export default class Player extends THREE.Object3D {
    constructor( data ){
        super();
        this.playerId = data.playerId;
        this.x = data.x;
        this.y = data.y;
        this.z = data.z;
        this.r_x = data.r_x;
        this.r_y = data.r_y;
        this.r_z = data.r_z;
        this.sizeX = data.sizeX;
        this.sizeY = data.sizeY;
        this.sizeZ = data.sizeZ;
        this.moveSpeed = data.speed;
        this.turnSpeed = data.turnSpeed;
        this.keyState = {};
        this.clip = [];
        this.lookingAtZ = 0;
        this.lives = 5;
        this.money = 200;
    }

    createPlayer(scene,camera, light){

            loadMesh(scene, this, function (fn) {
            fn.updateCameraPosition(camera, light);

            if (fn.x == -55) {
                fn.mesh.rotation.y = Math.PI/2;
                camera.lookAt(fn.position.x + 10 , fn.position.y, fn.position.z +2 );
            } else
                camera.lookAt(fn.position.x - 10 , fn.position.y, fn.position.z +2 );
                
        });
    };

    getMesh() {
        return this.mesh;
    }
     
    updateCameraPosition(camera){
        camera.position.x = this.mesh.position.x - 0 *  Math.sin( this.mesh.rotation.y );
        camera.position.y = this.mesh.position.y + 1 ;
        camera.position.z = this.mesh.position.z - 0 * Math.cos( this.mesh.rotation.y );
    };
    
    updatePlayerPosition(data){
        this.mesh.position.x = data.x;
        this.mesh.position.y = data.y;
        this.mesh.position.z = data.z;
    
        this.mesh.rotation.x = data.r_x;
        this.mesh.rotation.y = data.r_y;
        this.mesh.rotation.z = data.r_z;
        
    };
    
    checkKeyStates (){
        let data = [];
        if (this.keyState[38] || this.keyState[87]) {
            // up arrow or 'w' - move forward
            this.mesh.position.x += this.moveSpeed * Math.sin(this.mesh.rotation.y);
            this.mesh.position.z += this.moveSpeed * Math.cos(this.mesh.rotation.y);
            this.clip[2].play();
            this.playerData();
        } else if (this.keyState[40] || this.keyState[83]) {
            // down arrow or 's' - move backward
            this.mesh.position.x -= this.moveSpeed * Math.sin(this.mesh.rotation.y);
            this.mesh.position.z -= this.moveSpeed * Math.cos(this.mesh.rotation.y);
    
            this.playerData();
        } else if (this.keyState[37] || this.keyState[65]) {
            // left arrow or 'a' - strage right
            
            this.mesh.position.x += this.moveSpeed/2 * Math.cos(this.mesh.rotation.y);
            this.mesh.position.z -= this.moveSpeed/2 * Math.sin(this.mesh.rotation.y);
            this.playerData();
        } else if (this.keyState[39] || this.keyState[68]) {
            // right arrow or 'd' - strafe left
            this.mesh.position.x -= this.moveSpeed/2 * Math.cos(this.mesh.rotation.y);
            this.mesh.position.z += this.moveSpeed/2 * Math.sin(this.mesh.rotation.y);
    
            this.playerData();
        }else if (this.keyState[81]) {
            // 'q' - rotate left
           
            this.mesh.rotation.y += this.turnSpeed;
            this.playerData();
        } else if (this.keyState[69]) {
            // 'e' - rotate right
            
            this.mesh.rotation.y -= this.turnSpeed;
            this.playerData();
        } else {
            this.clip[6].play();
        }
    
    };

    playerData() {
        var data = {};
        data.playerId = this.playerId;
        data.x = this.mesh.position.x;
        data.y = this.mesh.position.y;
        data.z =this.mesh.position.z;
        data.r_x = this.mesh.rotation.x;
        data.r_y = this.mesh.rotation.y;
        data.r_z = this.mesh.rotation.z;
        socket.emit('updatePosition', data);
    }
    
    remove (scene){
        scene.remove( this.player );
    };
}

function loadMesh(scene, player, fn) {
    let loader = new THREE.GLTFLoader();


    let xValue = player.x;
    let yValue = player.y;
    let zValue = player.z;
    loader.load( 'male_adventurer/scene.gltf', function ( gltf ) {
        player.mesh = gltf.scene;
        player.mesh.rotation.set(0,5,0);
        player.mesh.castShadow = true;
        player.mesh.traverse( function ( child ) {
        
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
            }
        });
        player.mesh.position.x = xValue;
        player.mesh.position.y = yValue;
        player.mesh.position.z = zValue;

        scene.add(player.mesh);
        player.mesh.traverse( function ( object ) {
            if ( object.isMesh ) object.castShadow = true;
        } );

        player.animations = gltf.animations;
        
        player.mixer = new THREE.AnimationMixer( player.mesh );
        player.animations.map((v,i) => {
            player.clip[i] = player.mixer.clipAction(v);
        })
        player.clip[6].play();
        fn(player);
    } );
}