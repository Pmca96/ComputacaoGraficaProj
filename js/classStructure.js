import socket from './main.js';
import  {Turret, TurretFree, Turret1, Turret2} from './classTurrets.js';
import  Zone from './classZone.js';
import  Player from './classPlayer.js';
import  {Land, Route} from './classLands.js';
import  {Buildings, Castle} from './classBuildings.js';
import  {Wolf, Mobs} from './classMobs.js';
import  Wave from './classWave.js';
import  Projectil from './classProjectil.js';
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
        this.mobs=[];
        this.players = [];
        this.projectil = [];
        this.createScene();  
        this.building = 1;
        //MAIN OBJECTS TO LOAD
        this.turretExemple = [new Turret1(0,1), new Turret2(0,2)];
        this.zone = [new Zone({x : 1, y : 0, z : 1}), new Zone({x : 1, y : 0, z : 1}, -1)];
        this.objs = [
            new HemisphereLight({x:50, y: 50, z:0}),
            this.zone[0],
            this.zone[1],
            new Route({x : 0, y : -0.5, z : 0}),
        ];
        this.selectedTower = -1;
        this.flag = 0;
        this.gameStatus = 0;
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
        document.addEventListener('keydown', function(e) { Application.onKeyDown(e) }, false );
        document.addEventListener('keyup', function(e) { Application.onKeyUp(e) }, false );
        window.addEventListener( 'resize', function(e) { Application.onWindowResize(e) } );
    
        //Final touches-----------------------------------
        container.appendChild( this.renderer.domElement );
        document.body.appendChild( container );
    
        socket.emit('requestUpdateZone');
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

        this.startGame();

        this.delta = this.clock.getDelta();
        
        this.objects.forEach((object) => {
            if (object instanceof Buildings || object instanceof Turret) {
                if (object instanceof Turret2)
                    object.update(this.mobs);
                else
                    object.update();

                if (object instanceof Turret1 || object instanceof Turret2){
                    this.mobs.forEach((object1) => {
                        //confirma distancia de raio , se sim tenta atacar
                        let distance = Math.sqrt(Math.pow(object.mesh.position.x-object1.mesh.position.x,2) + 
                        // Math.pow(object.mesh.position.y-object1.mesh.position.y,2) + 
                        Math.pow(object.mesh.position.z-object1.mesh.position.z,2));
                        if (distance <= object.attackRange) { // se conseguir atacar com o projetil da torre
                            let typeProjectil = object.attackToPosition(object1.mesh);
                            if (typeProjectil != 0) { // fire (1) & water (2)
                                let projCreation = new Projectil (object, typeProjectil, object1.mesh.position );
                                this.add(projCreation);
                            }
                        }
                    });
                }
            }

            
        });
        
        this.projectil.forEach((object) => {
            object.update();
        });

        this.mobs.forEach((object, indexMob) => {
         
            if (object instanceof Wolf) {
                if (object.mixer) 
                    object.mixer.update(this.delta);
            

                let indexZone = this.zoneForId(this.MainPlayer.playerId);

                //[status:1,indexes:{}] hit
                //[status:2,indexes:{}] dead
                let isHitted = object.update(this.projectil);
                if (isHitted.status == 2) {
                    let infoMobMesh = this.mobs[indexMob];
                    this.scene.remove(infoMobMesh.spline.spline);
                    this.scene.remove(infoMobMesh.mesh);
                    this.mobs = this.mobs.slice(indexMob+1);

                    
                    if ((object.mesh.position.x > 0 && this.zone[indexZone].inv == -1) ||(object.mesh.position.x < 0 && this.zone[indexZone].inv == 1)  ) {
                        this.MainPlayer.money +=object.coins;
                        document.getElementById("money").innerHTML= this.MainPlayer.money;
                    }
                    
                    isHitted.indexes.map((i, index) => {
                        let infoMesh = this.projectil[index].mesh;
                        this.projectil = this.projectil.slice(index+1);
                        this.scene.remove(infoMesh);
                    });
                } else {
                    let positionX_beforeMovement = object.mesh.position.x;
                    let reachedCastle = object.moveOnSpline(this.zone[indexZone].timeBetweenWaves - this.zone[indexZone].timer);
                    if (reachedCastle >= 1) {
                        let dataObj = this;
                        this.zone.map ((i) => {
                            if ( (i.inv > 0 && positionX_beforeMovement < 0 ) || (i.inv < 0 && positionX_beforeMovement >  0 )) {
                                if (typeof i.playerId  != "undefined" && i.playerId  != "") {
                                    let pIndex = dataObj.playerForId(i.playerId);
                                    pIndex.lives-=1;
                                    if (pIndex.lives == 0 ) {
                                        this.gameStatus = 2;
                                        if ( i.playerId == this.MainPlayer.playerId )
                                            document.getElementById("timer").innerHTML = "You Lost";
                                        else 
                                            document.getElementById("timer").innerHTML = "You Won";
                                        document.getElementById("instructions").style.backgroundColor  = "black";

                                        instructions.style.display = 'none';
                                        while(this.scene.children.length > 0)
                                            this.scene.remove(this.scene.children[0]); 

                                        this.objects = [];
                                        this.objectsNoUpdate = [];
                                        this.mobs=[];
                                        this.players = [];
                                        this.projectil = [];
                                        return 0;

                                    }
                                }
                            }
                        });
                        if (this.gameStatus != 2) {
                            let infoMobs = this.mobs[indexMob];
                            this.scene.remove(infoMobs.spline.spline);
                            this.scene.remove(infoMobs.mesh);
                            this.mobs = this.mobs.slice(indexMob+1);
                        }
                        
                    }
                    if (isHitted.status == 1)
                        isHitted.indexes.map((i, index) => {
                            let infoMesh = this.projectil[index].mesh;
                            this.projectil = this.projectil.slice(index+1);
                            this.scene.remove(infoMesh);
                        });
                    
                }
                
                document.getElementById("health").innerHTML = this.MainPlayer.lives;
            }
        });

        this.projectil.forEach((object, ind) => {
            //valida se o projetil esta no final da spline para ser removido
            if (object.t >= 1) {
                this.scene.remove(object.mesh);
                this.projectil =this.projectil.slice(ind+1);
            }
        });
        let timerInfo = document.getElementById( 'counterTime' ).innerHTML.trim();
        
        if ( typeof this.MainPlayer.mesh != "undefined" && typeof this.MainPlayer.mixer != "undefined" ){
            if (this.MainPlayer != "")
            this.MainPlayer.updateCameraPosition(this.camera, this.light);
            this.MainPlayer.checkKeyStates();
            this.players.map( i => {
                if (i.mixer)
                i.mixer.update(this.delta);
            });

            let indexZone = this.zoneForId(this.MainPlayer.playerId);
            let meshMainP =this.MainPlayer.mesh.position;
            let foundInside = 0;
            let towerDiv = document.getElementById( 'towerDiv' );
            if (indexZone > -1 &&  timerInfo != '--:--' )
            this.zone[indexZone].turretClass.map ( (i, indexT  ) => {
                let distance = Math.sqrt(Math.pow(meshMainP.x-i.mesh.position.x,2) + Math.pow(meshMainP.y-i.mesh.position.y,2) + Math.pow(meshMainP.z-i.mesh.position.z,2));
                if (distance < 3.5)  {
                    foundInside = 1;
                    if (i instanceof TurretFree) {
                        document.getElementById( 'towerOption2' ).style.display = 'none';
                        document.getElementById( 'towerOption1' ).style.display = 'block';
                        document.getElementById( 'tower1' ).style.display = 'block';
                        document.getElementById( 'tower2' ).style.display = 'block';
                        document.getElementById( 'towerInfo' ).style.display = 'none';
                        document.getElementById( 'mainTitle' ).innerHTML = 'Tower';
                        document.getElementById( 'title1' ).innerHTML = 'Fire';
                        document.getElementById( 'title2' ).innerHTML = 'Water';
                        document.getElementById( 'dmdg1' ).innerHTML = this.turretExemple[0].attackDamadge;
                        document.getElementById( 'dmdg2' ).innerHTML = this.turretExemple[1].attackDamadge;
                        document.getElementById( 'range1' ).innerHTML = this.turretExemple[0].attackRange;
                        document.getElementById( 'range2' ).innerHTML = this.turretExemple[1].attackRange;
                        document.getElementById( 'speed1' ).innerHTML = this.turretExemple[0].attackSpeed;
                        document.getElementById( 'speed2' ).innerHTML = this.turretExemple[1].attackSpeed;
                        document.getElementById( 'cost1' ).innerHTML = this.turretExemple[0].price;
                        document.getElementById( 'cost2' ).innerHTML = this.turretExemple[1].price;
                        document.getElementById( 'costText' ).innerHTML =  "Cost";
                    }else if (i.lvl == 1) {
                        document.getElementById( 'towerOption2' ).style.display = 'none';
                        document.getElementById( 'towerOption1' ).style.display = 'block';
                        document.getElementById( 'towerInfo' ).style.display = 'none';
                        document.getElementById( 'tower1' ).style.display = 'block';
                        document.getElementById( 'tower2' ).style.display = 'block';

                        if (i instanceof Turret1) 
                            document.getElementById( 'mainTitle' ).innerHTML = 'Fire';
                        else if  (i instanceof Turret2) 
                            document.getElementById( 'mainTitle' ).innerHTML = 'Water';
                        let data = i.getLevelUp();
         
                        document.getElementById( 'title1' ).innerHTML = 'Level 1';
                        document.getElementById( 'title2' ).innerHTML = 'Level 2';
                        document.getElementById( 'dmdg1' ).innerHTML = i.attackDamadge;
                        document.getElementById( 'dmdg2' ).innerHTML = data.attackDamadge;
                        document.getElementById( 'range1' ).innerHTML = i.attackRange;
                        document.getElementById( 'range2' ).innerHTML = data.attackRange;
                        document.getElementById( 'speed1' ).innerHTML =  i.attackSpeed;
                        document.getElementById( 'speed2' ).innerHTML =  data.attackSpeed;
                        document.getElementById( 'cost1' ).innerHTML =  data.price;
                        document.getElementById( 'cost2' ).innerHTML =  i.price;
                        document.getElementById( 'costText' ).innerHTML =  "Sell";
                        
                    }else if (i.lvl == 2) {
                        document.getElementById( 'towerOption2' ).style.display = 'block';
                        document.getElementById( 'towerOption1' ).style.display = 'none';
                        document.getElementById( 'towerInfo' ).style.display = 'block';
                        document.getElementById( 'tower1' ).style.display = 'none';
                        document.getElementById( 'tower2' ).style.display = 'none';


                        if (i instanceof Turret1) 
                            document.getElementById( 'mainTitle' ).innerHTML = 'Fire';
                        else if  (i instanceof Turret2) 
                            document.getElementById( 'mainTitle' ).innerHTML = 'Water';
                        let data = i.getLevelUp();
         
                        document.getElementById( 'title3' ).innerHTML = 'Level 2';
                        document.getElementById( 'dmdg3' ).innerHTML = i.attackDamadge;
                        document.getElementById( 'range3' ).innerHTML = i.attackRange;
                        document.getElementById( 'speed3' ).innerHTML =  i.attackSpeed;
                        document.getElementById( 'cost3' ).innerHTML =  i.price;
                    }
                
                    towerDiv.style.display = 'block';
                    this.selectedTower = indexT;
                    return;
                }
            });

            if (foundInside == 0) {
                towerDiv.style.display = 'none';
                this.selectedTower = -1;
            }
            if (this.gameStatus != 2) {
                this.zone.map ((i,ind) => {
                    if (i.playerId != "" && i.timer == 0 ) {
                        if (this.MainPlayer.playerId == i.playerId)
                            i.createWave(1);
                        else
                            i.createWave(0);
                        setTimeout(() => {  
                            if (ind == this.zone.length-1)
                                this.add(i.waves[i.waves.length-1], 0);
                            else
                                this.add(i.waves[i.waves.length-1],1);
                        }, 5000);
                        i.startTimer();
                    }
                });
            }
        }

       

        
        this.renderer.render( this.scene , this.camera );
    }

    add(mesh, clear = 0) {
        
     
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
                    mesh[index].turretClass.map ((i) => {
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
                mesh.objects.map ((i) => {
                    this.objects.push(i);
                    this.scene.add(i.getMesh() );
                });
                mesh.turretClass.map ((i) => {
                    this.objects.push(i);
                    this.scene.add(i.getMesh() );
                });
            } else if (mesh instanceof Turret) {
                this.scene.add(mesh.getMesh() );
                this.objects.push(mesh);
            } else if (mesh instanceof Wave) {
                if (clear == 1 && this.mobs.length > 0) {
                    this.mobs.map ((i) => this.scene.remove(i.mesh));
                    this.mobs.map ((i) => {
                        this.scene.remove(i.spline.spline);
                    });
                    this.mobs = [];
                }
                mesh.wolfs.map ((i) => {
                    this.mobs.push(i);
                    this.scene.add(i.getMesh() );
                });
            } else if (mesh instanceof Projectil) {
                this.projectil.push(mesh);
                this.scene.add(mesh.getMesh());
            }
        
    }

    remove(id) {
        this.scene.remove( this.playerForId(id).mesh );
    }

    

    onMouseClick(event){
        if (this.gameStatus != 2) {
            if (this.flag == 0)
                this.add(this.objs);
            this.flag = 1;
            this.controls.lock();
        }
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
        } else if (event.keyCode == 49) { // 1
            if (this.selectedTower != -1) { 
                    let zoneData = this.zone[this.zoneForId(this.MainPlayer.playerId)];
                    if (zoneData.turretClass[this.selectedTower] instanceof TurretFree) {
                        if (this.MainPlayer.money - this.turretExemple[0].price >= 0) {
                            let dataTurret = zoneData.turretClass[this.selectedTower];
                            zoneData.turretClass[this.selectedTower] = new Turret1 ({x: dataTurret.x, y:dataTurret.y, z:dataTurret.z});
                            this.MainPlayer.money -= this.turretExemple[0].price;
                            let tmpobj = this.scene.getObjectByProperty("uuid",dataTurret.uuid );
                            this.scene.remove(tmpobj);
                            this.objects = this.objects.filter(item => item !== dataTurret) // remove o elemento
                            this.add(zoneData.turretClass[this.selectedTower]);
                            this.zone[this.zoneForId(this.MainPlayer.playerId)].turret[this.selectedTower] = 1;
                            this.sendUpdateZoneData();
                        }
                    }
                    else {
                        if (this.MainPlayer.money -zoneData.turretClass[this.selectedTower].getLevelUp().price >= 0) {
                            zoneData.turretClass[this.selectedTower].levelUp();
                            this.MainPlayer.money -= zoneData.turretClass[this.selectedTower].getLevelUp().price;
                            this.zone[this.zoneForId(this.MainPlayer.playerId)].turretUpgrades[this.selectedTower] = 1;
                            
                            this.sendUpdateZoneData();
                        }
                    }
                    document.getElementById("money").innerHTML= this.MainPlayer.money;
                }
        } else if (event.keyCode == 50) { // 2
            if (this.selectedTower != -1) { 
                let zoneData = this.zone[this.zoneForId(this.MainPlayer.playerId)];
                if (zoneData.turretClass[this.selectedTower] instanceof TurretFree) {
                    if (this.MainPlayer.money - this.turretExemple[1].price >= 0) {
                        let dataTurret = zoneData.turretClass[this.selectedTower];
                        zoneData.turretClass[this.selectedTower] = new Turret2 ({x: dataTurret.x, y:dataTurret.y, z:dataTurret.z});
                        this.MainPlayer.money -= this.turretExemple[1].price;
                        let tmpobj = this.scene.getObjectByProperty("uuid",dataTurret.uuid );
                        this.scene.remove(tmpobj);
                        this.objects = this.objects.filter(item => item !== dataTurret) // remove o elemento
                        this.add(zoneData.turretClass[this.selectedTower]);
                        
                        this.zone[this.zoneForId(this.MainPlayer.playerId)].turret[this.selectedTower] = 2;
                        this.sendUpdateZoneData();
                    }
                }
                else {
                    let dataTurret = zoneData.turretClass[this.selectedTower];
                    zoneData.turretClass[this.selectedTower] = new TurretFree ({x: dataTurret.x, y:dataTurret.y, z:dataTurret.z});
                    this.MainPlayer.money += dataTurret.price;
                    let tmpobj = this.scene.getObjectByProperty("uuid",dataTurret.uuid );
                    this.scene.remove(tmpobj);
                    this.objects = this.objects.filter(item => item !== dataTurret) // remove o elemento
                    this.add(zoneData.turretClass[this.selectedTower]);
                    this.zone[this.zoneForId(this.MainPlayer.playerId)].turret[this.selectedTower] = 0;
                    this.zone[this.zoneForId(this.MainPlayer.playerId)].turretUpgrades[this.selectedTower] = 0;
                    this.sendUpdateZoneData();
                }
                document.getElementById("money").innerHTML= this.MainPlayer.money;
            }
        } else  if ( typeof this.MainPlayer.mesh != "undefined")
            this.MainPlayer.keyState[event.keyCode || event.which] = true;
    }

    onKeyUp( event ){
        if ( typeof this.MainPlayer.keyState != "undefined")
        this.MainPlayer.keyState[event.keyCode || event.which] = false;
    }

    onWindowResize(event) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }


    updateZone(zoneData) {
        let zoneIndex = zoneData.index;
        zoneData.turret.map ( (v, i) => {
            if (typeof this.zone[zoneIndex] != "undefined") { 
                if (v != this.zone[zoneIndex].turret[i]) {
                    let zoneDataInner = this.zone[zoneIndex];
                    if (v == 0) { // free turret
                        let dataTurret = zoneDataInner.turretClass[i];
                        zoneDataInner.turretClass[i] = new TurretFree ({x: dataTurret.x, y:dataTurret.y, z:dataTurret.z});
                        let tmpobj = this.scene.getObjectByProperty("uuid",dataTurret.uuid );
                        this.scene.remove(tmpobj);
                        this.objects = this.objects.filter(item => item !== dataTurret) // remove o elemento
                        this.add(zoneDataInner.turretClass[i]);
                        zoneDataInner.turret[this.selectedTower] = 0;
                        zoneDataInner.turretUpgrades[this.selectedTower] = 0;
                    }
                    if (v == 1) { // fire turret
                        let dataTurret = zoneDataInner.turretClass[i];
                        zoneDataInner.turretClass[i] = new Turret1 ({x: dataTurret.x, y:dataTurret.y, z:dataTurret.z});
                        let tmpobj = this.scene.getObjectByProperty("uuid",dataTurret.uuid );
                        this.scene.remove(tmpobj);
                        this.objects = this.objects.filter(item => item !== dataTurret) // remove o elemento
                        this.add(zoneDataInner.turretClass[i]);
                        zoneDataInner.turret[this.selectedTower] = 1;
                        zoneDataInner.turretUpgrades[this.selectedTower] = 1;
                    } 
                    if (v == 2) { // water turret
                        let dataTurret = zoneDataInner.turretClass[i];
                        zoneDataInner.turretClass[i] = new Turret2 ({x: dataTurret.x, y:dataTurret.y, z:dataTurret.z});
                        let tmpobj = this.scene.getObjectByProperty("uuid",dataTurret.uuid );
                        this.scene.remove(tmpobj);
                        this.objects = this.objects.filter(item => item !== dataTurret) // remove o elemento
                        this.add(zoneDataInner.turretClass[i]);
                        zoneDataInner.turret[this.selectedTower] = 2;
                        zoneDataInner.turretUpgrades[this.selectedTower] = 2;
                    }
                }
            }
        });
        zoneData.turretUpgrades.map ( (v, i) => {
            if (typeof this.zone[zoneIndex] != "undefined")        
            if (v > this.zone[zoneIndex].turretUpgrades[i]) 
                this.zone[zoneIndex].turretClass[i].levelUp();
        });
        if (typeof this.zone[zoneIndex] != "undefined") 
        this.zone[zoneIndex].updateZone(zoneData);
    }

    sendUpdateZoneData () {
        let zoneData = this.zone[this.zoneForId(this.MainPlayer.playerId)];
        let data ={} ;
        data.playerId = this.MainPlayer.playerId;
        data.wave = zoneData.wave;
        data.turret = zoneData.turret;
        data.turretUpgrades = zoneData.turretUpgrades;
        socket.emit('updateZone', data);
    }

    associateZone(zone) {
        this.zone[zone.index].updateZone(zone);
        if (this.zone[zone.index].playerId == "" && zone.playerId != "") {
            this.zone[zone.index].startTimer();
        }
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
        let bothReady = 0;
        this.zone.map((i) => {
            if (typeof i.playerId != "undefined" ) 
                bothReady++;
            if ((player.x < 0 && i.inv == 1) || (player.x > 0 && i.inv == -1))
            if (typeof i.playerId === "undefined" && this.zoneForId(player.playerId) == -1) {
                i.associatePlayer(player.playerId);
                bothReady++;
            }
         });
        if (bothReady == 2)
        this.zone.map((i) => {
            i.startTimer();
        } );
    }

    startGame(){
        if (this.gameStatus == 0) {
            let bothReady = 0;

            this.zone.map((i) => {
                if (typeof i.playerId != "undefined" ) 
                    bothReady++;
            });
            if (bothReady == 2) {
                this.gameStatus = 1;
                this.zone.map((i) => {
                    i.startTimer();
                } );
            }
        }
    }

    playerForId (id){
        var index = -1;
        for (var i = 0; i < this.players.length; i++){
            if (this.players[i].playerId == id){
                index = i;
                break;
            }
        }
        if (index == -1)
            return 0;
        return this.players[index];
    };

    zoneForId (id){
        var index = -1;
        if (typeof this.zone != 'undefined')
        for (var i = 0; i < this.zone.length; i++)
            if (this.zone[i].playerId == id || (typeof this.zone[i].playerId === "undefined" && id == "")){
                index = i;
                break;
            }
        
        return index;
    };
}


