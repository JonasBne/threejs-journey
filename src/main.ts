import './style.css'
import * as THREE from 'three';
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";

// canvas
const canvas = document.getElementsByClassName('webgl')[0] as HTMLCanvasElement;

const scene = new THREE.Scene();

// fonts
const fontLoader = new FontLoader();
fontLoader.load('src/assets/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry('Hello World', {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4,
    });

    textGeometry.center()

    const material = new THREE.MeshNormalMaterial();

    const text = new THREE.Mesh(
        textGeometry,
        material,
    )
    scene.add(text);
})

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
camera.position.z = 5;
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

// create random objects
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

for (let i=0; i<100; i++) {
    let donut = new THREE.Mesh(donutGeometry, new THREE.MeshNormalMaterial());

    const scale = Math.random();
    donut.scale.set(scale, scale, scale);

    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10

    donut.rotation.x = Math.random();
    donut.rotation.y = Math.random()

    scene.add(donut)
}

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




