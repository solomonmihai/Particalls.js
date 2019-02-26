var gui = new dat.GUI();

gui.add(settings, "number_per_frame", 0, 100);
gui.add(settings, "size", 0, 100).listen();
gui.add(settings, "speed", 0, 100);
gui.add(settings, "lifespan", 0, 100);

var background_color = gui.addFolder("BG_Color");
background_color.add(settings.background_color, "r", 0, 255);
background_color.add(settings.background_color, "g", 0, 255);
background_color.add(settings.background_color, "b", 0, 255);

var spawn_box_folder = gui.addFolder("SpawnBox");
spawn_box_folder.add(settings.spawn_box, "x", 0, width);
spawn_box_folder.add(settings.spawn_box, "y", 0, height);
spawn_box_folder.add(settings.spawn_box, "w", 0, width);
spawn_box_folder.add(settings.spawn_box, "h", 0, height);

var acc_folder = gui.addFolder("Acceleration");
acc_folder.add(settings.acc.x, "min", -100, 100);
acc_folder.add(settings.acc.x, "max", -100, 100);
acc_folder.add(settings.acc.y, "min", -100, 100);
acc_folder.add(settings.acc.y, "max", -100, 100);

var vel_folder = gui.addFolder("Velocity");
vel_folder.add(settings.vel, "x", -100, 100);
vel_folder.add(settings.vel, "y", -100, 100);

var color_folder = gui.addFolder("Color");
color_folder.add(settings.color, "r", 0, 255);
color_folder.add(settings.color, "g", 0, 255);
color_folder.add(settings.color, "b", 0, 255);

var modifiers_folder = gui.addFolder("Modifiers")
modifiers_folder.add(settings.modifiers, "alpha", true);

gui.add(settings, "shape", ["circle", "square"]);

settings.modifiers.size = false;

var system = new ParticleSystem(settings);

function createParticles() {
  system.spawnParticles();
  system.performUpdate();
}
