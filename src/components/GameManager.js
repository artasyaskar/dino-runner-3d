import * as THREE from 'three';
import { createDinosaur } from './DinosaurFactory';
import { createCactusObstacle } from './ObstacleFactory';

export class GameManager {
  constructor(renderer, loadingManager = new THREE.LoadingManager()) {
    this.renderer = renderer;
    this.scene = new THREE.Scene();
    this.camera = null;
    this.clock = new THREE.Clock();
    this.loadingManager = loadingManager;

    // Game entities
    this.dinosaur = null;
    this.obstacles = [];

    // Dino physics
    this.jumpVelocity = 0;
    this.isJumping = false;
    this.gravity = -0.08;

    // Constants
    this.groundLevel = 0;
    this.obstacleSpeed = 0.12;
  }

  init() {
    this._initCamera();
    this._initLighting();
    this._initFog();
    this._initGround();
    this._initSky();
    this._initDinosaur();
    this._initObstacle();
    this._initInput();
  }

  start() {
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = this.clock.getDelta();

      this._updateDino();
      this._updateObstacles(delta);
      this._checkCollisions();

      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  // === Private Setup Methods ===
  _initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000 // increased far plane for large sky sphere
    );
    this.camera.position.set(0, 2, 6);
    this.camera.lookAt(0, 1, 0);
  }

  _initLighting() {
    // Softer ambient light for cloudy weather
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    // Directional light simulating sun behind clouds
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    this.scene.add(dirLight);
    
    // Set up shadow properties
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  _initFog() {
    // Light bluish fog to simulate misty/cloudy atmosphere
    this.scene.fog = new THREE.FogExp2(0xcce0ff, 0.03);
  }

  _initGround() {
    // Use a simple material with a brown color for better performance
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B4513, // Brown color
      roughness: 0.8,
      metalness: 0.2
    });

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      groundMaterial
    );

    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  _initSky() {
    // Use a gradient effect for the sky
    const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
    const skyMaterial = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x0077ff) },  // Light blue
        bottomColor: { value: new THREE.Color(0x87ceeb) }  // Sky blue
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(h, 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide
    });

    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    this.scene.add(sky);
  }

  _initDinosaur() {
    this.dinosaur = createDinosaur();
    this.dinosaur.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    this.scene.add(this.dinosaur);
  }

  _initObstacle() {
    const cactus = createCactusObstacle();
    cactus.position.x = 10;
    this.scene.add(cactus);
    this.obstacles.push(cactus);
  }

  _initInput() {
    const jumpHandler = () => {
      if (!this.isJumping) {
        this.jumpVelocity = 0.16;
        this.isJumping = true;
      }
    };

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') jumpHandler();
    });

    window.addEventListener('touchstart', jumpHandler);
  }

  // === Update Methods ===
  _updateDino() {
    if (this.isJumping) {
      this.dinosaur.position.y += this.jumpVelocity;
      this.jumpVelocity += this.gravity;

      if (this.dinosaur.position.y <= this.groundLevel) {
        this.dinosaur.position.y = this.groundLevel;
        this.isJumping = false;
        this.jumpVelocity = 0;
      }
    }
  }

  _updateObstacles(delta) {
    // Move obstacles
    for (const obs of this.obstacles) {
      obs.position.x -= this.obstacleSpeed;

      if (obs.position.x < -10) {
        this.scene.remove(obs);
      }
    }

    // Cleanup
    this.obstacles = this.obstacles.filter(obs => obs.position.x > -10);

    // Add new obstacles
    const last = this.obstacles[this.obstacles.length - 1];
    if (!last || last.position.x < 4) {
      const newObs = createCactusObstacle();
      newObs.position.set(10 + Math.random() * 5, 0, 0);
      this.scene.add(newObs);
      this.obstacles.push(newObs);
    }
  }

  _checkCollisions() {
    const dinoBox = new THREE.Box3().setFromObject(this.dinosaur);

    for (const obs of this.obstacles) {
      const obsBox = new THREE.Box3().setFromObject(obs);
      if (dinoBox.intersectsBox(obsBox)) {
        alert('Game Over!');
        window.location.reload();
        break;
      }
    }
  }

  onWindowResize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
