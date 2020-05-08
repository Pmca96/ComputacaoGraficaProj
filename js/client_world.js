
var container, scene, camera, renderer, raycaster, objects = [];
var keyState = {};
var sphere;

var player, playerId, moveSpeed, turnSpeed;

var playerData;

var otherPlayers = [], otherPlayersId = [];

let clip = [];
let clock = new THREE.Clock();
let mixer;
let delta;

var loadWorld = function(){
    init();
    animate();

    function init(){

        //Setup------------------------------------------
        container = document.getElementById('container');

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 200);
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer( { alpha: true} );
        renderer.setSize( window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        raycaster = new THREE.Raycaster();

        // Add Light
        light = new THREE.DirectionalLight( 0xffffff );
        var helper = new THREE.DirectionalLightHelper( light, 2 );
        light.color.setHSL( 0.1, 1, 0.95 );
        light.position.multiplyScalar( 30 );
        light.position.set( 4, 3, 0 );
        light.shadow.mapSize.width = 1000;
        light.shadow.mapSize.height = 1000;
        scene.add( light );

        light.castShadow = true;

        //Add Floor To the Scene HERE-------------------
        var floorTexture = new THREE.TextureLoader().load("images/grass.png");
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
        floorTexture.repeat.set( 10, 10 );
        var floorMaterial = new THREE.MeshPhongMaterial( { map: floorTexture, side: THREE.DoubleSide } );
        var floorGeometry = new THREE.PlaneGeometry(200,200, 10, 10);
        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -0.5;
        floor.rotation.x = - Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

        //Add SkyBox to the Scene HERE -----------------------
        scene.background = new THREE.CubeTextureLoader()
            .setPath( 'images/' )
            .load( [ 'xpos.png', 'xneg.png',  'zpos.png', 'zneg.png','ypos.png', 'yneg.png' ] );




        //Events------------------------------------------
        document.addEventListener('click', onMouseClick, false );
        document.addEventListener('mousedown', onMouseDown, false);
        document.addEventListener('mouseup', onMouseUp, false);
        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('mouseout', onMouseOut, false);
        document.addEventListener('keydown', onKeyDown, false );
        document.addEventListener('keyup', onKeyUp, false );
        window.addEventListener( 'resize', onWindowResize, false );

        //Final touches-----------------------------------
        container.appendChild( renderer.domElement );
        document.body.appendChild( container );
    }

    function animate(){
        requestAnimationFrame( animate );
        
        var delta = clock.getDelta();
        if ( !(typeof mixer === 'undefined')) {
            mixer.update( delta );
            
        }
        render();
    }

    function render(){

        if ( player ){
            updateCameraPosition();
            checkKeyStates();
        }
        //Render Scene---------------------------------------
        renderer.clear();
        renderer.render( scene , camera );
    }

    function onMouseClick(){
        intersects = calculateIntersects( event );

        if ( intersects.length > 0 ){
            //If object is intersected by mouse pointer, do something
            if (intersects[0].object == sphere){
                alert("This is a sphere!");
            }
        }
    }
    function onMouseDown(){

    }
    function onMouseUp(){

    }
    function onMouseMove(){

    }
    function onMouseOut(){

    }
    function onKeyDown( event ){
        keyState[event.keyCode || event.which] = true;
    }

    function onKeyUp( event ){

        keyState[event.keyCode || event.which] = false;

    }
    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }
    function calculateIntersects( event ){

        //Determine objects intersected by raycaster
        event.preventDefault();

        var vector = new THREE.Vector3();
        vector.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
        vector.unproject( camera );

        raycaster.ray.set( camera.position, vector.sub( camera.position ).normalize() );

        var intersects = raycaster.intersectObjects( objects );

        return intersects;
    }

};

var createPlayer = function(data){
    playerData = data;

    var loader = new THREE.GLTFLoader();
    var dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath( 'js/libs/DRACOLoader.js' );
    loader.setDRACOLoader( dracoLoader );
    loader.load( 'male_adventurer/scene.gltf', function ( gltf ) {

        player = gltf.scene;
        player.rotation.set(0,5,0);
        player.castShadow = true;
        player.traverse( function ( child ) {
		
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
            }
        });
        console.log(player);
        player.position.x = data.x;
        player.position.y = data.y+5;
        player.position.z = data.z;
        playerId = data.playerId;
        moveSpeed = data.speed;
        turnSpeed = data.turnSpeed;
    
        updateCameraPosition();
    
        objects.push( player );
        scene.add( player );
        
 

        var animations = gltf.animations;
       
        mixer = new THREE.AnimationMixer( player );
        //mixer.clipAction( gltf.animations[ 0 ] ).play();
        animations.map((v,i) => {
            clip[i] = mixer.clipAction(v);
        })
        clip[6].play();
        console.log(clip);

    } );
    
   
};

