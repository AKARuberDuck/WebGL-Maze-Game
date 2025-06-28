import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export function buildMazeFromGrid(scene, world, maze) {
  const boxSize = 2;
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x4444ff });

  maze.forEach((row, z) => {
    row.forEach((cell, x) => {
      if (cell === 1) {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(boxSize, boxSize, boxSize), wallMat);
        mesh.position.set(x * boxSize, 1, z * boxSize);
        scene.add(mesh);

        const shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
        const body = new CANNON.Body({ mass: 0, shape });
        body.position.set(x * boxSize, 1, z * boxSize);
        world.addBody(body);
      }
    });
  });
}
