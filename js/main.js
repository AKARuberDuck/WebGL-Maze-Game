import { createParticleSplash, updateParticles } from './particles.js';
let prevY = 0;

import * as THREE from 'three';
import { setupPhysics } from './physics.js';
import { setupControls, keys } from './controls.js';
import { generateMaze } from './maze.js';
import { buildMazeFromGrid } from './loader.js';
import { GameState, setState, currentState } from './state.js';
import { resetHUD, updateHUD, addScore, loseLife } from './hud.js';

let scene, camera, renderer, world, ball, ballBody;
let maze;
let mazeWidth = 15;
let mazeHeight = 15;

init();
animate();

function init() {
  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 15, 20);

  // Lighting
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 20, 10);
  scene.add(light);

  // Setup physics
  ({ world, ballBody } = setupPhysics());

  // Maze
  maze = generateMaze(mazeWidth, mazeHeight);
  buildMazeFromGrid(scene, world, maze);

  // Ball
  const ballGeo = new THREE.SphereGeometry(1, 32, 32);
  const ballMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  ball = new THREE.Mesh(ballGeo, ballMat);
  scene.add(ball);

  ballBody.position.set(2, 3, 2);
  world.addBody(ballBody);

  // Controls
  setupControls();

  // UI Events
  document.getElementById('startBtn').onclick = () => {
    resetHUD();
    setState(GameState.PLAYING);
  };

  document.getElementById('retryBtn').onclick = () => location.reload();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function animate() {
  requestAnimationFrame(animate);

  if (currentState === GameState.PLAYING) {
    updateHUD();

    const force = 50;
    if (keys.ArrowUp) ballBody.applyForce({ x: 0, y: 0, z: -force }, ballBody.position);
    if (keys.ArrowDown) ballBody.applyForce({ x: 0, y: 0, z: force }, ballBody.position);
    if (keys.ArrowLeft) ballBody.applyForce({ x: -force, y: 0, z: 0 }, ballBody.position);
    if (keys.ArrowRight) ballBody.applyForce({ x: force, y: 0, z: 0 }, ballBody.position);
    if (keys.Space && Math.abs(ballBody.velocity.y) < 0.1) {
      ballBody.velocity.y = 10;
    }

    world.step(1 / 60);

    ball.position.copy(ballBody.position);
    ball.quaternion.copy(ballBody.quaternion);

    camera.lookAt(ball.position);
    camera.position.set(ball.position.x, ball.position.y + 10, ball.position.z + 15);

    // Check win condition
    if (ball.position.z > mazeHeight * 2 - 2) {
      addScore(100);
      setState(GameState.GAMEOVER);
    }

    // Fall detection
    if (ball.position.y < -10) {
      const dead = loseLife();
      if (dead) {
        setState(GameState.GAMEOVER);
      } else {
        ballBody.position.set(2, 5, 2);
        ballBody.velocity.set(0, 0, 0);
      }
    }
  }

  renderer.render(scene, camera);
}
