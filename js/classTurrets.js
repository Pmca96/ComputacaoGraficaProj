import {Fire}  from './libs/fire.js';
import { DoubleSide } from './three/three.module.js';
import { ParametricGeometries } from './three/geometries/ParametricGeometries.js';
//Class para saber se os objetos são torre
class Turret extends THREE.Object3D {
    constructor() {
        super();
    }
}

 class TurretFree extends Turret {
    constructor(position) {
        super();
        this.createSpace(position);
    }

    createSpace(position){
        var group = new THREE.Group();
        group.add(this.createCircle1(0, 0, 0));
        group.add(this.createCircle2(0, -0.01, 0));
        group.add(this.createHammer1(-0.2, 1, -0.5));
        group.add(this.createHammer2(0, 0.6, 0));

        group.position.set(position.x, position.y, position.z);

        this.mesh = group;
        this.mesh.receiveShadow = true;
    }

    createCircle1(x,y,z) {
        let geometry = new THREE.CylinderGeometry(2,2, 0.001, 20 );
        let material = new THREE.MeshPhongMaterial( { color: 0x876f41 } );
        let circle = new THREE.Mesh( geometry, material );
        circle.position.set(x, y, z);
        circle.receiveShadow=true;
        return circle;
    }
    
    createCircle2(x,y,z) {
        let geometry = new THREE.CylinderGeometry(2.2,2.2, 0.001, 20 );
        let texture = new THREE.TextureLoader().load("images/grass.png");
        let material = new THREE.MeshPhongMaterial( { map: texture } );
        let circle = new THREE.Mesh( geometry, material );
        circle.position.set(x, y, z);
        circle.receiveShadow=true;
        return circle;
    }

    createHammer1(x,y,z) {
        var length = 12, width = 8;
        var shape = new THREE.Shape();
        shape.moveTo( 0,0 );
        shape.lineTo( 0, width );
        shape.lineTo( length, width );
        shape.lineTo( length, 0 );
        shape.lineTo( 0, 0 );
        var extrudeSettings = {
            steps: 10,
            depth: 16,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 3
        };
        let texture = new THREE.TextureLoader().load("images/stone.jpg");
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set( 0, 0 );
        texture.repeat.set( 0.1, 0.1 );
        var geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
        var material = new THREE.MeshPhongMaterial( { map: texture } );
        var mesh = new THREE.Mesh( geometry, material ) ;
        mesh.scale.set(0.04,0.05,0.06);
        mesh.position.set(x, y, z);
        mesh.receiveShadow=true;
        mesh.castShadow=true;
        return mesh;
    } 
    createHammer2(x,y,z) {
        var geometry = new THREE.CylinderGeometry( 0.13, 0.13, 0.7, 6 );
        //var geometry = new THREE.BoxGeometry( 0.2, 0.5, 0.2 );
        let texture = new THREE.TextureLoader().load("images/wood2.png");
        var material = new THREE.MeshPhongMaterial( {map: texture} );
        var cube = new THREE.Mesh( geometry, material );
       
        cube.position.set(x, y, z);
        cube.receiveShadow=true;
        cube.castShadow=true;

        return cube;
    }

    getMesh() {
        return this.mesh;
    }

    update(){
        //let rad = this.mesh.children[2].rotation.y + 1;
           //w this.mesh.children[2].rotation.y += -0.01; 
    }
}


class Turret1 extends Turret {
    constructor(position) {
        super();
        this.lvl = 1;
        this.attackDamadge = 10;
        this.attackAOEDamadge = 0.5;
        this.attackRange = 10;
        this.attackSpeed = 1;
        this.projectilSpeed = 2;
        this.y = position.y;

        this.inv = 0.01;
        this.createTower(position);
    }

    createTower(position){
        var group = new THREE.Group();
        group.add(this.createCircle1(0, 0, 0));
        group.add(this.createCircle2(0, 0.001, 0));
        group.add(this.createCyli1(0, 0.2, 0));
        group.add(this.createCyli2(0, 0.7, 0));
        group.add(this.createRing(0, 1.3, 0));
        group.add(this.createRing(0, 2, 0));
        group.add(this.createSphere(0, 3.7, 0));
        group.add(this.createFire(0,5, 0));

        group.position.set(position.x, position.y, position.z);
        group.receiveShadow = true;    
        group.castShadow = true;
        this.mesh = group;
        this.mesh.receiveShadow = true;
    }

    //Erva
    createCircle1(x,y,z) { 
        let geometry = new THREE.CylinderGeometry(2.2,2.2, 0.001, 20 );
        let texture = new THREE.TextureLoader().load("images/grass.png");
        let material = new THREE.MeshPhongMaterial( { map: texture } );
        let circle = new THREE.Mesh( geometry, material );
        circle.position.set(x, y, z);
        circle.receiveShadow=true;
        return circle;
    }

