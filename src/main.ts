import './style.css'
import * as THREE from 'three';

/*
4 prerequisites to render a scene in the browser:
- a Mesh, consists out of:
    - a geometry
    - a material
- a Camera
- a Scene
- a Renderer
*/

const scene = new THREE.Scene();

// const axesHelper = new THREE.AxesHelper( 2 );
// scene.add(axesHelper);

const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0xff0000})
);
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0xff0ff0})
)
cube2.position.x = -2;

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0xfff00})
)
cube3.position.x = -1;
cube3.position.y = 1.25;

group.add(cube1, cube2, cube3);

group.position.z = -1;

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: '#ff0000'});
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

/*
Positioning
-  via position.x,y,z
    mesh.position.x = 1;
    mesh.position.y = 1;
    mesh.position.z = 1;
- via position.set(x, y, z)
*/

// mesh.position.set(0, 0, 0);

/*
Scaling
-  via scale.x,y,z
    mesh.scale.x = 1;
    mesh.scale.y = 1;
    mesh.scale.z = 1;
- via scale.set(x, y, z)
*/

/*
Rotations w/ Euler
- not a Vector3 but an Euler
- be aware of gimbal lock (https://www.youtube.com/watch?v=zc8b2Jo7mno)
- default rotation order is x, y, z
- alternative is mesh.rotation.reorder('YXZ') or another formation
*/

// mesh.rotation.reorder('YXZ');
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;
// mesh.rotation.z = Math.PI * 0.25;

const sizes = {
    width: 800,
    height: 600,
}
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1000);
// move the camera, otherwise everything is centered in the middle of the scene and nothing will be visible
camera.position.set(-1, 0.5 , 5);
// make the camera face the target you provided
// camera.lookAt(mesh.position);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementsByClassName('webgl')[0]
});

// render the scene
// code beyond this line has no more effect (because the 'picture is already taken')
renderer.render(scene, camera);




