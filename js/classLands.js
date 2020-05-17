

class Land extends THREE.Object3D {
    constructor() {
        super();
    }
}

class Route extends Land {
    constructor(position) {
        super();
        this.createRoude(position);
    }

    createRoude(position) {
        let geometry =new THREE.BoxGeometry( 15, 0.01, 200 );
        //let geometry =new THREE.BoxGeometry( 1, 0.01, 1 );
        let texture = new THREE.TextureLoader().load("images/rode1.jpg");
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set( 0, 0 );
        texture.repeat.set( 8, 100 );
        var material = new THREE.MeshPhongMaterial( {map: texture} );
        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.receiveShadow=true;
    }
    
    getMesh() {
        return this.mesh;
    }           

    update(){
        //let rad = this.mesh.children[2].rotation.y + 1;
           //w this.mesh.children[2].rotation.y += -0.01; 

    }
}


class Labyrinth extends Land {
    constructor(position, inversion) {
        super();
        this.createLabyrinth(position.x, position.y, position.z, inversion);
    }

    createLabyrinth(x, y, z, inv) {

        var group = new THREE.Group();
        group.add(this.fbPath0(-15*inv, -0.5, 0));
        group.add(this.fbPath1(-31.5*inv, -0.5, 40*inv));
        group.add(this.fbPath2(-36.5*inv, -0.5, 12*inv));
        group.add(this.fbPath3(-28*inv, -0.5, 0));
        group.add(this.fbPath2(-19.5*inv, -0.5, -14*inv));
        group.add(this.fbPath4(-28*inv, -0.5, -46*inv));
        group.add(this.fbPath2(-40.5*inv, -0.5, -26*inv));
        group.add(this.fbPath5(-52*inv, -0.5, -1*inv));
        group.add(this.lrPath0(-20.5*inv, -0.5, 20*inv));
        group.add(this.lrPath1(-42.5*inv, -0.5, 24*inv));
        group.add(this.lrPath2(-30.5*inv, -0.5, 8*inv));
        group.add(this.lrPath3(-25.5*inv, -0.5, -9*inv));
        group.add(this.lrPath1(-17.5*inv, -0.5, -30*inv));
        group.add(this.lrPath4(-38.5*inv, -0.5, -36*inv));
        group.add(this.lrPath5(-46.5*inv, -0.5, -13.5*inv));
        group.position.set(x, y, z, inv);
        this.mesh = group;
    }

    fbPath0(x, y, z) {

        var pathGeometry = new THREE.CubeGeometry(15, 0.01, 4);
        var pathTexture = new THREE.TextureLoader().load("images/rode1.jpg");
        pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
        pathTexture.offset.set( 0, 0 );
        pathTexture.repeat.set( 7.5, 2 );
        var pathMaterial = new THREE.MeshPhongMaterial( { map: pathTexture, side: THREE.DoubleSide });
        var pathCube = new THREE.Mesh( pathGeometry, pathMaterial );
        pathCube.position.set(x, y, z);
        return pathCube;
    }

    fbPath1(x, y, z) {

        var pathGeometry = new THREE.CubeGeometry(26, 0.01, 4);
        var pathTexture = new THREE.TextureLoader().load("images/rode1.jpg");
        pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
        pathTexture.offset.set( 0, 0 );
        pathTexture.repeat.set( 13, 2 );
        var pathMaterial = new THREE.MeshPhongMaterial( { map: pathTexture, side: THREE.DoubleSide });
        var pathCube = new THREE.Mesh( pathGeometry, pathMaterial );
        pathCube.position.set(x, y, z);
        return pathCube;
    }

    fbPath2(x, y, z) {

        var pathGeometry = new THREE.CubeGeometry(8, 0.01, 4);
        var pathTexture = new THREE.TextureLoader().load("images/rode1.jpg");
        pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
        pathTexture.offset.set( 0, 0 );
        pathTexture.repeat.set( 6, 2 );
        var pathMaterial = new THREE.MeshPhongMaterial( { map: pathTexture, side: THREE.DoubleSide });
        var pathCube = new THREE.Mesh( pathGeometry, pathMaterial );
        pathCube.position.set(x, y, z);
        return pathCube;
    }

    fbPath3(x, y, z) {

        var pathGeometry = new THREE.CubeGeometry(9, 0.01, 4);
        var pathTexture = new THREE.TextureLoader().load("images/rode1.jpg");
        pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
        pathTexture.offset.set( 0, 0 );
        pathTexture.repeat.set( 4.5, 2 );
        var pathMaterial = new THREE.MeshPhongMaterial( { map: pathTexture, side: THREE.DoubleSide });
        var pathCube = new THREE.Mesh( pathGeometry, pathMaterial );
        pathCube.position.set(x, y, z);
        return pathCube;
    }

