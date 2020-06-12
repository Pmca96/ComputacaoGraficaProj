
import  {Turret} from './classTurrets.js';
import  Zone from './classZone.js';
import  Player from './classPlayer.js';
import {Fire}  from './libs/fire.js';
import  {Land, Route} from './classLands.js';
import  {Wolf, Buildings, Castle} from './classBuildings.js';
class Obj extends THREE.Object3D{
    constructor(x,y,z){
        super();
        this.position.set(x, y, z);
    }
}

class Ligth extends THREE.Object3D{
    constructor(position){
      super();
    }
    getLight(){
      return this.light;
    }
  }


  class HolophoteLigth extends Ligth{
    constructor(position){
      super(position);
      this.light = new THREE.PointLight(0xffffff, 1.5,50);
      this.light.position.set( position.x,position.y,position.z );
      this.light.castShadow = true;
      this.light.shadow.mapSize.width = 200;
      this.light.shadow.mapSize.height = 200;
 
    }
  }

  class HemisphereLight extends Ligth{
    constructor(position){
      super(position);
      this.light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.8);
      this.light.position.set( position.x,position.y,position.z );
      this.light.groundColor.setHSL( 0.095, 1, 0.75 );
      this.light.color.setHSL( 0.6, 1, 0.6 );
    }
  }

export default class Application {
    constructor() {
        this.MainPlayer = "";
        this.clock = new THREE.Clock();
        this.objects = [];
        this.objectsNoUpdate = [];
        this.players = [];
        this.wave=1;
        this.createScene();  
        this.building = 1;
        //MAIN OBJECTS TO LOAD
        this.zone = [new Zone({x : 1, y : 0, z : 1}), new Zone({x : 1, y : 0, z : 1}, -1)];
        this.objs = [
            new HemisphereLight({x:50, y: 50, z:0}),
            this.zone[0],
            this.zone[1],
            new Route({x : 0, y : -0.5, z : 0}),
        ];
        
      
    }

    createScene() {

        this.container = document.getElementById('container');

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 70);
        this.camera.position.z = 5;

        this.camera.position.x = 1 - 3 *  Math.sin( 0 );
        this.camera.position.y = 20 + 1.5 ;
        this.camera.position.z = 1 - 3 * Math.cos( 0 );
        this.camera.lookAt( new THREE.Vector3(1,0+0.8,1));

