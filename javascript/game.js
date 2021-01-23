let canvas;
let context;
let character_x = 100;
let character_y = 425;
let ismovingRight = false;
let ismovingLeft = false;
let bg_elem = 0;
let lastJumpStarted = 0;
let GraphicsRight = ["../img/charakter_1.png", "../img/charakter_2.png", "../img/charakter_3.png", "../img/charakter_4.png"];
let GraphicsLeft = ["../img/charakter_left_1.png", "../img/charakter_left_2.png", "../img/charakter_left_3.png", "../img/charakter_left_4.png"];
let GraphicsIndex = 0;
let currentCharacterImage = "../img/charakter_1.png"
let cloudOffset = 0;
let chickens = [];
let Character_Energy = 100;
let placedBottles = [1000, 1600, 2300, 3500];
let tabasco = 0;
// CONFIG

let JUMP_TIME = 300; // in ms
let GAME_SPEED = 7;
let AUDIO_RUNNING = new Audio("../audio/running.wav");
let AUDIO_JUMP = new Audio("../audio/jump.wav");
let AUDIO_BOTTLE = new Audio("../audio/bottle.wav");


function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    draw();
    createChickenList()
    calculateCloudOffset();
    checkIfisRunning();
    calculateChickenPosition();
    listenforkeys();
    checkForCollisions();

}

function checkForCollisions() {
    let chicken = chickens;

    setInterval(() => {
        for (let i = 0; i < chickens.length; i++) {
            let chicken = chickens[i]
            let chicken_x = chicken.position_x + bg_elem;
            if ((chicken_x - 40) < character_x && (chicken_x + 40) > character_x) {
                if (character_y > 300) {
                    Character_Energy--;
                }
            }
        }
        for (let i = 0; i < placedBottles.length; i++) {
            let bottle_x = placedBottles[i] + bg_elem;
            if ((bottle_x - 40) < character_x && (bottle_x + 40) > character_x) {
                if (character_y > 300) {
                    placedBottles.splice(i, 1);
                    AUDIO_BOTTLE.play();
                    tabasco++;
                }
            }
        }
    }, 100);

}


function bottleCounter(){
    let base_image = new Image();
    base_image.src = "../img/tabasco.png";
    if (base_image.complete) {
        context.drawImage(base_image, -2, 10, base_image.width * 0.5, base_image.height * 0.5);
    }

    context.font = "30px fantasy";
    context.fillText( "x " + tabasco , 50,50);
}

function drawEnergyBar() {
    context.fillStyle = "blue"; // color in the canvas
    context.fillRect(485, 10, 2 * Character_Energy, 30);
    context.globalAlpha = 1;

    context.globalAlpha = 0.5;
    context.fillStyle = "black"; // color in the canvas
    context.fillRect(475, 5, 220, 40);
    context.globalAlpha = 1;

}

function calculateCloudOffset() {
    setInterval(() => {
        cloudOffset = cloudOffset + .25;
    }, 50);
}

function checkIfisRunning() {
    setInterval(() => {
        if (ismovingRight) {
            AUDIO_RUNNING.play();
            let index = GraphicsIndex % GraphicsRight.length;
            currentCharacterImage = GraphicsRight[index];
            GraphicsIndex = GraphicsIndex + 1;
        }

        if (ismovingLeft) {
            AUDIO_RUNNING.play();
            let index = GraphicsIndex % GraphicsLeft.length;
            currentCharacterImage = GraphicsLeft[index];
            GraphicsIndex = GraphicsIndex + 1;
        }

        if (!ismovingLeft && !ismovingRight) {
            AUDIO_RUNNING.pause();
        }
    }, 100);
}

function draw() {
    drawbackground();
    updateCharakter();
    drawChickens();
    drawEnergyBar();
    drawBottles();
    bottleCounter();
    requestAnimationFrame(draw);
}


function drawBottles() {
    for (let i = 0; i < placedBottles.length; i++) {
        addBackgroundObject("../img/tabasco.png", placedBottles[i], 540, 0.7)

    }
}

