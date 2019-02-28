let canvas = document.createElement("canvas");
document.body.appendChild(canvas);
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const width = canvas.width;
const height = canvas.height;

function Vector(x, y) {
  this.x = x;
  this.y = y;
  this.magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
}
Vector.prototype.add = function(u) {
  this.x += u.x;
  this.y += u.y;
}
Vector.prototype.mult = function(u) {
  this.x *= u;
  this.y *= u;
}
Vector.prototype.div = function(u) {
  this.x /= u;
  this.y /= u;
}
Vector.prototype.mag = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
}
Vector.prototype.magSquare = function() {
  return this.x * this.x + this.y * this.y;
}
Vector.prototype.normalize = function() {
  let m = this.mag();
  if (m != 0 && m != 1) {
    this.div(m);
  }
}
Vector.prototype.limit = function(max) {
  if (this.magSquare() > max * max) {
    this.normalize();
    this.mult(max);
  }
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

function mapValue(value, start1, stop1, start2, stop2) {
  let outgoing = start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  return outgoing;
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

var settings = {
  particles: [],
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
    a: 1,
    get rgb() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    },
    get rgba() {
      return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
  },
  shape: "circle",
  image_url: "",
  modifiers: {
    alpha: true,
    size: true
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

  this.image = new Image();
  this.image.src = this.options.image_url; 

  this.render = function() {
    ctx.fillStyle = this.color.rgba;
    ctx.beginPath();

    if (this.options.shape == "circle") {
      ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
    } else if (this.options.shape == "square") {
      ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    } else if (this.options.shape == "image") {
      ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size, this.size);
      ctx.globalAlpha = this.color.a;
    }
    ctx.fill();
    ctx.closePath();

    this.lifespan -= 1;

    if (this.modifiers.alpha) {
      this.color.a = mapValue(this.lifespan, 0, this.options.lifespan, 0, 1);
    }
    if (this.modifiers.size) {
      this.size = mapValue(this.lifespan, 0, this.options.lifespan, 1, this.options.size);
    }
  };

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.speed);
    this.pos.add(this.vel);
  };
  this.dead = function() {
    if (this.lifespan <= 0) {
      return true;
    } else if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
      return true;
    } else if (this.color.a <= 0.1) {
      return  true;
    } else {
      return false;
    }
  };
}

function ParticleSystem(options) {
  this.options = options;
  this.particles = this.options.particles;

  this.spawnParticles = function() {
    for (let i = 0; i < this.options.number_per_frame; i++) {
      let p = new Particle(this.options);
      this.particles.push(p);
    }
  }

  this.update = function() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      if (this.particles[i].dead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  this.render = function() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].render();
    }
  }
}

var process = function() {
  requestAnimationFrame(process);

  ctx.fillStyle = settings.background_color.rgb;
  ctx.fillRect(0, 0, width, height);

  if (typeof createParticles === "function") {
    createParticles();
  } else {
    console.log("No createParticles Function");
  }
};

window.addEventListener(
  "load",
  function() {
    process();
  },
  false
);
