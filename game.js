var userClickedPattern = [];
var gamePattern = [];
var gameStarted = false;
var level = 0;
var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  updateLevel();
}

function startOver() {
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  gameStarted = false;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    new Audio('sounds/wrong.mp3').play();
    stopListening();
    $("body").addClass("game-over");
    $("h1").html("Final Score: " + level + "<br>" + "Game Over, Click Here to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function updateLevel() {
  $("h1").text("Level " + level);
}

function playSound(name) {
  new Audio('sounds/' + name + ".mp3").play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function stopListening() {
  $(".btn").off();
}

function startListening() {
  $(".btn").on("click", function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer((userClickedPattern.length - 1));
  });
}


$("h1").click(function(e) {
  if (gameStarted === false) {
    gameStarted = true;
    startListening();
    updateLevel();
    nextSequence();
  }
});
