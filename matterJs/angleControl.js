let angleSlider;
let currentAngle = 0;

let pivotPoint = { x: pipe1X, y: pipe1Y };

function createAngleUI() {
  angleSlider = createSlider(-45, 45, 0);
  angleSlider.position(10, 40);
}

function rotatePipesPhysics() {
  let newAngleDegrees = angleSlider.value();
  let newAngle = radians(newAngleDegrees);
  let delta = newAngle - currentAngle;

  for (let body of allPipeBodies) {
    Matter.Body.rotate(body, delta, pivotPoint);
  }

  currentAngle = newAngle;
}