    //Base
    createCircle2(x,y,z) {
        let geometry = new THREE.CylinderGeometry(2,2, 0.001, 20 );
        let texture = new THREE.TextureLoader().load("images/wood1.jpg");
        let material = new THREE.MeshPhongMaterial( { map: texture } );
        let circle = new THREE.Mesh( geometry, material );
        circle.position.set(x, y, z);
        circle.receiveShadow=true;
        return circle;
    }
    
    //BaseTower
    createCyli1(x,y,z) {
        let geometry = new THREE.CylinderGeometry(1.75,1.75, 0.5, 20 );
        let texture = new THREE.TextureLoader().load("images/wood1.jpg");
        let material = new THREE.MeshPhongMaterial( { map: texture } );
        let circle = new THREE.Mesh( geometry, material );
        circle.position.set(x, y, z);
        circle.receiveShadow=true;
        return circle;
    }

    //Tower
    createCyli2(x,y,z) {
        let geometry = new THREE.CylinderGeometry(1,1, 3.5, 20  );
        
        let texture = new THREE.TextureLoader().load("images/charcoal1.jpg");
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set( 0, 0);
        texture.repeat.set( 2,4);
        let material = new THREE.MeshPhongMaterial( { map: texture } );
        let circle = new THREE.Mesh( geometry, material );
        circle.position.set(x, y, z);
        circle.receiveShadow=true;
        return circle;
    }

    //TowerRing
    createRing(x,y,z) {
        let geometry = new THREE.TorusGeometry( 2 , 0.2, 6, 20 );
        let texture = new THREE.TextureLoader().load("images/lava.jpg");
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set( 0, 0);
        texture.repeat.set( 1, 1);
        let material = new THREE.MeshPhongMaterial( { map: texture } );
        let torus = new THREE.Mesh( geometry, material );
        
        torus.position.set(x, y, z);
        torus.rotation.x = Math.PI/2;
        torus.rotation.z = Math.PI/2;
        return torus;
    }

    //Sphere
    createSphere(x,y,z) {
        let geometry = new THREE.DodecahedronGeometry( 0.5 , 0);

        let texture = new THREE.TextureLoader().load("images/lava.jpg");
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set( 0, 0);
        texture.repeat.set( 1, 1);

        let material = new THREE.MeshPhongMaterial( { map: texture } );
        let dode = new THREE.Mesh( geometry, material );
        
        dode.position.set(x, y, z);
        return dode;
    }

    createFire(x,y,z) {
        var plane = new THREE.PlaneBufferGeometry( 4, 4 );

        let fire = new Fire( plane, {
            textureWidth: 512,
            textureHeight: 512,
            debug: true
        } );
        fire.color1 = 0xffdcaa;
        fire.color2 = 0xffa000;
        fire.color3 = 0x000000;
        fire.windX = 0.0;
        fire.windY = 2.75;
        fire.colorBias = 0.9;
        fire.burnRate = 1.0;
        fire.diffuse = 1.33;
        fire.viscosity = 0.25;
        fire.expansion = 0.0;
        fire.swirl = 50.0;
        fire.drag = 0.35;
        fire.airSpeed = 10.0;
        fire.speed = 500.0;
        fire.massConservation = false;
        fire.position.set(x,y,z);
        return fire;
    }

    levelUp() {
        if (this.lvl == 1)
         {
             
            this.attackDamadge = 20;
            this.attackRange = 12;
            this.attackSpeed = 1.2;
            let texture = new THREE.TextureLoader().load("images/stone-granite.png");
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set( 0, 0);
            texture.repeat.set( 2, 2);
            this.mesh.children[1].material = new THREE.MeshStandardMaterial({map: texture});
            this.mesh.children[2].material = new THREE.MeshStandardMaterial({map: texture});
            this.mesh.updateMatrix();
         }
    }

    getMesh() {
        return this.mesh;
    }

    update(){
        //let rad = this.mesh.children[2].rotation.y + 1;
        this.mesh.children[6].rotation.z += -0.01; 
        this.mesh.children[6].rotation.x += -0.01; 
        if (this.mesh.children[6] === undefined) 
            return ;
        if(this.mesh.children[6].position.y > this.position.y+4.2)
            this.inv = -0.007;
        else if (this.mesh.children[6].position.y < this.position.y+3.3)
            this.inv = 0.007;    
        this.mesh.children[6].position.y += this.inv; 
        this.mesh.children[5].position.y += this.inv; 
        this.mesh.children[4].position.y += this.inv; 
        
        this.mesh.children[4].rotation.z += -0.05; 
        this.mesh.children[5].rotation.z += -0.05; 
    }
}

class Turret2 extends Turret {
    constructor(position) {
        super();
        this.lvl = 1;
        this.attackDamadge = 5;
        this.attackAOEDamadge = 0;
        this.attackRange = 12;
        this.attackSpeed = 2;
        this.projectilSpeed = 3;
        this.y = position.y;

        this.inv = 0.01;
        this.createTower(position);
    }

