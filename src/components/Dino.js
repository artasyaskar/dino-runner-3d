import * as THREE from 'three';

export class Dino {
  constructor() {
    // Create a simple box geometry to represent the Dino
    this.geometry = new THREE.BoxGeometry(1, 1, 1);

    // Deep red standard material for better lighting interaction
    this.material = new THREE.MeshStandardMaterial({ color: '#8B0000' });

    // Mesh combines geometry and material
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    // Initial vertical position, standing on "ground"
    this.mesh.position.y = 0.5;

    // Jumping state variables
    this.velocity = 0;
    this.isJumping = false;
  }

  jump() {
    if (!this.isJumping) {
      this.velocity = 0.12; // initial jump velocity
      this.isJumping = true;
    }
  }

  update(delta) {
    if (this.isJumping) {
      // Apply gravity effect by reducing velocity
      this.velocity -= 0.005;

      // Update vertical position based on velocity
      this.mesh.position.y += this.velocity;

      // Stop jumping and reset when Dino lands back on ground
      if (this.mesh.position.y <= 0.5) {
        this.mesh.position.y = 0.5;
        this.velocity = 0;
        this.isJumping = false;
      }
    }
  }
}

