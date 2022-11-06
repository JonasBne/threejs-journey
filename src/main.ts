import './style.css'
import * as THREE from 'three';
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls";

// canvas
const canvas = document.getElementsByClassName('webgl')[0] as HTMLCanvasElement;

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

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

window.addEventListener('resize', () => {
    // update sizes of the screen
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // update camera aspect and projection
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // update size of renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    // limit to pixel ratio of 2 to reduce the effort on (mobile) devices
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        return canvas.requestFullscreen();
    }
    return document.exitFullscreen();
})

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
// limit to pixel ratio of 2 to reduce the effort on (mobile) devices
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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




