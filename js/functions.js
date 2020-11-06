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

function is_touch_device() {  
  try {  
    document.createEvent("TouchEvent");  
    return true;  
  } catch (e) {  
    return false;  
  }  
}

function cursor_actions () {
  const mouseActions = {
    down: 'mousedown',
    move: 'mousemove',
    up: 'mouseup',
    isTouch: false
  };
  if (is_touch_device()) {
    mouseActions.down = 'touchstart';
    mouseActions.move = 'touchmove',
    mouseActions.up = 'touchend'
    mouseActions.isTouch = true
  }

  return mouseActions;
}

function cursorXY (e) {
  if (cursorActions.isTouch) {
    return {x: e.touches[0].clientX, y: e.touches[0].clientY};
  } else {
    return {x: e.clientX, y: e.clientY};
  }
}