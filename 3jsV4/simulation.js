import * as THREE from 'three';

export const simulationSettings = {
  flow: 0.02,
  heating: 0.005,
  cooling: 0.005,
  paused: false,
  reset: function (particleSystem) {
    const posAttr = particleSystem.geometry.getAttribute('position');
    const count = posAttr.count;
    for (let i = 0; i < count; i++) {
      posAttr.array[i * 3 + 0] = -5 + (Math.random() - 0.5) * 2;
      posAttr.array[i * 3 + 1] = (Math.random() - 0.5) * 2;
      posAttr.array[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    posAttr.needsUpdate = true;
  },
  oscAmplitude: 0.2,
  oscFrequency: 1.0,
};

export function getClock() {
  return new THREE.Clock();
}

const defaultHalfHeight = 0.5;
const defaultHalfDepth = 0.5;
const chamberHalfHeight = 1.5;
const chamberHalfDepth = 1.5;
const exitHalfHeight = 0.5;
const exitHalfDepth = 0.5;
const exitYOffset = -1.2;

export function updateParticles(
  particleSystem,
  effectiveGravity,
  pipeContainer
) {
  if (simulationSettings.paused) return;
  const posAttr = particleSystem.geometry.getAttribute('position');
  const velAttr = particleSystem.geometry.getAttribute('velocity');
  const tempAttr = particleSystem.geometry.getAttribute('temperature');
  const count = posAttr.count;
  const worldPos = new THREE.Vector3();
  const localPos = new THREE.Vector3();
  const worldVel = new THREE.Vector3();
  const localVel = new THREE.Vector3();
  const inversePipeQuat = pipeContainer.quaternion.clone().invert();
  for (let i = 0; i < count; i++) {
    worldPos.set(
      posAttr.array[i * 3 + 0],
      posAttr.array[i * 3 + 1],
      posAttr.array[i * 3 + 2]
    );
    worldVel.set(
      velAttr.array[i * 3 + 0],
      velAttr.array[i * 3 + 1],
      velAttr.array[i * 3 + 2]
    );
    worldVel.add(effectiveGravity);
    localPos.copy(worldPos);
    pipeContainer.worldToLocal(localPos);
    localVel.copy(worldVel).applyQuaternion(inversePipeQuat);
    localVel.x = simulationSettings.flow;
    localPos.add(localVel);
    const lx = localPos.x;
    let ly = localPos.y;
    let lz = localPos.z;
    let halfHeight = defaultHalfHeight;
    let halfDepth = defaultHalfDepth;
    let yOffset = 0;
    const inChamber = lx >= -3 && lx <= 2;
    const inExit = lx > 2;
    if (inChamber) {
      halfHeight = chamberHalfHeight;
      halfDepth = chamberHalfDepth;
    } else if (inExit) {
      halfHeight = exitHalfHeight;
      halfDepth = exitHalfDepth;
      yOffset = exitYOffset;
    }
    ly -= yOffset;
    if (ly < -halfHeight) {
      ly = -halfHeight;
      localVel.y = -localVel.y * 0.8;
    } else if (ly > halfHeight) {
      ly = halfHeight;
      localVel.y = -localVel.y * 0.8;
    }
    if (lz < -halfDepth) {
      lz = -halfDepth;
      localVel.z = -localVel.z * 0.8;
    } else if (lz > halfDepth) {
      lz = halfDepth;
      localVel.z = -localVel.z * 0.8;
    }
    ly += yOffset;
    localPos.y = ly;
    localPos.z = lz;
    if (lx < -3) {
      tempAttr.array[i] = Math.min(
        tempAttr.array[i] + simulationSettings.heating,
        1
      );
    } else {
      tempAttr.array[i] = Math.max(
        tempAttr.array[i] - simulationSettings.cooling,
        0
      );
    }
    if (lx > 4) {
      localPos.x = -5;
      localPos.y = (Math.random() - 0.5) * defaultHalfHeight * 2;
      localPos.z = (Math.random() - 0.5) * defaultHalfDepth * 2;
      tempAttr.array[i] = 0;
      localVel.set(simulationSettings.flow, 0, 0);
    }
    pipeContainer.localToWorld(localPos);
    const worldQuat = pipeContainer.quaternion;
    worldVel.copy(localVel).applyQuaternion(worldQuat);
    posAttr.array[i * 3 + 0] = localPos.x;
    posAttr.array[i * 3 + 1] = localPos.y;
    posAttr.array[i * 3 + 2] = localPos.z;
    velAttr.array[i * 3 + 0] = worldVel.x;
    velAttr.array[i * 3 + 1] = worldVel.y;
    velAttr.array[i * 3 + 2] = worldVel.z;
  }
  posAttr.needsUpdate = true;
  velAttr.needsUpdate = true;
  tempAttr.needsUpdate = true;
}
