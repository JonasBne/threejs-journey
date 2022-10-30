import './style.css'
import * as THREE from 'three';
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls";

// canvas
const canvas = document.getElementsByClassName('webgl')[0] as HTMLCanvasElement;

// cursor movement controls
const cursor = {
    x: 0,
    y: 0,
}

window.addEventListener('mousemove', (ev) => {
    cursor.x = ev.clientX / window.innerWidth - 0.5;
    cursor.y = -(ev.clientY / window.innerHeight - 0.5);
})

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

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3;
// move the camera, otherwise everything is centered in the middle of the scene and nothing will be visible
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
// add a smoothing factor
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);

// animations
const animate = () => {
    // must be added if damping is required
    controls.update();

    // render the scene
    renderer.render(scene, camera);

    // pass reference to the function that calls window.requestAnimationFrame
    window.requestAnimationFrame(animate)
}

animate();