    createTower(position){
        var group = new THREE.Group();
        group.add(this.createCircle1(0, 0, 0));
        group.add(this.createCircle2(0, 0.001, 0));
        group.add(this.createCyli1(0, 0.2, 0));
        group.add(this.createCyli2(0, 0.7, 0));
        group.add(this.createLath(0, 1.2, 0));
        group.add(this.createWater(0, 1.75, 0));
        group.add(this.createCannon(0, 2.65, 0));
        group.position.set(position.x, position.y, position.z);
        group.receiveShadow = true;    
        group.castShadow = true;
        this.mesh = group;
        this.mesh.receiveShadow = true;
    }

    //Erva
    createCircle1(x,y,z) { 
        let geometry = new THREE.CylinderGeometry(2.2,2.2, 0.001, 20 );
        let texture = new THREE.TextureLoader().load("images/grass.png");
        let material = new THREE.MeshPhongMaterial( { map: texture } );
        let circle = new THREE.Mesh( geometry, material );
        circle.position.set(x, y, z);
        circle.receiveShadow=true;
        return circle;
    }

    //Base
    createCircle2(x,y,z) {
        let geometry = new THREE.CylinderGeometry(2,2, 0.001, 20 );
        let texture = new THREE.TextureLoader().load("images/wood1.jpg");
        let material = new THREE.MeshPhongMaterial( { map: texture } );
        let circle = new THREE.Mesh( geometry, material );
        circle.position.set(x, y, z);
        circle.receiveShadow=true;
        return circle;
    }
    
    //BaseTower
    createCyli1(x,y,z) {
        let geometry = new THREE.CylinderGeometry(1.75,1.75, 0.5, 20 );
        let texture = new THREE.TextureLoader().load("images/wood1.jpg");
        let material = new THREE.MeshPhongMaterial( { map: texture } );
        let circle = new THREE.Mesh( geometry, material );
        circle.position.set(x, y, z);
        circle.receiveShadow=true;
        return circle;
    }

    //Tower
    createCyli2(x,y,z) {
        let geometry = new THREE.CylinderGeometry(0.75,0.75, 3.5, 20  );
        
        let texture = new THREE.TextureLoader().load("images/sand.jpg");
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set( 0, 0);
        texture.repeat.set( 0.5,1);
        let material = new THREE.MeshPhongMaterial( { map: texture } );
        let circle = new THREE.Mesh( geometry, material );
        circle.position.set(x, y, z);
        circle.receiveShadow=true;
        return circle;
    }

    createLath(x,y,z) {
        var points = [];
        for ( var i = 0; i < 10; i ++ ) {
            points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 1 + 0.5, ( i - 5 ) * 0.2 ) );
        }
        
        let texture = new THREE.TextureLoader().load("images/blue.jpg");
        var geometry = new THREE.LatheGeometry( points, 30);
        var material = new THREE.MeshPhongMaterial(  { map: texture , side :DoubleSide} );
        var lathe = new THREE.Mesh( geometry, material );
        lathe.position.set(x, y, z);
        return lathe;
    }

    createWater(x,y,z) {
        var geometry = new THREE.RingGeometry( 0.1, 1.48, 30 );

        let texture = new THREE.TextureLoader().load("images/water.jpg");
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set( 0, 0);
        texture.repeat.set( 5, 5);
        var material = new THREE.MeshPhongMaterial(  { map: texture , side :DoubleSide} );
        var mesh  = new THREE.Mesh( geometry, material );
        mesh.position.set(x, y, z);
        mesh.rotation.x = Math.PI/2;
        return mesh ;
    }

    createCannon(x,y,z){
        var geometry = new THREE.ParametricGeometry( ParametricGeometries.klein, 25, 25 );
        let texture = new THREE.TextureLoader().load("images/blue.jpg");
        var material = new THREE.MeshPhongMaterial( { map:texture } );
        var klein = new THREE.Mesh( geometry, material );
        klein.scale.set(0.1,0.1,0.1);
        klein.position.set(x,y,z);
        klein.rotation.z= -Math.PI/2;
        return klein;
    }



    levelUp() {
        if (this.lvl == 1)
         {
            let texture = new THREE.TextureLoader().load("images/stone-granite.png");
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set( 0, 0);
            texture.repeat.set( 2, 2);
            this.mesh.children[1].material = new THREE.MeshStandardMaterial({map: texture});
            this.mesh.children[2].material = new THREE.MeshStandardMaterial({map: texture});
            this.mesh.updateMatrix();
            this.attackDamadge = 10;
            this.attackRange = 16;
            this.attackSpeed = 3;
            this.projectilSpeed = 3.5;
         }
    }

    getMesh() {
        return this.mesh;
    }

    update(){
        
        //this.mesh.children[5].rotation.x += -0.01; 
        
    }
}

export { Turret, TurretFree, Turret1, Turret2 };