var updateCameraPosition = function(){
    camera.position.x = player.position.x - 3 *  Math.sin( player.rotation.y );
    camera.position.y = player.position.y + 1.5 ;
    camera.position.z = player.position.z - 3 * Math.cos( player.rotation.y );
    camera.lookAt( new THREE.Vector3(player.position.x,player.position.y+0.8,player.position.z));
};

var updatePlayerPosition = function(data){

    var somePlayer = playerForId(data.playerId);

    somePlayer.position.x = data.x;
    somePlayer.position.y = data.y;
    somePlayer.position.z = data.z;

    somePlayer.rotation.x = data.r_x;
    somePlayer.rotation.y = data.r_y;
    somePlayer.rotation.z = data.r_z;

};

var updatePlayerData = function(){
    playerData.x = player.position.x;
    playerData.y = player.position.y;
    playerData.z = player.position.z;

    playerData.r_x = player.rotation.x;
    playerData.r_y = player.rotation.y;
    playerData.r_z = player.rotation.z;

};

var checkKeyStates = function(){
    if (keyState[38] || keyState[87]) {
        // up arrow or 'w' - move forward
        player.position.x += moveSpeed * Math.sin(player.rotation.y);
        player.position.z += moveSpeed * Math.cos(player.rotation.y);
        updatePlayerData();
        clip[2].play();
        socket.emit('updatePosition', playerData);
    } else if (keyState[40] || keyState[83]) {
        // down arrow or 's' - move backward
        player.position.x -= moveSpeed * Math.sin(player.rotation.y);
        player.position.z -= moveSpeed * Math.cos(player.rotation.y);

        clip[18].play();
        updatePlayerData();
        socket.emit('updatePosition', playerData);
    } else if (keyState[37] || keyState[65]) {
        // left arrow or 'a' - rotate left
        player.rotation.y += turnSpeed;
        updatePlayerData();
        socket.emit('updatePosition', playerData);
    } else if (keyState[39] || keyState[68]) {
        // right arrow or 'd' - rotate right
        player.rotation.y -= turnSpeed;
        updatePlayerData();
        socket.emit('updatePosition', playerData);
    }else if (keyState[81]) {
        // 'q' - strafe left
        player.position.x -= moveSpeed/2 * Math.cos(player.rotation.y);
        player.position.z += moveSpeed/2 * Math.sin(player.rotation.y);
        mixer.uncacheAction(clip[0]);
        clip[0].setLoop( THREE.LoopOnce );
        clip[0].play();
        updatePlayerData();
        socket.emit('updatePosition', playerData);
    } else if (keyState[69]) {
        // 'e' - strage right
        player.position.x += moveSpeed/2 * Math.cos(player.rotation.y);
        player.position.z -= moveSpeed/2 * Math.sin(player.rotation.y);
        console.log(mixer.getRoot());
        console.log(clock);
        console.log(clip[10]);
       
        mixer.uncacheAction(clip[10]);
        clip[10].setLoop( THREE.LoopOnce );
        clip[10].play();
        
        updatePlayerData();

        socket.emit('updatePosition', playerData);
    } else {
        clip[6].play();
    }

};

var addOtherPlayer = function(data){
    var cube_geometry = new THREE.BoxGeometry(data.sizeX, data.sizeY, data.sizeZ);
    var cube_material = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: false});
    var otherPlayer = new THREE.Mesh(cube_geometry, cube_material);

    otherPlayer.position.x = data.x;
    otherPlayer.position.y = data.y;
    otherPlayer.position.z = data.z;

    otherPlayersId.push( data.playerId );
    otherPlayers.push( otherPlayer );
    objects.push( otherPlayer );
    scene.add( otherPlayer );

};

var removeOtherPlayer = function(data){

    scene.remove( playerForId(data.playerId) );

};

var playerForId = function(id){
    var index;
    for (var i = 0; i < otherPlayersId.length; i++){
        if (otherPlayersId[i] == id){
            index = i;
            break;
        }
    }
    return otherPlayers[index];
};
