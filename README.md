# Water Flow Simulation Through a Segmented Pipe
## Approach 1
### Particle-Based 2D Physics (p5.js + matter.js)
![matterJs](https://github.com/user-attachments/assets/da7de65d-de3c-4c2d-8e36-2c5da15cc084)

#### Technologies used:
##### Matter.js:
  - Matter.js is the physics engine which handels our simulation. It calculates forces, collisions and constraints between the objects.
  - It enables the water particles and pipe bodies to interact.
  - Matter.js updates positions, velocities, and handles collisions in each frame, which helps us in mimicking how water particles move and interact.
##### p5.js:
  - p5.js provides the rendering canvas and user interface components, such as sliders, and manages the main drawing loop.
  - Matter.js takes care of the physics simulation, p5.js is responsible for drawing the particles and pipes
  - It also helps in mapping their physical properties (like temperature-based colors) and capturing user input.
#### Implementation   
  - We have created a 2D simulation in p5.js that uses Matter.js to model a simplified water flow through distinct pipe sections, where each pipe segment is represented by static rectangular bodies, and the flowing “water particles” have been made as circular particle bodies. 
  - At a high level, we have three rectangular bodies to form our pipe segments, positioning them to create a continuous pipe like structure. The water is simulated by periodically spawning small circular bodies whose positions are updated each frame according to the physics engine.
  - For interactive control, we included a slider to adjust the spawn rate of these particles and rotation of the pipe. Each particle maintains a temperature property that is updated each frame based on its location: inside the “hot inlet” region, particles’ temperatures increase, and outside it, they gradually cool toward ambient temperature.
  - Each particle’s color changes continuously (from blue to red) depending on its temperature, using p5’s lerpColor function. To handle collisions between particles and encourage a more fluid-like spread rather than simple rigid-body collisions, a custom applyFluidInteractions function checks the distances between particles; if they are too close, a gentle repulsive force is applied to push them apart. 
  - Particles also have properties like restitution (bounciness), a small airFriction for the particles to reduce “explosive” collisions and reduce their velocities in free flight.
  - Together, these adjustments emulate a simplistic fluid flow behavior: particles flow through the pipe, collide softly with the pipe walls and each other, gradually slow due to air friction, and appear as a cohesive stream rather than individual bouncing balls. Everything is drawn to the p5.js canvas each frame, with the top and bottom edges of the pipes rendered as static bodies, and the particle circles rendered according to their updated positions and interpolated colors. 
#### Trade-offs/Cons
  - One major con is that Matter.js is a 2D rigid-body physics engine, which means it is very good at  handling discrete bodies and collisions but isn’t designed to solve the complex, continuous equations like real fluid dynamics.

#### Potential Solutions
  - Using libraries like LiquidFun which are designed for fluid behaviour.
  - Implementing Smoothed Particle Hydrodynamics(SPH) which directly addresses the continuous nature of fluids by solving approximations to the Navier–Stokes equations. (using softwares like FreeFlow)
  - Computational fluid dynamics (CFD) tools to simulate fluid flow, heat transfer, etc. (using tools like OpenFoam)
