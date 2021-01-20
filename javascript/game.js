let canvas;
let context;
let character_x = 0;
let character_y = 350;
let ismovingRight = false;
let ismovingLeft = false;
let bg_elem = 0;
let lastJumpStarted = 0;

// CONFIG

let JUMP_TIME = 1000; // in ms

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    draw();
    listenforkeys();
}

function draw() {
    drawbackground();
    updateCharakter();
    requestAnimationFrame(draw);
}

function updateCharakter() {
    let base_image = new Image();
    base_image.src = "/img/img/charakter_1.png";
    if (base_image.complete) {
        context.drawImage(base_image, character_x, character_y, base_image.width * 0.5, base_image.height * 0.5);
    }

    let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
    if (timePassedSinceJump < JUMP_TIME) {
        character_y = character_y - 10;
    } else

        //check falling
        if (character_y < 350) {
            character_y = character_y + 10;
        }

}




function drawbackground() {
    context.fillStyle = "white"; // color in the canvas
    context.fillRect(0, 0, canvas.width, canvas.height); // cordination system start point a
    if (ismovingRight) {
        bg_elem = bg_elem - 2;
    }
    if (ismovingLeft) {
        bg_elem = bg_elem + 2;
    }
    drawGround();
}



function drawGround() {
    context.fillStyle = "#FFE699";
    context.fillRect(0, canvas.height - 170, canvas.width, canvas.height);
    let base_image = new Image();
    base_image.src = "/img/img/bg_elem_1.png";
    if (base_image.complete) {
        context.drawImage(base_image, bg_elem, 350, base_image.width * 0.6, base_image.height * 0.6);
    }


    let base_image2 = new Image();
    base_image2.src = "/img/img/bg_elem_2.png";
    if (base_image2.complete) {
        context.drawImage(base_image, 200 + bg_elem, 290, base_image.width * 0.8, base_image.height * 0.8);

    }


}

function listenforkeys() {
    document.addEventListener("keydown", e => {
        const k = e.key;
        if (e.code == "Space") {
            lastJumpStarted = new Date().getTime();
        }

        if (k == "ArrowRight") {
            character_x = character_x + 10;
            ismovingRight = true;
        }
        if (k == "ArrowLeft") {
            character_x = character_x - 10;
            ismovingLeft = true;
        }
    });

    document.addEventListener("keyup", e => {
        const k = e.key;
        if (k == "ArrowRight") {
            ismovingRight = false;
        }
        if (k == "ArrowLeft") {
            ismovingLeft = false;
        }
    }
    )

} 
