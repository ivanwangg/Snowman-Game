let world = document.querySelector("#world");
let snowman = document.querySelector("#snowman");
let block = document.querySelector("#block");
let ground = document.querySelector("#ground");
let cloud = document.querySelector("#cloud");
let score = document.querySelector("#score");
let gameOver = document.querySelector("#gameOver");

//variables for changing the obstacle
let image = document.getElementById('image');
let random = 0;

//variable for the dfferent obstacle's respective properties
let obstacleHeight = 100;
let duckVariable = 400;

//declare variable for player score
let interval = null;
let playerScore = 0;
let highScoreVar = 0;

//function for score
let scoreCounter = ()=>{
    playerScore++;
    score.innerHTML = `Score: <b>${playerScore}</b>`;
}

//start game
window.addEventListener("keydown", (start) => {
    if (start.code == "Space") {
        gameOver.style.display = "none";
        displayScore.style.display = "none";
        startScreen.style.display = "none";
        block.classList.add("blockActive");
        ground.firstElementChild.style.animation = "groundMove 1.5s infinite linear";
        cloud.firstElementChild.style.animation = "cloudMove 5.5s infinite linear"
        cloud2.firstElementChild.style.animation = "cloudMove 6s infinite linear"

        //player score
        playerScore = 0;
        interval = setInterval(scoreCounter, 200);
    }
});


//making snowman jump via up arrowkey
window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowUp")
        if (snowman.classList != "snowmanActive") {
            snowman.classList.add("snowmanActive");

            //after 0.5 seconds, removes the class
            setTimeout(() => {
                snowman.classList.remove("snowmanActive");
            }, 500);
        }
});

//making snowman duck via down arrowkey
window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowDown")
        if (snowman.classList != "snowmanActiveDuck") {
            snowman.classList.add("snowmanActiveDuck");

            //after 0.5 seconds, removes the class
            setTimeout(() => {
                snowman.classList.remove("snowmanActiveDuck");
            }, 500);
        }
});

//game over when snowman and obstacle collides
let result = setInterval(()=> {
    let snowmanBottom = parseInt(getComputedStyle(snowman).getPropertyValue("bottom"));
    let snowmanTop = parseInt(getComputedStyle(snowman).getPropertyValue("top"));
    let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));
    random = Math.round(Math.random() * 2);

    //instance when the obstacle is the standard tree image
    if (blockLeft <= -30 && random == 0) {
        obstacleHeight = 100;
        duckVariable = 400;
        image.src = 'images/tree.png';
        block.style.bottom = "27px";
    }

    //instace when the obstacle is the double tree image
    if (blockLeft <= -30 && random == 1) {
        obstacleHeight = 100;
        duckVariable = 400;
        image.src = 'images/twoTree.png';
        block.style.bottom = "27px";
    }

    //instance when the obstacle is the snowflake image
    if (blockLeft <= -30 && random == 2) {
        obstacleHeight = 200;
        duckVariable = 300;
        image.src = 'images/snowflake.png';
        block.style.bottom = "80px";
    }

    //conditions for the collision and what occurs after
    if (snowmanBottom <= obstacleHeight && snowmanTop < duckVariable && blockLeft >= 20 && blockLeft <= 60) {
        gameOver.style.display = "block";
        displayScore.style.display = "block";
        block.classList.remove("blockActive");
        ground.firstElementChild.style.animation = "none";
        cloud.firstElementChild.style.animation = "none";
        cloud2.firstElementChild.style.animation = "none";
        displayScore.innerHTML = `You had a score of ${playerScore}`;
        if (playerScore > highScoreVar) {
            highScoreVar = playerScore;
            document.querySelector("#highScore").textContent = "High Score: " + highScoreVar;
        }
        clearInterval(interval);
        playerScore = 0;
    }
}, 10);