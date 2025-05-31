import * as THREE from 'three';

export class Obstacle {
  constructor() {
    // Create a cylinder geometry to represent the obstacle
    const geometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 8);

    // Dark green standard material for the obstacle
    const material = new THREE.MeshStandardMaterial({ color: '#006400' });

    // Mesh combines geometry and material
    this.mesh = new THREE.Mesh(geometry, material);

    // Initial position off to the right, standing on the ground
    this.mesh.position.set(5, 0.75, 0);
  }

  update(delta) {
    // Move obstacle leftward to simulate forward motion
    this.mesh.position.x -= 0.05;
  }

  isOutOfView() {
    // Check if obstacle has moved beyond left boundary of view
    return this.mesh.position.x < -10;
  }
}

