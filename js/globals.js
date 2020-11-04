let g_val = 9.81, // value of gravity
    x_drag = 0.99, // drag of rolling ball
    bounce_loss = 0.90, // coefficient of restitution
    num_balls = 3, // initial number of balls
    has_roof = false, // whether the screen is bounded or not
    balls = []; // the balls in the canvas

let wwidth, // screen width
    wheigh, // screen height. [no typo]
    random_color; // Random color assigned for the next ball.

// mousedown event to create balls:
let mousedown_stats = {
  coords: {x: 0, y: 0},
  current: {x: 0, y: 0},
  time: 0,
  down: false,
}

// create Canvas Context
let canvas_obj = document.getElementById('canvas'),
    ctx = canvas_obj.getContext('2d');

ctx.globalCompositeOperation = 'destination-over';
ctx.save();
/////////

// Settings form
const form_inputs = {
  form:        document.getElementById('form'),
  visible:     document.getElementById('keep_visible'),
  num_balls:   document.getElementById('form_num_balls'),
  g_val:       document.getElementById('form_g_val'),
  x_drag:      document.getElementById('form_x_drag'),
  bounce_loss: document.getElementById('form_bounce_loss'),
  has_roof:    document.getElementById('form_has_roof'),
  help_button: document.getElementById('help_button'),
  help_box:    document.getElementById('help'),
  dark_mode:   document.getElementById('dark_mode'),
  planet:      document.getElementsByClassName('planet')
};


form_inputs.num_balls.value = num_balls;
form_inputs.g_val.value = g_val;
form_inputs.x_drag.value = Math.round((x_drag - 0.9) * 100 * 10) / 10;
form_inputs.bounce_loss.value = bounce_loss * 100;
form_inputs.has_roof.checked = has_roof;