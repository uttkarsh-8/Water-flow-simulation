import * as THREE from 'three';

export function createPipe() {
  const pipeGroup = new THREE.Group();

  const points1 = [new THREE.Vector3(-5, 0, 0), new THREE.Vector3(-3, 0, 0)];
  const curve1 = new THREE.CatmullRomCurve3(points1);
  const tubularSegments1 = 16;
  const radius1 = 0.55;
  const radialSegments1 = 16;
  const closed1 = false;
  const geometry1 = new THREE.TubeGeometry(
    curve1,
    tubularSegments1,
    radius1,
    radialSegments1,
    closed1
  );
  const material1 = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.2,
  });
  const section1 = new THREE.Mesh(geometry1, material1);
  pipeGroup.add(section1);

  const geometry2 = new THREE.BoxGeometry(5, 3, 3);
  const material2 = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.2,
  });
  const section2 = new THREE.Mesh(geometry2, material2);
  section2.position.set(-0.5, 0, 0);
  pipeGroup.add(section2);

  const points3 = [
    new THREE.Vector3(2, -1.2, 0),
    new THREE.Vector3(4, -1.2, 0),
  ];
  const curve3 = new THREE.CatmullRomCurve3(points3);
  const tubularSegments3 = 16;
  const radius3 = 0.55;
  const radialSegments3 = 16;
  const closed3 = false;
  const geometry3 = new THREE.TubeGeometry(
    curve3,
    tubularSegments3,
    radius3,
    radialSegments3,
    closed3
  );
  const material3 = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    transparent: true,
    opacity: 0.2,
  });
  const section3 = new THREE.Mesh(geometry3, material3);
  pipeGroup.add(section3);

  return pipeGroup;
}

export function createPipeContainer(pipe, particleSystem) {
  const pipeContainer = new THREE.Group();
  pipeContainer.add(pipe);
  pipeContainer.add(particleSystem);
  return pipeContainer;
}
