let canvas;
let context;
let character_x = 100;
let character_y = 350;
let ismovingRight = false;
let ismovingLeft = false;
let bg_elem = 0;
let lastJumpStarted = 0;
let GraphicsRight = ["/img/img/charakter_1.png", "/img/img/charakter_2.png", "/img/img/charakter_3.png", "/img/img/charakter_4.png"];
let GraphicsLeft = ["/img/img/charakter_left_1.png", "/img/img/charakter_left_2.png", "/img/img/charakter_left_3.png", "/img/img/charakter_left_4.png"];
let GraphicsIndex = 0;
let currentCharacterImage = "/img/img/charakter_1.png"
// CONFIG

let JUMP_TIME = 1000; // in ms
let GAME_SPEED = 7;

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    draw();
    listenforkeys();
    check();
}

function check() {
    setInterval(() => {
     if (ismovingRight) {
         let index = GraphicsIndex % GraphicsRight.length;
         currentCharacterImage = GraphicsRight[index];
         GraphicsIndex = GraphicsIndex +1;
     }

     if (ismovingLeft) {
        let index = GraphicsIndex % GraphicsLeft.length;
        currentCharacterImage = GraphicsLeft[index];
        GraphicsIndex = GraphicsIndex +1;
     }
        }, 100);
}

function draw() {
    drawbackground();
    updateCharakter();
    requestAnimationFrame(draw);
}

function updateCharakter() {
    let base_image = new Image();
    base_image.src = currentCharacterImage;
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
        bg_elem = bg_elem - GAME_SPEED;
    }
    if (ismovingLeft) {
        bg_elem = bg_elem + GAME_SPEED;
    }
    drawGround();
    addBackgroundObject('/img/img/cloud1.png', 200, 110, 1, );
    addBackgroundObject('/img/img/cloud2.png', 500, 110, 1, );
    addBackgroundObject('/img/img/bg_elem_1.png', 200, 410, 0.4, 0.6);
    addBackgroundObject('/img/img/bg_elem_2.png', 700, 230, 0.7, 0.5);
    addBackgroundObject('/img/img/bg_elem_1.png', 1800, 290, 0.8, 0.2);
    addBackgroundObject('/img/img/bg_elem_2.png', 950, 190, 0.8);
    addBackgroundObject('/img/img/bg_elem_1.png', 200 * 2, 410, 0.4, 0.6);
    addBackgroundObject('/img/img/bg_elem_2.png', 700 * 2, 230, 0.7, 0.5);
    addBackgroundObject('/img/img/bg_elem_1.png', 1500 * 2, 290, 0.8, 0.2);
    addBackgroundObject('/img/img/bg_elem_2.png', 950 * 2, 190, 0.8);
}



function drawGround() {



    context.fillStyle = "#FFE699";
    context.fillRect(0, canvas.height - 170, canvas.width, canvas.height);
    addBackgroundObject('/img/img/sand.png', 0 , 530, 1);
}

function addBackgroundObject(src, offsetX, offSetY, scale, opacity) {
    if (opacity != undefined) {
        context.globalAlpha = opacity;
    }
    let base_image = new Image();
    base_image.src = src;
    if (base_image.complete) {
        context.drawImage(base_image, offsetX + bg_elem, offSetY, base_image.width * scale, base_image.height * scale);
    }

    context.globalAlpha = 1;




}



function listenforkeys() {
    document.addEventListener("keydown", e => {
        const k = e.key;
        if (e.code == "Space") {
            lastJumpStarted = new Date().getTime();
        }

        if (k == "ArrowRight") {
            ismovingRight = true;
        }
        if (k == "ArrowLeft") {
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
