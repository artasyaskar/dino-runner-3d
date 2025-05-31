import * as THREE from 'three';

// ======= Cactus Obstacle Factory =======
export function createCactusObstacle() {
  const group = new THREE.Group();

  const cactusMaterial = new THREE.MeshStandardMaterial({ color: 0x2e8b57 }); // Dark green
  const cylinderOpts = { radialSegments: 8 };

  // Main cactus body
  const mainBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 2, cylinderOpts.radialSegments),
    cactusMaterial
  );
  mainBody.position.y = 1;
  group.add(mainBody);

  // Left arm
  const leftArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.15, 1, cylinderOpts.radialSegments),
    cactusMaterial
  );
  leftArm.rotation.z = Math.PI / 2.5;
  leftArm.position.set(-0.5, 1.3, 0);
  group.add(leftArm);

  // Right arm
  const rightArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.15, 1, cylinderOpts.radialSegments),
    cactusMaterial
  );
  rightArm.rotation.z = -Math.PI / 2.5;
  rightArm.position.set(0.5, 1.3, 0);
  group.add(rightArm);

  // Initial spawn position (adjustable)
  group.position.set(10, 0, 0); // Spawns 10 units ahead

  return group;
}