        this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true} );
        this.renderer.setSize( window.innerWidth, window.innerHeight);
        this.renderer.domElement.id = 'canvas';
        this.renderer.shadowMap.enabled = true;
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.raycaster = new THREE.Raycaster();


        
        // Add Light
        this.light = new THREE.DirectionalLight( 0xffffff, 0.7 );
        this.light.color.setHSL( 0.1, 1, 0.95 );
        this.light.position.multiplyScalar( 70 );
        this.light.position.set( 50, 50, 0 );
        this.scene.add( this.light );



        this.light.castShadow = false;
        let d = 100;
        this.light.shadow.camera.left = - d;
        this.light.shadow.camera.right = d;
        this.light.shadow.camera.top = -d;
        this.light.shadow.camera.bottom =  d;


        this.light.shadow.mapSize.width = 1024;
        this.light.shadow.mapSize.height = 1024;


        //Add Floor To the Scene HERE-------------------
        this.floorTexture = new THREE.TextureLoader().load("images/grass.png");
        this.floorTexture.wrapS = this.floorTexture.wrapT = THREE.RepeatWrapping; 
        this.floorTexture.repeat.set( 100, 100 );
        this.floorMaterial = new THREE.MeshPhongMaterial( { map: this.floorTexture, side: THREE.DoubleSide } );
        this.floorGeometry = new THREE.PlaneGeometry(200,200, 10, 10);
        this.floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial);
        this.floor.position.y = -0.5;
        this.floor.rotation.x = - Math.PI / 2;
        this.floor.receiveShadow = true;
        this.scene.add(this.floor);
        
        this.controls = new THREE.PointerLockControls( this.camera, document.body );
        this.scene.add( this.controls.getObject() );

        //Add SkyBox to the Scene HERE -----------------------
        this.scene.background = new THREE.CubeTextureLoader()
            .setPath( 'images/' )
            .load( [ 'xneg.png', 'xpos.png',  'zpos.png', 'zneg.png','ypos.png', 'yneg.png' ] );


            // let fire = new Fire( geometry, {
            //     textureWidth: 512,
            //     textureHeight: 512,
            //     debug: true
            // } );
            // fire.color1 = 0xffdcaa;
            // fire.color2 = 0xffa000;
            // fire.color3 = 0x000000;
            // fire.windX = 0.0;
            // fire.windY = 2.75;
            // fire.colorBias = 0.9;
            // fire.burnRate = 0;
            // fire.diffuse = 1.33;
            // fire.viscosity = 0.25;
            // fire.expansion = 1;
            // fire.swirl = 50.0;
            // fire.drag = 1;
            // fire.airSpeed = 50.0;
            // fire.speed = 500.0;
            // fire.massConservation = false;
            // fire.position.z = 2;
            // console.log(fire);
            // this.scene.add(fire);

            //Events------------------------------------------
        let Application = this;

        var blocker = document.getElementById( 'blocker' );
        var instructions = document.getElementById( 'instructions' );
        let controls = this.controls;
        instructions.addEventListener( 'click', function () {
            controls.lock();
        }, false );

        controls.addEventListener( 'lock', function () {
            instructions.style.display = 'none';
            blocker.style.display = 'none';
        } );

        controls.addEventListener( 'unlock', function () {
            blocker.style.display = 'block';
            instructions.style.display = '';
        } );

        document.addEventListener('click', function(e) { Application.onMouseClick(e) }, false );
        document.addEventListener('mousedown', this.onMouseDown(), false);
        document.addEventListener('mouseup', this.onMouseUp(), false);
        document.addEventListener('mousemove', function(e) { Application.onMouseMove(e) }, false);
        document.addEventListener('mouseout', this.onMouseOut(), false);
        document.addEventListener('keydown', function(e) { Application.onKeyDown(e) }, false );
        document.addEventListener('keyup', function(e) { Application.onKeyUp(e) }, false );
        window.addEventListener( 'resize', function(e) { Application.onWindowResize(e) } );
    
        //Final touches-----------------------------------
        container.appendChild( this.renderer.domElement );
        document.body.appendChild( container );
    

        this.render();

    }

    animate(){
        requestAnimationFrame(animate);
        this.render();
    }

    render(){
        requestAnimationFrame(() => {
            this.render();
          });

        this.delta = this.clock.getDelta();
        this.objects.forEach((object) => {
            if (object instanceof Wolf) {
                if (object.mixer) 
                    object.mixer.update(this.delta);
            } else if (object instanceof Buildings || object instanceof Turret)
                object.update();
          });
        
        if ( typeof this.MainPlayer.mesh != "undefined" && typeof this.MainPlayer.mixer != "undefined"  ){
            if (this.MainPlayer != "")
            this.MainPlayer.updateCameraPosition(this.camera, this.light);
            this.MainPlayer.checkKeyStates();
            this.players.map( i => {
                if (i.mixer)
                i.mixer.update(this.delta);
            });
       
        }

        this.renderer.render( this.scene , this.camera );
    }

    add(mesh) {
        
        if (Array.isArray(mesh))
            for(var index in mesh) {
                if (mesh[index] instanceof Land ) {
                    this.objectsNoUpdate.push(mesh[index]);
                    this.scene.add(mesh[index].getMesh());
                } else if (mesh[index] instanceof Obj  ) {
                    this.objectsNoUpdate.push(mesh[index]);
                    this.scene.add(mesh[index].getMesh() );
                } else if (mesh[index] instanceof Player) {
                    mesh[index].createPlayer(this.scene, this.camera, this.light);
                    this.players.push(mesh[index]);
                } else if (mesh[index] instanceof Ligth){
                    this.objectsNoUpdate.push(mesh[index]);
                    this.scene.add( mesh[index].getLight() );
                } else if (mesh[index] instanceof Zone) {
                    mesh[index].objects.map ((i) => {
                        this.objects.push(i);
                        this.scene.add(i.getMesh() );
                    });
                }
            }
        else 
            if (mesh instanceof Obj) {
                this.objectsNoUpdate.push(mesh.player);
                this.scene.add(mesh.getMesh() );
            } else if (mesh instanceof Player) {
                mesh.createPlayer(this.scene, this.camera, this.light);
                this.players.push(mesh);
            } else if (mesh instanceof Ligth){
                this.objectsNoUpdate.push(mesh);
                this.scene.add( mesh.getLight() );
            } else if (mesh instanceof Zone) {
                mesh.objectsNoUpdate.map ((i) => {
                    this.objects.push(i);
                    this.scene.add(i.getMesh() );
                });
            }
        
    }

    remove(id) {
        console.log(id);
        this.scene.remove( this.playerForId(id).mesh );
    }

    onMouseClick(event){
        this.add(this.objs);
        this.controls.lock();
    }

    onMouseDown(){

    }

    onMouseUp(){

    }

    onMouseOut(){

    }

    onKeyDown( event ){
        
        if (event.keyCode == 84) { //T
            if (this.building == 1) {
                for(var index in this.objects) 
                    if (this.objects[index] instanceof Buildings && this.objects[index] instanceof Castle == false ) 
                        this.objects[index].mesh.visible = false;
                this.building = false;
            } else {
                for(var index in this.objects) 
                    if (this.objects[index] instanceof Buildings && this.objects[index] instanceof Castle == false ) 
                        this.objects[index].mesh.visible = true;
                this.building = true;  
            } 
        } else if (event.keyCode == 89) { //Y
            if (this.light.castShadow == true)
                this.light.castShadow = false;
            else
                this.light.castShadow = true;
        } else
            this.MainPlayer.keyState[event.keyCode || event.which] = true;
    }

    onKeyUp( event ){
        this.MainPlayer.keyState[event.keyCode || event.which] = false;
    }

    onWindowResize(event) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    onMouseMove (event) {
    }

    updateZone(zone) {
        let zoneIndex = this.zoneForId(zone.playerId);
        this.zone[zoneIndex].updateZone(zone);
    }

    associateZone(zone) {
        this.zone[zone.index].updateZone(zone);
        console.log("Associate");
        console.log(zone);
        console.log(this.zone[zone.index]);
    }
// 
    calculateIntersects( event ){

        //Determine objects intersected by raycaster
        event.preventDefault();

        let vector = new THREE.Vector3();
        vector.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
        vector.unproject( camera );

        this.raycaster.ray.set( this.camera.position, vector.sub( this.camera.position ).normalize() );

        let intersects = this.raycaster.intersectObjects( objects );

        return intersects;
    }

    setMainPlayer(player) {
        this.MainPlayer = player;
        this.zone.map((i) => {
            if (typeof i.playerId === "undefined") {
                
                console.log("aaa");
                i.associatePlayer(player.playerId);
                return 0;
            }
        } );
    }

    playerForId (id){
        var index;
        for (var i = 0; i < this.players.length; i++){
            if (this.players[i].playerId == id){
                index = i;
                break;
            }
        }
        return this.players[i];
    };

    zoneForId (id){
        var index;
        for (var i = 0; i < this.zone.length; i++)
            if (this.zone[i].playerId == id){
                index = i;
                break;
            }
        
        return i;
    };
}


