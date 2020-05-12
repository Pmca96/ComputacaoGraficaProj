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
      this.light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.4);
      this.light.position.set( position.x,position.y,position.z );
      this.light.groundColor.setHSL( 0.095, 1, 0.75 );
      this.light.color.setHSL( 0.6, 1, 0.6 );
    }
  }

  class HemisphereLightHelper extends Ligth {
    constructor( hemiLight, size = 10){
        super();
      this.light = new THREE.HemisphereLightHelper( hemiLight, size);
    
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
        this.mesh.rotation.y = 1;
    }

    verticalFence(x, y, z) {

        var fenceGeometry = new THREE.CubeGeometry(0.35, 2, 0.35);
        var fenceTexture = new THREE.TextureLoader().load("images/wood.png");
        fenceTexture.wrapS = fenceTexture.wrapT = THREE.RepeatWrapping;
        var fenceMaterial = new THREE.MeshPhongMaterial( { map: fenceTexture, side: THREE.DoubleSide });
        var fenceCube = new THREE.Mesh( fenceGeometry, fenceMaterial );
        fenceCube.position.set(x, y, z);
        fenceCube.castShadow = true;
        return fenceCube;
    }

    horizontalFence(x, y, z) {

        var fenceGeometry = new THREE.CubeGeometry(2, 0.25, 0.2);
        var fenceTexture = new THREE.TextureLoader().load("images/wood.png");
        fenceTexture.wrapS = fenceTexture.wrapT = THREE.RepeatWrapping;
        var fenceMaterial = new THREE.MeshPhongMaterial( { map: fenceTexture, side: THREE.DoubleSide });
        var fenceCube = new THREE.Mesh( fenceGeometry, fenceMaterial );
        fenceCube.position.set(x, y, z);
        fenceCube.castShadow = true;
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
        fenceCube.castShadow = true;
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
        fenceCube.castShadow = true;
        return fenceCube;
    }

    update(){

    }
    getMesh() {
        return this.mesh;
    }
}



class Application {
    constructor() {
        this.MainPlayer = "";
        this.clock = new THREE.Clock();
        this.objects = [];
        this.players = [];
        this.prevTime = performance.now();
        this.velocity = new THREE.Vector3();
        this.velocity.x = 1;
        this.velocity.z = 1;
        this.createScene();  
    }

    createScene() {

        this.container = document.getElementById('container');

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 200);
        this.camera.position.z = 5;

        this.camera.position.x = 1 - 3 *  Math.sin( 0 );
        this.camera.position.y = 20 + 1.5 ;
        this.camera.position.z = 1 - 3 * Math.cos( 0 );
        this.camera.lookAt( new THREE.Vector3(1,0+0.8,1));

        this.renderer = new THREE.WebGLRenderer( { alpha: true} );
        this.renderer.setSize( window.innerWidth, window.innerHeight);
        this.renderer.domElement.id = 'canvas';
        this.renderer.shadowMap.enabled = true;
        this.raycaster = new THREE.Raycaster();

        // Add Light
        this.light = new THREE.DirectionalLight( 0xffffff );
        this.light.color.setHSL( 0.1, 1, 0.95 );
        this.light.position.multiplyScalar( 70 );
        this.light.position.set( 50, 50, 0 );
        this.scene.add( this.light );



        this.light.castShadow = true;
        let d = 10;
        this.light.shadow.camera.left = - d;
        this.light.shadow.camera.right = d;
        this.light.shadow.camera.top = -d;
        this.light.shadow.camera.bottom =  d;


        this.light.shadow.mapSize.width = 2048;
        this.light.shadow.mapSize.height = 2048;

        this.light.shadow.camera.far = 500;
        this.light.shadow.camera.near = 0.5;
        // this.light.shadow.bias = - 0.0001;
        this.light.matrixAutoUpdate  = true;
        this.light.shadow.matrixAutoUpdate  = true;

        //Add Floor To the Scene HERE-------------------
        this.floorTexture = new THREE.TextureLoader().load("images/grass.png");
        this.floorTexture.wrapS = this.floorTexture.wrapT = THREE.RepeatWrapping; 
        this.floorTexture.repeat.set( 10, 10 );
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

