import './style.css'
import * as THREE from 'three';
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as debugUI from 'lil-gui';
import gsap from 'gsap';

const debugTweaks = {
    color: '#AA00FF',
    spin: () => gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI })
}

// debug ui
const gui = new debugUI.GUI();

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

const geometry = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3);
const material = new THREE.MeshBasicMaterial({ color: debugTweaks.color, wireframe: true});
const mesh = new THREE.Mesh(geometry, material);

gui.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('horizontal');
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('vertical');
gui.add(mesh.position, 'z').min(-3).max(3).step(0.01).name('depth');
gui.add(mesh, 'visible');
gui.add(material, 'wireframe');
gui.addColor( debugTweaks, 'color' );
gui.onChange((event) => {
    material.color.set(event.value)
})
gui.add(debugTweaks, 'spin')

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




