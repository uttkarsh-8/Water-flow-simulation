let engine;
let world;

function setup() {
  createCanvas(800, 600);
  engine = Matter.Engine.create();
  world = engine.world;

  createPipes();
  createSliderUI();
  createAngleUI();
}

function draw() {
  background(220);
  rotatePipesPhysics();
  Matter.Engine.update(engine);

  drawPipes();
  handleParticleSpawning();
  updateAndDrawParticles();
}

function drawBody(body) {
  let vertices = body.vertices;
  beginShape();
  for (let i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
