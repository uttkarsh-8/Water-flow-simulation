import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  createScene,
  createCamera,
  createRenderer,
  addLights,
} from './sceneSetup.js';
import { createPipe, createPipeContainer } from './pipe.js';
import createParticleSystem from './particles.js';
import { simulationSettings, updateParticles, getClock } from './simulation.js';
import { setupGUI } from './controls.js';

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

addLights(scene);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const pipeGroup = createPipe();
const particleSystem = createParticleSystem(1000);
const pipeContainer = createPipeContainer(pipeGroup, particleSystem);
scene.add(pipeContainer);

const clock = getClock();

const resetParticles = () => {
  simulationSettings.reset(particleSystem);
};

setupGUI({ simulationSettings, resetParticles });

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  const elapsed = clock.getElapsedTime();
  pipeContainer.rotation.z =
    simulationSettings.oscAmplitude *
    Math.sin(simulationSettings.oscFrequency * elapsed);
  const baseGravity = new THREE.Vector3(0, -0.0005, 0);
  const effectiveGravity = baseGravity
    .clone()
    .applyAxisAngle(new THREE.Vector3(0, 0, 1), -pipeContainer.rotation.z);
  updateParticles(particleSystem, effectiveGravity, pipeContainer);
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
