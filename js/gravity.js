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

function resize_elements() {
  wwidth = window.innerWidth;
  wheigh = window.innerHeight;
  
  canvas_obj.setAttribute('width', wwidth);
  canvas_obj.setAttribute('height', wheigh);
}

const create_random_color = () => {
  "use strict";

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const h = randomInt(0, 360);
  const s = randomInt(42, 98);
  const l = randomInt(40, 90);
  random_color = [h, s + '%', l + '%'];
};

class Ball {

  constructor(new_color, v_0, vx_0, y_0, x_0) {
    "use strict";

    new_color && create_random_color();

    const radius = 20 * Math.random() + 20;

    this.color = random_color;
    this.radius = radius; // radius of ball, in px;
    this.y = this.y_0 = y_0 || r(wheigh * Math.random() * 0.8 + wheigh * 0.2); // distance of bottom of ball to surface
    this.y_direction = -1;
    this.curr_speed = this.v_0 = (vx_0 + v_0) ? v_0 : 0;

    this.x = this.x_0= x_0 || r((wwidth - 100) * Math.random());
    this.x_direction= (vx_0 != 0 ? (vx_0 > 0 ? 1 : -1) : Math.random() > 0.5 ? 1 : -1);
    this.curr_speed_x = this.vx_0= (vx_0 + v_0) ? Math.abs(Number(vx_0)) : Math.random() * 30;

    this.created = + new Date();
    this.bouncing= 1;
    this.rolling= 1;

  }

  draw() {
    let cx = this.x,
        cy = wheigh - this.y - this.radius - 1,
        br = this.radius * 0.2,
        grd = ctx.createRadialGradient(cx - br, cy - br, 0, cx, cy, this.radius);

    grd.addColorStop(1, `hsl(${ this.color.join(',') })`);
    grd.addColorStop(0, "#eee");

    let c = new Circle(cx, cy, this.radius, grd);
    c.fill(ctx);
    
    ctx.restore();
  }
}

class Circle {
  constructor(x, y, r, color) {
    "use strict";
    this.x = (x === null) ? 0 : x;
    this.y = (y === null) ? 0 : y;
    this.r = (r === null) ? 0 : r;
    this.fillStyle = (color === null) ? '#000000' : color;
    
  }

  fill(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fillStyle = this.fillStyle;
      ctx.fill();
      ctx.closePath();
  }
}


animate = () => {

  ctx.restore();
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, wwidth, wheigh); // clear canvas

  for (let i = balls.length - 1; i >= 0; --i) {
    const b = balls[i];

    if (b.bouncing) {
      // v = v_0 + at
      balls[i].curr_speed = (b.curr_speed - (g_val * 0.1))
      balls[i].y = (b.y + b.curr_speed);

      if (b.y <= 0) {
        balls[i].y = -1 * b.y;
        balls[i].y_direction = 1;
        balls[i].curr_speed = -1 * bounce_loss * b.curr_speed;
      }
      else if (has_roof && (b.y + b.radius >= wheigh)) {
        balls[i].y_direction = -1;
        balls[i].curr_speed = -1 * bounce_loss * b.curr_speed;
        balls[i].y = 2*wheigh - b.radius - b.y;
      }

      //console.log(b.curr_speed, b.y);
      if (Math.abs(b.curr_speed) < (g_val / 3) && b.y < 5) {
        balls[i].bouncing = 0;
        balls[i].y = 0;
        balls[i].color_lightness *= 0.8;
      }
    }

    if (b.rolling) {
      // the X axis doesn't depend on bouncing
      balls[i].x += b.x_direction * b.curr_speed_x;
      if (b.x + b.radius > wwidth) {
        balls[i].x_direction = -1;
        balls[i].curr_speed_x *= bounce_loss;
      }
      if (b.x - b.radius < 0) {
        balls[i].x_direction = 1;
        balls[i].curr_speed_x *= bounce_loss;
      }

      if (!b.bouncing) {
        balls[i].curr_speed_x *= x_drag;
      }

      if (b.curr_speed_x < 0.1) {
        balls[i].rolling = 0;
        balls[i].color_lightness *= 0.8;
      }
    }

    balls[i].draw();
  }

  // mouse line
  if (mousedown_stats.down) {
    ctx.beginPath();
    ctx.moveTo(mousedown_stats.coords.x,  mousedown_stats.coords.y);
    ctx.lineTo(mousedown_stats.current.x, mousedown_stats.current.y);
    ctx.lineWidth = 5;

    let fadeout = Math.pow(0.9, (((+ new Date()) - mousedown_stats.time)/100));
    ctx.strokeStyle = `hsla(${ random_color.join(',') },${ fadeout })`;
    ctx.stroke(); 
  }

   window.requestAnimationFrame(animate);
}

