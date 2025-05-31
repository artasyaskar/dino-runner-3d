import * as THREE from 'three';
import { GameManager } from './src/components/GameManager.js';  // Note .js extension needed for ES modules

// Loading manager to track asset loading progress
const loadingManager = new THREE.LoadingManager();
const loadingElement = document.querySelector('#loading');

loadingManager.onStart = () => {
  loadingElement.style.display = 'block';
};

loadingManager.onLoad = () => {
  loadingElement.style.display = 'none';
};

loadingManager.onError = (url) => {
  console.error('Error loading:', url);
  loadingElement.textContent = 'Error loading game assets. Please refresh.';
};

// Select the canvas element for rendering
const canvas = document.querySelector('#gameCanvas');

// Create WebGL renderer with antialias enabled for smoother edges
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
});

// Set initial size and pixel ratio for crisp graphics on all screens
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Instantiate and initialize the game manager with loading manager
const gameManager = new GameManager(renderer, loadingManager);

try {
  gameManager.init();
  gameManager.start();
} catch (error) {
  console.error('Failed to initialize game:', error);
  loadingElement.textContent = 'Failed to start game. Please refresh.';
  loadingElement.style.display = 'block';
}

// Handle window resizing for responsive canvas and camera
window.addEventListener('resize', () => {
  const { innerWidth, innerHeight } = window;
  renderer.setSize(innerWidth, innerHeight);
  gameManager.onWindowResize(innerWidth, innerHeight);
});
