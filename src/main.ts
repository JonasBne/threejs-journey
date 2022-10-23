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

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: '#ff0000'});
const mesh = new THREE.Mesh(geometry, material);

const sizes = {
    width: 800,
    height: 600,
}
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1000);

// move the camera, otherwise everything is centered in the middle of the scene and nothing will be visible
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementsByClassName('webgl')[0]
});

// add all elements to the scene
scene.add(mesh, camera);

renderer.render(scene, camera);




