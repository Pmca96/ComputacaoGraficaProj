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
