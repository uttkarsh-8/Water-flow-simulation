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


## Approach 2
### 3D Water Flow Simulation Through a Pipe
![image](https://github.com/user-attachments/assets/1ec2db88-a334-45cf-b1ce-c163117a6b8e)

#### Technologies used
##### Three.js:
  - Three.js is a JavaScript library which handles all the 3D rendering
  - dat.GUI provides us with an interactive control for velocity of the particles, changing the heating rate(for first pipe) and cooling rate(for other 2 pipes), a pause button, a button to reset particles, oscialltion amplitude and oscillation frequency to oscilate the pipe.

#### Implementation
  - We built an interactive 3D simulation using Three.js, where water flow is characterized as a particle system which flows through a pipe:
  - Section 1 - Hot Inlet: A cylindrical pipe where water is heated
  - Section 2 - Cooling Chamber: A large square pipe with wider area where cooling of water particles is done
  - Section 3 - Exit & Cooling Channel: Similar to section 1, through here water flows out while continuing to cool
  - The pipe is constructed using a combination of TubeGeometry for the cylindrical pipes and BoxGeometry for the cooling chamber. These pipes are grouped together to form a pipe structure.
  - The water is represented as thousands of particles stored in a BufferGeometry, each with attributes for position, velocity, and temperature.
  - Custom shaders are used to interpolate particle colours from blue->red or vice versa based on temperature values.
  - We have then initialized a simulation loop where particle positions and velocities are updated each frame, a constant velocity and gravity component(vector) is applied on the particles. Temperature is adjusted depending on the section the particle, if in Section 1 (hot inlet) they are heated, while those in Sections 2 and 3 gradually cool down.
  - For interactivity, dat.GUI is integrated to allow real time adjustment of simulation parameters (flow velocity, heating/cooling rates, oscillation amplitude, and frequency), while OrbitControls enable the user to navigate around the scene and view the simulation from different angles.
  - We have implemented 2 shaders here:
  - - 1) Vertex Shader - Handles particle positions and passes temperature data.
      2) Fragment Shader - Creates color gradients for the particles based on colour gradient.

#### Trade-offs/Cons
  - No physics engine, only visual approximations are used

#### Potential Solutions
  - Using libraries like LiquidFun which are designed for fluid behaviour.
  - Implementing Smoothed Particle Hydrodynamics(SPH) which directly addresses the continuous nature of fluids by solving approximations to the Navier–Stokes equations. (using softwares like FreeFlow)
  - Computational fluid dynamics (CFD) tools to simulate fluid flow, heat transfer, etc. (using tools like OpenFoam)
