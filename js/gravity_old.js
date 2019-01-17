var g_val = 15.81; // value of gravity
var a_step = 0.03; // how often we render the animation, in seconds.
var x_drag = 0.98;
var bounce_loss = 0.8;

var animation_interval = null;

var firstScript = document.getElementsByTagName('script')[0];

var wwidth = window.innerWidth;
var wheigh = window.innerHeight;

function r(v) {
  return Math.floor(v-0);
}

var num_balls = 1;
var balls = [];

for (var i = 0; i < num_balls; ++i) {
  balls.push({
    color: [r(Math.random()*255), r(Math.random()*255), r(Math.random()*255)],

    height: 50 * Math.random() + 50, // height of ball, in px;
    y_0: r(wheigh * Math.random() * 0.8 + wheigh * 0.2), // distance of bottom of ball to surface
    y_direction: -1,
    v_0: 0,

    x_0: r((wwidth - 100) * Math.random()),
    x_direction: Math.random() > 0.5 ? 1 : -1,
    vx_0: Math.random() * 30,

    created: + new Date(),
    bouncing: 1,
    rolling: 1,
  });
}


function animate() {
  //var now = + new Date();
  for (var i = 0; i < balls.length; ++i) {
    if (balls[i].bouncing) {
      // v = v_0 + at

      balls[i].curr_speed = (balls[i].curr_speed - (g_val * a_step))
      balls[i].y = (balls[i].y + balls[i].curr_speed);

      if (balls[i].y <= 0) {
        balls[i].y = -1 * balls[i].y;
        balls[i].y_direction = 1;
        balls[i].curr_speed = -1 * bounce_loss * balls[i].curr_speed;
      }

      if (Math.abs(balls[i].curr_speed) < 2 && balls[i].y < 5) {
        // kill the ball.
        balls[i].bouncing = 0;
        balls[i].object.className += ' unbounced';
        var color = balls[i].color;
        color[0] = r(color[0]/2);
        color[1] = r(color[1]/2);
        color[2] = r(color[2]/2);
        balls[i].object.style.backgroundColor = 'rgb(' + color.join(',') + ')';
      }

      balls[i].object.style.bottom = balls[i].y + 'px';
    }

    if (balls[i].rolling) {
      // the X axis doesn't depend on bouncing
      balls[i].x += balls[i].x_direction * balls[i].curr_speed_x;
      if (balls[i].x + balls[i].height > wwidth) {
        balls[i].x_direction = -1;
      }
      if (balls[i].x < 0) {
        balls[i].x_direction = 1;
      }

      if (!balls[i].bouncing) {
        balls[i].curr_speed_x *= x_drag;
      }

      if (balls[i].curr_speed_x < 0.3) {
        balls[i].rolling = 0;
        var color = balls[i].color;
        color[0] = r(color[0]/2);
        color[1] = r(color[1]/2);
        color[2] = r(color[2]/2);
        balls[i].object.style.backgroundColor = 'rgb(' + color.join(',') + ')';

        balls[i].object.className += ' unrolled';
      }

      balls[i].object.style.left = balls[i].x + 'px';
    }
  }
}


var stop_button = document.createElement('button');
document.body.insertBefore(stop_button, firstScript);

stop_button.addEventListener('click', function(e) {
  e.preventDefault();
  console.log("hm...");
  clearInterval(animation_interval);
}, false);



for (var i = 0; i < balls.length; ++i) {
  var b = balls[i];

  balls[i].x = balls[i].x_0;
  balls[i].y = balls[i].y_0;
  balls[i].curr_speed_x = balls[i].vx_0;
  balls[i].curr_speed = balls[i].v_0;

  var obj = document.createElement('span');
  obj.id = 'ball-' + i;
  obj.className = 'ball';
  obj.style.backgroundColor = "rgb(" + b.color.join(',') + ")";
  obj.style.height = b.height + 'px';
  obj.style.width  = b.height + 'px';
  obj.style.left   = b.x_0 + 'px';
  obj.style.bottom = b.y_0 + 'px';


  document.body.insertBefore(obj, firstScript);

  balls[i].object = obj;

}


animation_interval = window.setInterval(animate, 1000 * a_step)