export default class Projectil extends THREE.Object3D {
    constructor(towerObj, typeProj, mobPosition) {
        //typePorj
        //1 fire
        //2 water
        super();
        this.attackDamadge = towerObj.attackDamadge;
        this.x = towerObj.mesh.position.x;
        this.y = towerObj.mesh.position.y;
        if (typeProj == 1)
            this.y += towerObj.mesh.children[6].position.y;
        else
            this.y += 3;
        this.z = towerObj.mesh.position.z;
        this.mobPosition = mobPosition;
        this.spline = new THREE.CatmullRomCurve3([
            new THREE.Vector3(this.x, this.y, this.z),
            new THREE.Vector3(this.mobPosition.x, this.mobPosition.y+1.5, this.mobPosition.z) ], false, "centripetal", 0);
        this.pt = 0;
        this.tangent = 0;
        this.radians = 0;
        this.t = 0;
        this.createProjectil(typeProj);
    }

    createProjectil (typeProj) {
        let texture;
        if (typeProj == 1)
            texture = new THREE.TextureLoader().load("images/lava.jpg");
        else
            texture = new THREE.TextureLoader().load("images/water.png");


        let group = new THREE.Group();
        let geometry = new THREE.SphereGeometry( 0.2, 6, 6 );
        let material = new THREE.MeshPhongMaterial( { map: texture } );
        group.add(new THREE.Mesh( geometry, material ));
        group.position.x = this.x;
        group.position.y = this.y;
        group.position.z = this.z;
        group.castShadow = true;
        this.mesh = group;

        
    }

    update(){
        this.pt = this.spline.getPoint(this.t);
        this.mesh.position.set( this.pt.x, this.pt.y, this.pt.z );
        
        let axis = new THREE.Vector3( );
        // get the tangent to the curve
        this.tangent = this.spline.getTangent( this.t ).normalize();

        // calculate the axis to rotate around
        axis.crossVectors( this.up, this.tangent ).normalize();
        
        // calcluate the angle between the up vector and the tangent
        this.radians = Math.acos( this.up.dot( this.tangent ) );
    
        // set the quaternion
        this.mesh.quaternion.setFromAxisAngle( axis, this.radians);
        this.t += 0.085;
    }


    getMesh (){
        return this.mesh;
    }
    
}