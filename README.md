---
Title: Particalls.js Documentation
Author: Mihai Solomon
Date: 22 February 2019
---

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

## [Demo](https://rabadonnn.github.io/Particalls.js/)


## Tutorial

In your ```main.js``` you can create a new Particle System in one line:
```javascript
var particleSystem = new ParticleSystem(settings);
```

```settings``` is the default configuration for a system;

You need to have a ```createParticles()``` function:
```javascript
var particleSystem = new ParticleSystem(settings);
function ParticleSystem() {
  particleSystem.spawnParticles();
  particleSystem.performUpdate();
}
```
You can write your own settings object and pass it as an argument for the function

The settings look like that
```javascript
var settings = {
  background_color: {  //Controls the background color of the canvas in RGB value
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
  number_per_frame: 10, // How many particles are going to be spawned per frame
  size: 10,    // Size of the Particle
  speed: 15,   // Speed 
  lifespan: 20, // Lifespan
  spawn_box: {        // These are the coordinates of the Box where are going to be randomly spawned particles
    x: width / 2,     // If the Width and height are 1, particles are going to be spawned from a fixed point;
    y: height - 200,
    w: 1,
    h: 1
  },
  vel: {              // Velocity Vector of the particles
    x: 0,      
    y: 0
  },
  acc: {             // Acceleration of the particles
    x: {             // Acceleration is goign to have a random value between min and max
      min: -1,
      max: 1
    },
    y: {
      min: -7,
      max: -2
    }
  },
  color: {          // RGBA color of the particle
    r: 255,
    g: 255,
    b: 255,
    a: 0,
    get rgb() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    },
    get rgba() {
      return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
  },
  modifiers: {
    alpha: true  // If this is set to true alpha is going to decrease over time
  }
};
```

You can change all the settings according to your needs but this is a full configuration, so your settings file shouldn't be larger than this one.