function r(v) {
  return Math.floor(v-0);
}

// Give a size to the canvas
window.onresize = resize_elements;
resize_elements();


// create the original balls
for (let i = 0; i < num_balls; ++i) {
  balls.push(new Ball(true));
}
window.requestAnimationFrame(animate);















// Listeners
canvas_obj.addEventListener('mousedown', function(e) {
  mousedown_stats.coords = {x: e.clientX, y: e.clientY};
  mousedown_stats.time = + new Date();
  mousedown_stats.down = true;
  create_random_color();
});

canvas_obj.addEventListener('mousemove', function(e) {
  mousedown_stats.current = {x: e.clientX, y: e.clientY};
});

canvas_obj.addEventListener('mouseup', function(e) {
  mousedown_stats.down = false;
  let coords = {x: e.clientX, y: e.clientY},
      mds = mousedown_stats,
      duration = (+ new Date()) - mousedown_stats.time, // difference in milliseconds
      distance_x = mds.coords.x - coords.x,
      distance_y = mds.coords.y - coords.y,

      speed_x = -100 * distance_x / duration,
      speed_y = 100 * distance_y / duration;

  let ball = new Ball(false, speed_y, speed_x, wheigh - coords.y, coords.x);
  
  ++num_balls;
  form_inputs.num_balls.value = num_balls;

  balls.push(ball);
});

form_inputs.num_balls.value = num_balls;
form_inputs.g_val.value = g_val;
form_inputs.x_drag.value = Math.round((x_drag - 0.9) * 100 * 10) / 10 ;
form_inputs.bounce_loss.value = bounce_loss * 100;
form_inputs.has_roof.checked = has_roof;

form_inputs.form.addEventListener('change', onFormChange)

form_inputs.visible.addEventListener('click', function(e) {
  let visible = form_inputs.form.className.match('visible');
  if (visible) {
    form_inputs.form.className = form_inputs.form.className.replace('visible', '');
  } else {
    form_inputs.form.className += ' visible';
  }

  e.preventDefault();
  e.stopPropagation();
  return false;
});


form_inputs.help_button.addEventListener('click', function(e) {
  form_inputs.help_box.style.display = 'inline-block';
});

form_inputs.help_box.addEventListener('click', function(e) {
  this.style.display = 'none';
});

for (let i = 0, len = form_inputs.planet.length; i < len; ++i) {
  form_inputs.planet[i].addEventListener('click', function(e) {
    form_inputs.g_val.value = e.target.dataset.gravity;
    onFormChange();
  });
}

form_inputs.dark_mode.addEventListener('click', function(e) {
  if (document.body.className.match(/dark/)) {
    document.body.className = '';
  } else {
    document.body.className = 'dark';
  }
})


function onFormChange () {
  g_val = Number(form_inputs.g_val.value);
  x_drag = ((Number(form_inputs.x_drag.value) / 100) + 0.9).toFixed(2);
  bounce_loss = Number(form_inputs.bounce_loss.value) / 100;
  has_roof = form_inputs.has_roof.checked;

  let new_num_balls = Number(form_inputs.num_balls.value);
  if (num_balls != new_num_balls)
  {
    let new_balls = [];
    if (num_balls > new_num_balls)
    {
      for (let i = num_balls - new_num_balls; i < num_balls; ++i)
      {
        new_balls.push(balls[i]);
      }
      balls = new_balls;
    }
    else
    {
      for (let i = 0; i < new_num_balls - num_balls; ++i)
      {
        balls.push(new Ball(true));
      }
    }
    num_balls = new_num_balls;
  }

  return false;
};


// Miscellaneous
// if ?simple=1 is set, we hide the footer.
if (window.location.search.match(/simple=1/)) {
  document.getElementById('footer').style.display = 'none';
}