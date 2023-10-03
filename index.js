
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


var started  = false;
var level = 0;

$(document).keypress(function () {
    if(started == false){
        $("#level-title").text(`Level ${level}`);

        nextSeq();
        started = true;
    }
})

$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
})

function startOver(){
    level = 0; 
    started = false;
    gamePattern = [];
}

function nextSeq(){
    
    userClickedPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`);

    var randomNum = Math.floor(Math.random() * 4);
    var chosenColor = buttonColors[randomNum];
    gamePattern.push(chosenColor);
    
    $("#" + chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(chosenColor);
}




function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSeq();
            }, 1000);
    
        }
    }else{

        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}





