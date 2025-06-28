import * as THREE from 'three';

const particles = [];

export function createParticleSplash(scene, position, color = 0xffff00) {
  const geometry = new THREE.BufferGeometry();
  const count = 50;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3 + 0] = position.x;
    positions[i3 + 1] = position.y;
    positions[i3 + 2] = position.z;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color, size: 0.2 });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  particles.push({ points, velocity: positions.map(() => (Math.random() - 0.5) * 0.5), lifetime: 1 });
}

export function updateParticles(delta) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.lifetime -= delta;
    if (p.lifetime <= 0) {
      p.points.geometry.dispose();
      p.points.material.dispose();
      p.points.parent.remove(p.points);
      particles.splice(i, 1);
      continue;
    }

    const posAttr = p.points.geometry.attributes.position;
    for (let j = 0; j < posAttr.count; j++) {
      posAttr.array[j * 3 + 1] += p.velocity[j * 3 + 1]; // Y-axis movement
    }
    posAttr.needsUpdate = true;
  }
}
