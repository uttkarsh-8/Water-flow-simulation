import { GUI } from 'dat.gui';

export function setupGUI(options) {
  const gui = new GUI();
  const sim = options.simulationSettings;
  gui.add(sim, 'flow', 0, 0.1, 0.001).name('Flow Velocity');
  gui.add(sim, 'heating', 0, 0.02, 0.0005).name('Heating Rate');
  gui.add(sim, 'cooling', 0, 0.02, 0.0005).name('Cooling Rate');
  gui.add(sim, 'paused').name('Pause Simulation');
  gui.add(options, 'resetParticles').name('Reset Particles');
  gui.add(sim, 'oscAmplitude', 0, 1, 0.01).name('Osc Amplitude');
  gui.add(sim, 'oscFrequency', 0, 5, 0.1).name('Osc Frequency');
}
