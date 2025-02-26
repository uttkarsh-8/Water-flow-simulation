let ambientTemp = 20;
let maxTemp = 80;
let heatingRate = 0.1;
let coolingRate = 0.05;

function updateTemperature(p) {
  let leftHotZone = pipe1X;
  let rightHotZone = pipe1X + pipe1Width;
  if (p.position.x > leftHotZone && p.position.x < rightHotZone) {
    p.temp = min(p.temp + heatingRate, maxTemp);
  } else {
    p.temp = max(p.temp - coolingRate, ambientTemp);
  }
}

function getColorForTemp(t) {
  let amt = map(t, ambientTemp, maxTemp, 0, 1);
  let coldColor = color(0, 0, 255);
  let hotColor = color(255, 0, 0);

  return lerpColor(coldColor, hotColor, amt);
}