function calculateChickenPosition() {

    setInterval(() => {
        for (let i = 0; i < chickens.length; i++) {
            let chicken = chickens[i];
            chicken.position_x = chicken.position_x - chicken.speed;
        }
    }, 50);
}

// fills the array with the generatet informations

function createChickenList() {
    chickens = [
        createChicken(1, 1400),
        createChicken(2, 2000),
        createChicken(1, 2400),
        createChicken(1, 3000),
        createChicken(2, 3400)


    ];
}

function drawChickens() {
    for (let i = 0; i < chickens.length; i++) {
        let chicken = chickens[i];
        addBackgroundObject(chicken.img, chicken.position_x, chicken.position_y, chicken.scale, 1);
    }

}


function createChicken(type, position_x) {
    return {
        "img": "../img/chicken" + type + ".png",
        "position_x": position_x,
        "position_y": 550,
        "scale": 0.6,
        "speed": Math.random() * 5
    }
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
        if (character_y < 425) {
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

    // Draw Clouds
    addBackgroundObject('../img/cloud1.png', 200 - cloudOffset, 110, 1,);
    addBackgroundObject('../img/cloud2.png', 700 - cloudOffset, 110, 1,);
    addBackgroundObject('../img/cloud1.png', 1300 - cloudOffset, 110, 1,);
    addBackgroundObject('../img/cloud2.png', 1700 - cloudOffset, 110, 1,);
    addBackgroundObject('../img/cloud1.png', 2200 - cloudOffset, 110, 1,);
    addBackgroundObject('../img/cloud2.png', 2700 - cloudOffset, 110, 1,);
    addBackgroundObject('../img/cloud1.png', 3300 - cloudOffset, 110, 1,);
    addBackgroundObject('../img/cloud2.png', 00 - cloudOffset, 110, 1,);
    addBackgroundObject('../img/cloud1.png', 3900 - cloudOffset, 110, 1,);
    addBackgroundObject('../img/cloud2.png', 5200 - cloudOffset, 110, 1,);
    drawGround();




}



function drawGround() {
    // Draw Character
    addBackgroundObject('../img/bg_elem_1.png', 300, 390, 0.7, 0.6);
    addBackgroundObject('../img/bg_elem_2.png', 450, 340, 0.6, 0.5);
    addBackgroundObject('../img/bg_elem_1.png', 700, 420, 0.6, 0.2);
    addBackgroundObject('../img/bg_elem_2.png', 1000, 390, 0.5);
    addBackgroundObject('../img/bg_elem_1.png', 1300, 390, 0.7, 0.6);
    addBackgroundObject('../img/bg_elem_2.png', 1450, 340, 0.6, 0.5);
    addBackgroundObject('../img/bg_elem_1.png', 2000, 420, 0.6, 0.2);
    addBackgroundObject('../img/bg_elem_2.png', 2300, 390, 0.5);
    addBackgroundObject('../img/bg_elem_1.png', 2450, 390, 0.7, 0.6);
    addBackgroundObject('../img/bg_elem_2.png', 3000, 340, 0.6, 0.5);
    addBackgroundObject('../img/bg_elem_1.png', 3450, 420, 0.6, 0.2);
    addBackgroundObject('../img/bg_elem_2.png', 4000, 390, 0.5);


    context.fillStyle = "#FFE699";
    context.fillRect(0, canvas.height - 100, canvas.width, canvas.height);
    // Draw Sand
    for (let i = 0; i < 10; i++) {
        addBackgroundObject('../img/sand.png', canvas.width * i, 600, 0.350, 0.5);
    }

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

        console.log(e.key)
        if (e.code == "Space") {
            lastJumpStarted = new Date().getTime();
            AUDIO_JUMP.play();
        }

        if (k == "ArrowRight") {
            ismovingRight = true;
        }
        if (k == "ArrowLeft") {
            ismovingLeft = true;
            if (bg_elem > -100) {
                ismovingLeft = false;
            }
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
