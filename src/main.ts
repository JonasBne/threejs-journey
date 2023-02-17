import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import Stats from 'stats.js';

// stats
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// debug
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

// enable shadow maps
renderer.shadowMap.enabled = true;

/*
 * lights
 */

/* ambient light */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);

ambientLight.castShadow = true;

scene.add(ambientLight);

/* directional light */
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(2, 2, -1);

gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001);
gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001);

directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -1;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;

const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera,
);
directionalLightCameraHelper.visible = false;

scene.add(directionalLight, directionalLightCameraHelper);

/*
 * objects
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, 'metalness').min(0).max(1).step(0.001);
gui.add(material, 'roughness').min(0).max(1).step(0.001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
// sphere cannot receive shadow because there is nothing else on the scene
sphere.receiveShadow = false;
sphere.castShadow = true;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.75;

plane.receiveShadow = true;

scene.add(sphere, plane);

// animations
const animate = () => {
  // start monitoring
  stats.begin();

  // must be added if damping is required
  controls.update();

  // render the scene
  renderer.render(scene, camera);

  // end monitoring
  stats.end();

  // pass reference to the function that calls window.requestAnimationFrame
  window.requestAnimationFrame(animate);
};

animate();
