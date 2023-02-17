import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';

const gui = new GUI();

// canvas
const canvas = document.getElementsByClassName('webgl')[0] as HTMLCanvasElement;

const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

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
});

window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    return canvas.requestFullscreen();
  }
  return document.exitFullscreen();
});

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.y = 2;
camera.position.z = 5;
// move the camera, otherwise everything is centered in the middle of the scene and nothing will be visible
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
// add a smoothing factor
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// limit to pixel ratio of 2 to reduce the effort on (mobile) devices
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/*
 * lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(2, 2, -1);
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001);
gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001);
scene.add(directionalLight);

/*
 * objects
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, 'metalness').min(0).max(1).step(0.001);
gui.add(material, 'roughness').min(0).max(1).step(0.001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.75;

scene.add(sphere, plane);

// animations
const animate = () => {
  // must be added if damping is required
  controls.update();

  // render the scene
  renderer.render(scene, camera);

  // pass reference to the function that calls window.requestAnimationFrame
  window.requestAnimationFrame(animate);
};

animate();
