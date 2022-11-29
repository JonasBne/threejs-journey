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

// objects
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material,
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

// lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// gui.add(ambientLight, 'intensity', 0, 1, 0.001);
// scene.add(ambientLight);
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// gui.add(directionalLight, 'intensity', 0, 1, 0.001);
// gui.add(directionalLight.position, 'x', -2, 2, 0.01);
// gui.add(directionalLight.position, 'y', -2, 2, 0.01);
// gui.add(directionalLight.position, 'z', -2, 2, 0.01);
// scene.add(directionalLight);
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2);
gui.add(pointLight.position, 'x', -2, 2, 0.01);
gui.add(pointLight.position, 'y', -2, 2, 0.01);
gui.add(pointLight.position, 'z', -2, 2, 0.01);
gui.add(pointLight, 'intensity', 0, 1, 0.01);
gui.add(pointLight, 'distance', 0, 4, 0.01);
gui.add(pointLight, 'decay', 0, 5, 0.01);
scene.add(pointLight);

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
