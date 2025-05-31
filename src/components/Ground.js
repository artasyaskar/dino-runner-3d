import * as THREE from 'three';

export class Ground {
  constructor() {
    // Load ground texture with repeat wrapping for seamless tiling
    const texture = new THREE.TextureLoader().load('/assets/textures/ground.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(100, 1);

    // Standard material using the loaded texture
    const material = new THREE.MeshStandardMaterial({ map: texture });

    // Large plane geometry to serve as the ground surface
    const geometry = new THREE.PlaneGeometry(200, 10);

    // Mesh combines geometry and material
    this.mesh = new THREE.Mesh(geometry, material);

    // Rotate to lay flat on XZ plane
    this.mesh.rotation.x = -Math.PI / 2;

    // Position ground at y = 0
    this.mesh.position.y = 0;
  }

  update(delta) {
    // Placeholder for potential texture animation (e.g., scrolling effect)
  }
}

