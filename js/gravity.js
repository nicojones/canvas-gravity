
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
        balls[i].y = 0;
        balls[i].y_direction = 1;
        balls[i].curr_speed = -1 * bounce_loss * b.curr_speed;
      }
      else if (has_roof && (b.y + b.radius >= wheigh)) {
        balls[i].y_direction = -1;
        balls[i].curr_speed = -1 * bounce_loss * b.curr_speed;
        balls[i].y = 2*wheigh - b.radius - b.y;
      }

      if (Math.abs(b.curr_speed) < (g_val / 5) && b.y < 0.2 * g_val) {
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

// Give a size to the canvas
window.onresize = resize_elements;
resize_elements();


// create the original balls
for (let i = 0; i < num_balls; ++i) {
  balls.push(new Ball(true));
}
window.requestAnimationFrame(animate);









// Miscellaneous
// if ?simple=1 is set, we hide the footer.
if (window.location.search.match(/simple=1/)) {
  document.getElementById('footer').style.display = 'none';
  form_inputs.form.className = form_inputs.form.className.replace('visible', '');
}