        //Events------------------------------------------
        let Application = this;
        document.addEventListener('click', function(e) { Application.onMouseClick(e) }, false );
        document.addEventListener('mousedown', this.onMouseDown(), false);
        document.addEventListener('mouseup', this.onMouseUp(), false);
        document.addEventListener('mousemove', function(e) { Application.onMouseMove(e) }, false);
        document.addEventListener('mouseout', this.onMouseOut(), false);
        document.addEventListener('keydown', function(e) { Application.onKeyDown(e) }, false );
        document.addEventListener('keyup', function(e) { Application.onKeyUp(e) }, false );
        window.addEventListener( 'resize', this.onWindowResize(), false );
      
        //Final touches-----------------------------------
        container.appendChild( this.renderer.domElement );
        document.body.appendChild( container );
    

        this.render();
        //this.animate();

    }

    animate(){
        requestAnimationFrame( () => {
            this.render();
          });
        
      
                
        this.render();
    }

    render(){
        requestAnimationFrame(() => {
            this.render();
          });
        this.objects.forEach((object) => {
            if(object instanceof Obj)
              object.update();
          });
        
        if ( typeof this.MainPlayer.mesh != "undefined" && typeof this.MainPlayer.mixer != "undefined"  ){
            if (this.MainPlayer != "")
            this.MainPlayer.updateCameraPosition(this.camera, this.light, this.controls);
            this.MainPlayer.checkKeyStates();
            this.delta = this.clock.getDelta();
            this.players.map( i => {
                if (i.mixer)
                i.mixer.update(this.delta);
            });
       
            //this.MainPlayewr.mixer.update( this.delta );
        }

        if ( this.controls.isLocked === true ) {

            this.raycaster.ray.origin.copy( this.controls.getObject().position );
    
            this.velocity.x -= this.velocity.x ;
            this.velocity.z -= this.velocity.z ;
            this.controls.moveRight( - this.velocity.x  );
            this.controls.moveForward( - this.velocity.z  );
        

        }

        this.renderer.render( this.scene , this.camera );
    }

    add(mesh) {
        
        if (Array.isArray(mesh))
            for(var index in mesh) {
                if (mesh[index] instanceof Obj) {
                    this.objects.push(mesh[index]);
                    this.scene.add(mesh[index].getMesh() );
                } else if (mesh[index] instanceof Player) {
                    mesh[index].createPlayer(this.scene, this.camera, this.light);
                    this.players.push(mesh[index]);
                }   if (mesh[index] instanceof Ligth){
                    this.objects.push(mesh[index]);
                    this.scene.add( mesh[index].getLight() );
                }
            }
        else 
            if (mesh instanceof Obj) {
                this.objects.push(mesh.player);
                this.scene.add(mesh.getMesh() );
            } else if (mesh instanceof Player) {
                mesh.createPlayer(this.scene, this.camera, this.light);
                this.players.push(mesh);
            } else if (mesh instanceof Ligth){
                this.objects.push(mesh);
                this.scene.add( mesh.getLight() );
            }
        
    }

    remove(id) {
        this.scene.remove( this.playerForId(id).mesh );
    }

    onMouseClick(event){
        this.controls.lock();
        // let element = document.body;
        // if (document.fullscreenElement) {
        //     document.exitFullscreen(); 
            
        //     document.getElementById('canvas').style.cursor = "block";
        // } else {
        //     element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        //     if ( /Firefox/i.test( navigator.userAgent ) ) {
        //         var fullscreenchange = function ( event ) {
        //             if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {
        //                 document.removeEventListener( 'fullscreenchange', fullscreenchange );
        //                 document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
        //                 element.requestPointerLock();
        //             }
        //         };
        //         document.addEventListener( 'fullscreenchange', fullscreenchange, false );
        //         document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );
        //         element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
        //         element.requestFullscreen();
        //     } else {
        //         element.requestPointerLock();
        //     }
        //     document.getElementById('canvas').style.cursor = "none";
        // }


        // canvas = document.createElement("CANVAS"); 
        // canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
        // canvas.requestPointerLock(true);
        // console.log(canvas);
    }

    onMouseDown(){

    }

    onMouseUp(){

    }

    onMouseOut(){

    }

    onKeyDown( event ){
        this.MainPlayer.keyState[event.keyCode || event.which] = true;
    }

    onKeyUp( event ){
        this.MainPlayer.keyState[event.keyCode || event.which] = false;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    onMouseMove (event) {
        //this.MainPlayer.updateCameraPosition(this.camera, this.light, event);
    }

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
}
