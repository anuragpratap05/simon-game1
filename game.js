gamePattern=[];

buttonColours=["red","blue", "green", "yellow"];

var userClickedPattern = [];

var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

function nextsequence()
{

  level++;
  userClickedPattern = [];

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  var randomnumber=Math.random();
  randomnumber=  Math.floor( randomnumber*4);
  randomChosenColour= buttonColours[randomnumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


  playsound(randomChosenColour);

}






$(document).keydown(function(event)
{

  if(!started)
  {
    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }

});



$(".btn").click(function()
{


  var userChosenColour = $(this).attr("id");

  playsound(userChosenColour);

  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function playsound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour)
{

  var self=$("#"+currentColour);
  self.addClass("pressed");

  setTimeout(function(){
        self.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextsequence();
      }, 1000);

    }

  } else {

    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
          $("body").removeClass("game-over");
      }, 200);
    $("h1").text(" Game over, Press Any Key to Restart");
    startOver();

  }
}

function startOver()
{
  level=0;
  gamePattern=[];
  started = false;

}
