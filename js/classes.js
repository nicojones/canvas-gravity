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