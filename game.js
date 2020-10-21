var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

const buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  level++;

  animatePress(randomChosenColor);
  playSound(randomChosenColor);

  $("#level-title").text("Level " + level);


  console.log(gamePattern);
}

$(".btn").on("click", function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
  userClickedPattern = [];
  
}


$("html").keydown(function() {
  if(!gameStarted){
    nextSequence();
    gameStarted = true;
    $("#level-title").text("Level " + level);
  }
});

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  }
  else{
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

    console.log("wrong");
  }
}
