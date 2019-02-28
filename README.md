---
Title: Particalls.js Documentation
Author: Mihai Solomon
Date: 22 February 2019
Update: 28 February 2019
---

## [Demo](https://rabadonnn.github.io/Particalls.js/)

# Particalls.js 
### Lightweigth Javscript Library for Particle Systems

## Usage

### index.html
First of all ```index.html``` must have a body tag, then the script should be placed at the end of the file.

Link: ```https://rawcdn.githack.com/Rabadonnn/Particalls.js/8537673cd6d29a18d19ce52cb91c125139e9443d/src/particalls.js```

```html
<html>
  <body>
    <script src="https://rawcdn.githack.com/Rabadonnn/Particalls.js/8537673cd6d29a18d19ce52cb91c125139e9443d/src/particalls.js"></script>
  </body>
</html>
```

## Tutorial

In your ```main.js``` you can create a new Particle System in one line:
```javascript
var particleSystem = new ParticleSystem(default_settings);
```

```default_settings``` is the default configuration for a system;

You need to have a ```createParticles()``` function:
```javascript

var rendino = new Renderer(default_settings);  // Intialize the renderer if you want to use mine
rendino.initCanvas();                          // initialize canvas

default_settings.renderer = rendino;           // Specify the default Renderer and his callback 
default_settings.renderCallback = render_callback;

var system = new ParticleSystem(default_settings);  // Declare the Particle System

function render_callback() {      // this is the callback
  system.spawnParticles();        // Spawn particles every frame 
  system.update();                // Update and Render them  
  system.render();
}

rendino.process();                // Tell the renderer to start animate

```
You can write your own settings object and pass it as an argument for the function

The settings look like that

```javascript
var default_settings = {
  renderer: null,                                                 // Renderer
  renderCallback: null,                                           // Callback          
  particles: [],                                                  // Particle Array
  background_color: {                                             // Background Color
    r: 50,
    g: 0,
    b: 50,
    get rgb() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    },
    get rgba() {
      return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
  },
  number_per_frame: 10,                                           // Particles per frame
  size: 10,                                                       // Size
  speed: 15,                                                      // Speed
  lifespan: 20,                                                   // Lifespan of the particle
  spawn_box: {                                                    // In this box will be spawned particles
    x: window.innerWidth / 2,
    y: window.innerHeight - 200,
    w: 1,
    h: 1
  },
  vel: {                                             // Velocity Vector
    x: 0, 
    y: 0
  },
  acc: {                                             // Acceleration Vector 
    x: {
      min: -1,
      max: 1
    },
    y: {
      min: -7,
      max: -2
    }
  },
  color: {                                           // Color
    r: 255,
    g: 255,
    b: 255,
    a: 1,
    get rgb() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    },
    get rgba() {
      return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
  },
  shape: "circle",                                    // Shape
  image_url: "",                                      // You can specify your own image for the particle
  modifiers: {                                        // If this is set to true particles will become interactive
    alpha: true,
    size: true
  }
};
```

```default_settings.particles``` is the particle array, you can add more functionality to it using your own functions

You can change all the settings according to your needs but this is a full configuration, so your settings file shouldn't be larger than this one.
