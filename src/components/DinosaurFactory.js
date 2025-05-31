// ======= Dinosaur Model Factory =======
function createDinosaur() {
  const dino = new THREE.Group();

  const oliveMaterial = new THREE.MeshStandardMaterial({ color: 0x556b2f });
  const blackMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

  // === Body ===
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1, 1),
    oliveMaterial
  );
  body.position.y = 1;
  dino.add(body);

  // === Head ===
  const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    oliveMaterial
  );
  head.position.set(1.4, 1.4, 0);
  dino.add(head);

  // === Tail ===
  const tail = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.4, 1.5, 8),
    oliveMaterial
  );
  tail.rotation.z = Math.PI / 3;
  tail.position.set(-1.2, 1, 0);
  dino.add(tail);

  // === Legs ===
  const legLeft = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.8, 0.3),
    oliveMaterial
  );
  legLeft.position.set(-0.5, 0.4, -0.3);
  dino.add(legLeft);

  const legRight = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.8, 0.3),
    oliveMaterial
  );
  legRight.position.set(0.5, 0.4, -0.3);
  dino.add(legRight);

  // === Arms ===
  const armLeft = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.4, 0.2),
    oliveMaterial
  );
  armLeft.position.set(-0.6, 1.2, 0.3);
  dino.add(armLeft);

  const armRight = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.4, 0.2),
    oliveMaterial
  );
  armRight.position.set(0.6, 1.2, 0.3);
  dino.add(armRight);

  // === Eye (Left Only) ===
  const eye = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 8, 8),
    blackMaterial
  );
  eye.position.set(1.7, 1.6, 0.3);
  dino.add(eye);

  // === Final Position ===
  dino.position.set(0, 0, 0);

  return dino;
}
