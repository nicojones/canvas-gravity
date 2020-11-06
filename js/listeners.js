const cursorActions = cursor_actions();

// Listeners
canvas_obj.addEventListener(cursorActions.down, function (e) {
    mousedown_stats.coords = mousedown_stats.current = cursorXY(e);
    mousedown_stats.time = + new Date();
    mousedown_stats.down = true;
    create_random_color();
});

canvas_obj.addEventListener(cursorActions.move, function (e) {
    mousedown_stats.current = cursorXY(e);
});

canvas_obj.addEventListener(cursorActions.up, function (e) {
    mousedown_stats.down = false;
    duration = (+ new Date()) - mousedown_stats.time, // difference in milliseconds
        distance_x = mousedown_stats.coords.x - mousedown_stats.current.x,
        distance_y = mousedown_stats.coords.y - mousedown_stats.current.y,

        speed_x = -100 * distance_x / duration,
        speed_y = 100 * distance_y / duration;

    let ball = new Ball(false, speed_y, speed_x, wheigh - mousedown_stats.current.y, mousedown_stats.current.x);

    ++num_balls;
    form_inputs.num_balls.value = num_balls;

    balls.push(ball);
});

form_inputs.form.addEventListener('change', onFormChange)

form_inputs.visible.addEventListener('click', function (e) {
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


form_inputs.help_button.addEventListener('click', function (e) {
    form_inputs.help_box.style.display = 'inline-block';
});

form_inputs.help_box.addEventListener('click', function (e) {
    this.style.display = 'none';
});

for (let i = 0, len = form_inputs.planet.length; i < len; ++i) {
    form_inputs.planet[i].addEventListener('click', function (e) {
        form_inputs.g_val.value = e.target.dataset.gravity;
        onFormChange();
    });
}

form_inputs.dark_mode.addEventListener('click', function (e) {
    if (document.body.className.match(/dark/)) {
        document.body.className = '';
    } else {
        document.body.className = 'dark';
    }
})


function onFormChange() {
    g_val = Number(form_inputs.g_val.value);
    x_drag = ((Number(form_inputs.x_drag.value) / 100) + 0.9).toFixed(2);
    bounce_loss = Number(form_inputs.bounce_loss.value) / 100;
    has_roof = form_inputs.has_roof.checked;

    let new_num_balls = Number(form_inputs.num_balls.value);
    if (num_balls != new_num_balls) {
        let new_balls = [];
        if (num_balls > new_num_balls) {
            for (let i = num_balls - new_num_balls; i < num_balls; ++i) {
                new_balls.push(balls[i]);
            }
            balls = new_balls;
        }
        else {
            for (let i = 0; i < new_num_balls - num_balls; ++i) {
                balls.push(new Ball(true));
            }
        }
        num_balls = new_num_balls;
    }

    return false;
};