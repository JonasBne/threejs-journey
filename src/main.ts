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
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 4;
// move the camera, otherwise everything is centered in the middle of the scene and nothing will be visible
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementsByClassName('webgl')[0]
});
renderer.setSize(window.innerWidth, window.innerHeight);

const clock = new THREE.Clock();

// animations
const animate = () => {
    // calculate how much time elapsed since the last frame was calculated
    // to animate the object at the same speed, regardless of the framerate of
    // the client device
    camera.position.y = Math.sin(clock.getElapsedTime());
    camera.position.x = Math.cos(clock.getElapsedTime());
    camera.lookAt(mesh.position)

    // render the scene
    renderer.render(scene, camera);

    // pass reference to the function that calls window.requestAnimationFrame
    window.requestAnimationFrame(animate)
}

animate();




