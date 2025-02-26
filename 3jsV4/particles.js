import * as THREE from 'three';

export default function createParticleSystem(particleCount = 1000) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const temperatures = new Float32Array(particleCount);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    temperatures[i] = Math.random();
    console.log(temperatures[i]);
    velocities[i * 3 + 0] = 0;
    velocities[i * 3 + 1] = 0;
    velocities[i * 3 + 2] = 0;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute(
    'temperature',
    new THREE.BufferAttribute(temperatures, 1)
  );
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

  const vertexShader = `
    attribute float temperature;
    varying float vTemperature;
    void main() {
      vTemperature = temperature;
      gl_PointSize = 4.0;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision mediump float;
    varying float vTemperature;
    void main() {
      vec3 blue = vec3(0.0, 0.0, 1.0);
      vec3 orange = vec3(1.0, 0.5, 0.0);
      vec3 red = vec3(1.0, 0.0, 0.0);
      vec3 color = vTemperature < 0.5 ? mix(blue, orange, vTemperature * 2.0)
                                     : mix(orange, red, (vTemperature - 0.5) * 2.0);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
  });

  return new THREE.Points(geometry, material);
}