    fbPath4(x, y, z) {

        var pathGeometry = new THREE.CubeGeometry(25, 0.01, 4);
        var pathTexture = new THREE.TextureLoader().load("images/rode1.jpg");
        pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
        pathTexture.offset.set( 0, 0 );
        pathTexture.repeat.set( 10, 2 );
        var pathMaterial = new THREE.MeshPhongMaterial( { map: pathTexture, side: THREE.DoubleSide });
        var pathCube = new THREE.Mesh( pathGeometry, pathMaterial );
        pathCube.position.set(x, y, z);
        return pathCube;
    }

    fbPath5(x, y, z) {

        var pathGeometry = new THREE.CubeGeometry(7, 0.01, 4);
        var pathTexture = new THREE.TextureLoader().load("images/rode1.jpg");
        pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
        pathTexture.offset.set( 0, 0 );
        pathTexture.repeat.set( 5, 2 );
        var pathMaterial = new THREE.MeshPhongMaterial( { map: pathTexture, side: THREE.DoubleSide });
        var pathCube = new THREE.Mesh( pathGeometry, pathMaterial );
        pathCube.position.set(x, y, z);
        return pathCube;
    }

    lrPath0(x, y, z) {

        var pathGeometry = new THREE.CubeGeometry(4, 0.01, 36);
        var pathTexture = new THREE.TextureLoader().load("images/rode1.jpg");
        pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
        pathTexture.offset.set( 0, 0);
        pathTexture.repeat.set( 2, 12);
        var pathMaterial = new THREE.MeshPhongMaterial( { map: pathTexture, side: THREE.DoubleSide });
        var pathCube = new THREE.Mesh( pathGeometry, pathMaterial );
        pathCube.position.set(x, y, z);
        return pathCube;
    }

    lrPath1(x, y, z) {

        var pathGeometry = new THREE.CubeGeometry(4, 0.01, 28);
        var pathTexture = new THREE.TextureLoader().load("images/rode1.jpg");
        pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
        pathTexture.offset.set( 0, 0);
        pathTexture.repeat.set( 2, 14);
        var pathMaterial = new THREE.MeshPhongMaterial( { map: pathTexture, side: THREE.DoubleSide });
        var pathCube = new THREE.Mesh( pathGeometry, pathMaterial );
        pathCube.position.set(x, y, z);
        return pathCube;
    }

    lrPath2(x, y, z) {

        var pathGeometry = new THREE.CubeGeometry(4, 0.01, 12);
        var pathTexture = new THREE.TextureLoader().load("images/rode1.jpg");
        pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
        pathTexture.offset.set( 0, 0);
        pathTexture.repeat.set( 2, 6);
        var pathMaterial = new THREE.MeshPhongMaterial( { map: pathTexture, side: THREE.DoubleSide });
        var pathCube = new THREE.Mesh( pathGeometry, pathMaterial );
        pathCube.position.set(x, y, z);
        return pathCube;
    }

    lrPath3(x, y, z) {

        var pathGeometry = new THREE.CubeGeometry(4, 0.01, 14);
        var pathTexture = new THREE.TextureLoader().load("images/rode1.jpg");
        pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
        pathTexture.offset.set( 0, 0);
        pathTexture.repeat.set( 2.5, 9);
        var pathMaterial = new THREE.MeshPhongMaterial( { map: pathTexture, side: THREE.DoubleSide });
        var pathCube = new THREE.Mesh( pathGeometry, pathMaterial );
        pathCube.position.set(x, y, z);
        return pathCube;
    }

    lrPath4(x, y, z) {

        var pathGeometry = new THREE.CubeGeometry(4, 0.01, 16);
        var pathTexture = new THREE.TextureLoader().load("images/rode1.jpg");
        pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
        pathTexture.offset.set( 0, 0);
        pathTexture.repeat.set( 2, 12);
        var pathMaterial = new THREE.MeshPhongMaterial( { map: pathTexture, side: THREE.DoubleSide });
        var pathCube = new THREE.Mesh( pathGeometry, pathMaterial );
        pathCube.position.set(x, y, z);
        return pathCube;
    }

    lrPath5(x, y, z) {

        var pathGeometry = new THREE.CubeGeometry(4, 0.01, 29);
        var pathTexture = new THREE.TextureLoader().load("images/rode1.jpg");
        pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
        pathTexture.offset.set( 0, 0);
        pathTexture.repeat.set( 2, 12);
        var pathMaterial = new THREE.MeshPhongMaterial( { map: pathTexture, side: THREE.DoubleSide });
        var pathCube = new THREE.Mesh( pathGeometry, pathMaterial );
        pathCube.position.set(x, y, z);
        return pathCube;
    }

    getMesh() {
        return this.mesh;
    }
}


export { Labyrinth, Land , Route };