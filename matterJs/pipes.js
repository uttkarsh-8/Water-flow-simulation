let pipe1Top, pipe1Bottom;
let pipe2Top, pipe2Bottom;
let pipe3Top, pipe3Bottom;
let allPipeBodies = [];

let pipe1X = 100;
let pipe1Y = 196;
let pipe1Width = 190;
let pipeHeightSmall = 70;

let pipe2X = pipe1X + pipe1Width;
let pipe2Y = 180;
let pipe2Width = 300;
let pipeHeightLarge = 100;

let pipe3X = pipe2X + pipe2Width;
let pipe3Y = pipe1Y;
let pipe3Width = pipe1Width;
let pipeHeightSmall3 = pipeHeightSmall;

let wallThickness = 10;

function createPipes() {
  pipe1Top = Matter.Bodies.rectangle(
    pipe1X + pipe1Width / 2,
    pipe1Y,
    pipe1Width,
    wallThickness,
    { isStatic: true }
  );
  pipe1Bottom = Matter.Bodies.rectangle(
    pipe1X + pipe1Width / 2,
    pipe1Y + pipeHeightSmall,
    pipe1Width,
    wallThickness,
    { isStatic: true }
  );

  pipe2Top = Matter.Bodies.rectangle(
    pipe2X + pipe2Width / 2,
    pipe2Y,
    pipe2Width,
    wallThickness,
    { isStatic: true }
  );
  pipe2Bottom = Matter.Bodies.rectangle(
    pipe2X + pipe2Width / 2,
    pipe2Y + pipeHeightLarge,
    pipe2Width,
    wallThickness,
    { isStatic: true }
  );

  pipe3Top = Matter.Bodies.rectangle(
    pipe3X + pipe3Width / 2,
    pipe3Y,
    pipe3Width,
    wallThickness,
    { isStatic: true }
  );
  pipe3Bottom = Matter.Bodies.rectangle(
    pipe3X + pipe3Width / 2,
    pipe3Y + pipeHeightSmall3,
    pipe3Width,
    wallThickness,
    { isStatic: true }
  );

  allPipeBodies = [
    pipe1Top,
    pipe1Bottom,
    pipe2Top,
    pipe2Bottom,
    pipe3Top,
    pipe3Bottom,
  ];

  Matter.World.add(world, allPipeBodies);
}

function drawPipes() {
  fill(150);
  for (let b of allPipeBodies) {
    drawBody(b);
  }
}
