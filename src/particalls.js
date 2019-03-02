class Renderer {
  constructor(options) {
    this.options = options;
    this.color = this.options.background_color.rgb;

    this.canvas = document.createElement("canvas");
    this.cache_canvas = document.createElement("canvas");

    document.body.appendChild(this.canvas);

    this.context = this.canvas.getContext("2d");
    this.cache_context = this.cache_canvas.getContext("2d");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  process(render_callback) {
    requestAnimationFrame(() => this.process());
    this.color = this.options.background_color.rgb;
    this.context.fillStyle = this.color;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.options.renderCallback();
  }
}

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
  }

  add(u) {
    this.x += u.x;
    this.y += u.y;
  }

  mult(u) {
    this.x *= u.x;
    this.y *= u.y;
  }

  div(u) {
    this.x /= u.x;
    this.y /= u.y;
  }
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  normalize() {
    let m = this.mag();
    if (m != 0 && m != 1) {
      this.div(m);
    }
  }
  magSquare() {
    return this.x * this.x + this.y * this.y;
  }
  limit(max) {
    if (this.magSquare() > max * max) {
      this.normalize();
      this.mult(max);
    }
  }
}

var random = function(min, max) {
  return min + Math.random() * (max - min);
};

var mapValue = function(value, start1, stop1, start2, stop2) {
  let outgoing =
    start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  return outgoing;
};

var distance = function(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

var default_settings = {
  renderer: null,
  renderCallback: null,
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
    x: window.innerWidth / 2,
    y: window.innerHeight - 200,
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
  gravity: 0.1,
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

class Particle {
  constructor(options) {
    this.options = options;

    this.renderer = this.options.renderer;

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
  }

  update() {
    if (this.modifiers.alpha === true) {
      this.color.a = mapValue(this.lifespan, 0, this.options.lifespan, 0, 1);
    }

    this.acc.y += this.options.gravity;

    this.vel.add(this.acc);
    this.vel.limit(this.speed);
    this.pos.add(this.vel);

    this.lifespan -= 1;
  }
  dead() {
    if (this.lifespan <= 0) {
      return true;
    } else if (
      this.pos.x > window.innerWidth ||
      this.pos.y > window.innerWidth ||
      this.pos.x <= 0 ||
      this.pos.y <= 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}

class ParticleSystem {
  constructor(options) {
    this.options = options;
    this.particles = this.options.particles;

    this.cache_canvas = this.options.renderer.cache_canvas;
    this.cache_context = this.options.renderer.cache_context;

    this.image = new Image();
  }

  makeCacheInstance() {
    this.cache_canvas.width = this.options.size;
    this.cache_canvas.height = this.options.size;

    this.cache_context.fillStyle = this.options.color.rgb;

    if (this.options.shape == "circle") {
      this.cache_context.beginPath();
      this.cache_context.arc(
        this.options.size / 2,
        this.options.size / 2,
        this.cache_canvas.width / 2,
        0,
        2 * Math.PI
      );
      this.cache_context.fill();
      this.cache_context.closePath();
    } else if (this.options.shape == "square") {
      this.cache_context.fillRect(
        0,
        0,
        this.cache_canvas.width,
        this.cache_canvas.height
      );
    }
  }

  spawnParticles() {
    for (let i = 0; i < this.options.number_per_frame; i++) {
      this.particles.push(new Particle(this.options));
    }
  }

  update() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();

      if (this.particles[i].dead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  render() {
    this.makeCacheInstance();
    for (let i = 0; i < this.particles.length; i++) {
      this.options.renderer.context.drawImage(
        this.cache_context.canvas,
        this.particles[i].pos.x - this.options.size / 2,
        this.particles[i].pos.y - this.options.size / 2
      );
      
    }
  }
}
