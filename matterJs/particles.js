let particles = [];
let spawnCounter = 0;
let flowSlider;

function createSliderUI() {
  flowSlider = createSlider(0, 100, 50);
  flowSlider.position(10, 10);
}

function handleParticleSpawning() {
  let flowRate = flowSlider.value();
  let spawnInterval = map(flowRate, 0, 100, 60, 5);
  spawnCounter++;
  if (spawnCounter >= spawnInterval) {
    spawnParticle();
    spawnCounter = 0;
  }
}

function spawnParticle() {
  let r = 5;
  let x = pipe1X + 10;
  let y = random(pipe1Y + r, pipe1Y + pipeHeightSmall - r);
  let p = Matter.Bodies.circle(x, y, r, {
    restitution: 0.9,
    frictionAir: 0.04,
    friction: 0,
  });
  p.temp = ambientTemp;
  p.r = r;
  particles.push(p);
  Matter.World.add(world, p);
}

function updateAndDrawParticles() {
  applyFluidInteractions();
  for (let i = particles.length - 1; i >= 0; i--) {
    updateTemperature(particles[i]);
    let c = getColorForTemp(particles[i].temp);
    fill(c);
    drawBody(particles[i]);
    if (
      particles[i].position.x > width + 50 ||
      particles[i].position.y > height + 50
    ) {
      Matter.World.remove(world, particles[i]);
      particles.splice(i, 1);
    }
  }
}

function applyFluidInteractions() {
  for (let i = 0; i < particles.length; i++) {
    let pA = particles[i];
    for (let j = i + 1; j < particles.length; j++) {
      let pB = particles[j];
      let dx = pB.position.x - pA.position.x;
      let dy = pB.position.y - pA.position.y;
      let dist = sqrt(dx * dx + dy * dy);
      let desiredDist = pA.r + pB.r;
      if (dist > 0 && dist < desiredDist * 2) {
        let overlap = desiredDist * 2 - dist;
        let forceMag = 0.00001 * overlap;
        let fx = (dx / dist) * forceMag;
        let fy = (dy / dist) * forceMag;
        Matter.Body.applyForce(pA, pA.position, { x: -fx, y: -fy });
        Matter.Body.applyForce(pB, pB.position, { x: fx, y: fy });
      }
    }
  }
}
