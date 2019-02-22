let canvas = document.createElement("canvas");
document.body.appendChild(canvas);
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const width = canvas.width;
const height = canvas.height;
const FPS = 60;

function Vector(x, y) {
  this.x = x;
  this.y = y;
  this.magnitude = Math.sqrt(this.x * this.x + this.y * this.y);

  this.add = function(u) {
    this.x += u.x;
    this.y += u.y;
  };
  this.mult = function(u) {
    this.x *= u;
    this.y *= u;
  };
  this.div = function(u) {
    this.x /= u;
    this.y /= u;
  };
  this.mag = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };
  this.magSquare = function() {
    return this.x * this.x + this.y * this.y;
  };
  this.normalize = function() {
    let m = this.mag();
    if (m != 0 && m != 1) {
      this.div(m);
    }
  };
  this.limit = function(max) {
    if (this.magSquare() > max * max) {
      this.normalize();
      this.mult(max);
    }
  };
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

function mapValue(value, start1, stop1, start2, stop2) {
  let outgoing =
    start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));

  return outgoing;
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

var particles = [];

var settings = {
  background_color: {
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
  number_per_frame: 10,
  size: 10,
  speed: 15,
  lifespan: 20,
  spawn_box: {
    x: width / 2,
    y: height - 200,
    w: 1,
    h: 1
  },
  vel: {
    x: 0,
    y: 0
  },
  acc: {
    x: {
      min: -1,
      max: 1
    },
    y: {
      min: -7,
      max: -2
    }
  },
  color: {
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
    alpha: true
  }
};

function Particle(options) {
  this.options = options;

  this.pos = new Vector(
    random(
      this.options.spawn_box.x,
      this.options.spawn_box.x + this.options.spawn_box.w
    ),
    random(
      this.options.spawn_box.y,
      this.options.spawn_box.y + this.options.spawn_box.h
    )
  );
  this.acc = new Vector(
    random(this.options.acc.x.min, this.options.acc.x.max),
    random(this.options.acc.y.min, this.options.acc.y.max)
  );

  this.vel = new Vector(this.options.vel.x, this.options.vel.y);
  this.speed = this.options.speed * random(1, 1.2);
  this.lifespan = this.options.lifespan;
  this.color = this.options.color;
  this.size = this.options.size;

  this.modifiers = this.options.modifiers;

  this.render = function() {
    ctx.fillStyle = this.color.rgba;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);

    //ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    ctx.fill();
    ctx.closePath();
  };

  this.update = function() {
    this.lifespan -= 1;

    if (this.modifiers.alpha) {
      this.color.a = mapValue(this.lifespan, 0, this.options.lifespan, 0, 0.5);
    }

    this.vel.add(this.acc);
    this.vel.limit(this.speed);
    this.pos.add(this.vel);
  };

  this.dead = function() {
    if (this.lifespan <= 0) {
      return true;
    } else {
      return false;
    }
  };
}

function ParticleSystem(options) {
  this.options = options;
  this.particles = [];

  this.spawnParticles = function() {
    for (let i = 0; i < this.options.number_per_frame; i++) {
      let p = new Particle(this.options);
      this.particles.push(p);
    }
  }

  this.performUpdate = function() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].render();

      if (this.particles[i].dead()) {
        this.particles.splice(1, i);
      }
    }
  }
}

var times = [];
var fps;

var process = function() {
  setTimeout(function() {
    requestAnimationFrame(process);

    ctx.fillStyle = settings.background_color.rgb;
    ctx.fillRect(0, 0, width, height);

    if (typeof createParticles === "function") {
      createParticles();
    } else {
      console.log("No createParticles Function");
    }

  }, 1000 / FPS);
};

window.addEventListener(
  "load",
  function() {
    process();
  },
  false
);
