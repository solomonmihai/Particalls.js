var gui = new dat.GUI();

gui.add(default_settings, "number_per_frame", 0, 100);
gui.add(default_settings, "size", 0, 400);
gui.add(default_settings, "speed", 0, 100);
gui.add(default_settings, "lifespan", 0, 300);
gui.add(default_settings, "gravity", 0, 5).step(0.1);

var background_color = gui.addFolder("BG_Color");
background_color.add(default_settings.background_color, "r", 0, 255);
background_color.add(default_settings.background_color, "g", 0, 255);
background_color.add(default_settings.background_color, "b", 0, 255);

var spawn_box_folder = gui.addFolder("SpawnBox");
spawn_box_folder.add(default_settings.spawn_box, "x", 0, window.innerWidth);
spawn_box_folder.add(default_settings.spawn_box, "y", 0, window.innerHeight);
spawn_box_folder.add(default_settings.spawn_box, "w", 0, window.innerWidth);
spawn_box_folder.add(default_settings.spawn_box, "h", 0, window.innerHeight);

var acc_folder = gui.addFolder("Acceleration");
acc_folder.add(default_settings.acc.x, "min", -100, 100);
acc_folder.add(default_settings.acc.x, "max", -100, 100);
acc_folder.add(default_settings.acc.y, "min", -100, 100);
acc_folder.add(default_settings.acc.y, "max", -100, 100);

var vel_folder = gui.addFolder("Velocity");
vel_folder.add(default_settings.vel, "x", -100, 100);
vel_folder.add(default_settings.vel, "y", -100, 100);

var color_folder = gui.addFolder("Color");
color_folder.add(default_settings.color, "r", 0, 255);
color_folder.add(default_settings.color, "g", 0, 255);
color_folder.add(default_settings.color, "b", 0, 255);

var modifiers_folder = gui.addFolder("Modifiers")
modifiers_folder.add(default_settings.modifiers, "alpha", true);

gui.add(default_settings, "shape", ["circle", "square", "image"]);
gui.add(default_settings, "image_url");

default_settings.modifiers.size = false;

var rendino = new Renderer(default_settings);

default_settings.renderer = rendino;
default_settings.renderCallback = render_callback;

var system = new ParticleSystem(default_settings);

function render_callback() {
  system.spawnParticles();
  system.update();
  system.render();
}

rendino.process();