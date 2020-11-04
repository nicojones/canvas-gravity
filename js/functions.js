function r(v) {
  return Math.floor(v-0);
}

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
