var buttonColours = ["red", "blue", "green", "yellow"];
var Sequence = []
var currentSequence = [];
var hasFailed = true


$(document).keypress((event) => beginGame());
window.addEventListener('touchstart',  () => beginGame() );
$(".btn-replay").click(() => {
  if (hasFailed){
    beginGame();
  } else {
    playSequnce();
  }
})

function beginGame() {
  if (hasFailed) {
    hasFailed = false
    currentSequence = [];

    $(".btn-description").text( "Replay sequence");
    $("#desc").fadeOut();
    nextSequence()
  }
}

$(".btn").click(function () {
  if (!hasFailed) {
    var colorSelectedWithAnnotation = this.id;
    var colorSelected = colorSelectedWithAnnotation.split("_")[0];

    currentSequence.push(colorSelected);
    var currentIndex =  currentSequence.length - 1;

    animate("#"+ colorSelectedWithAnnotation,"pressed")
    buttonPressed(colorSelected,currentIndex);
    
    playSound(colorSelected);
  }
});

function buttonPressed(currentColour,currentIndex) {
  if (currentColour==Sequence[currentIndex]) {
    animate("#" + currentColour,"pressedCorrect");

    if (Sequence.length == currentSequence.length)
      {
        setTimeout(nextSequence, 700);
      }
  } else {
    animate("#" + currentColour,"pressedWrong");
    manageEndGame();
    
  }
}

function manageEndGame(){
  playSound("bad");
  hasFailed =true;
  $(".btn-description").text( "Start");
  $("#level-title").text("Game Over - you loose")

  Sequence = []
}

function nextSequence() {
  var r = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[r];
  Sequence.push(randomChosenColour);

  $("#level-title").text("Current streak : " + Sequence.length)


  playSequnce();
}

function playSequnce(){
  Sequence.forEach(function(obj,index,collection) {
      setTimeout(function(){
        animate("#" + obj,"pressed");
        playSound(obj);
        }, index * 500);
  });
  currentSequence = [];
}

function animate(contextId,classToAppend){
  $(contextId).addClass(classToAppend);
  setTimeout(function() {
    $(contextId).removeClass(classToAppend);
  }, 200);  
}

function playSound(button) {
  var audio;
  switch (button) {
    case "red":
      audio = new Audio("sounds/1.mp3");
      audio.play();
      break;

    case "green":
      audio = new Audio("sounds/2.mp3");
      audio.play();
      break;

    case "yellow":
      audio = new Audio("sounds/3.mp3");
      audio.play();
      break;

    case "blue":
      audio = new Audio("sounds/4.mp3");
      audio.play();
      break;

    case "bad":
      audio = new Audio("sounds/bad.mp3");
      audio.play();
      break;

    default:
      console.log("Deafault - no audio")
  }
}
