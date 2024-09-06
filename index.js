
var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];

var userClickedPattern=[];

var level=0;

$("body").keydown(function(){
    if(level==0)
    {
    nextSequence();
}
});

function nextSequence(){
    level++;
    $(".title").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).addClass("flash");
setTimeout(function(){
    $("#"+randomChosenColour).removeClass("flash");
    ps(randomChosenColour);
},150);

}

$(".box").click(function(){
    var userChosenColour=($(this).attr("id"));
    ps(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);

    var glen=gamePattern.length;
    var flag=0;
        if(comp(userClickedPattern.length))
        {
            flag=0;
        }
        else{
            $("body").addClass("bgred");
            setTimeout(function(){$("body").removeClass("bgred");},300);
            ps("wrong");
            level=0;
            $(".title").text("Game Over, Press any Key to Start.");
            gamePattern=[];
            userClickedPattern=[];
            flag=1;
        }
        if(userClickedPattern.length==gamePattern.length && flag!=1)
        {
            userClickedPattern=[];
            setTimeout(function(){nextSequence();},1250);
        }
});


function comp(len){
    for(var i=0;i<len;i++)
    {
        if(userClickedPattern[i]!=gamePattern[i]) return false;
    }
    return true;
}

function ps(val){
    switch(val){
        case "green": var audio=new Audio('./green.mp3');
        audio.play();
        break;
        case "red": var audio=new Audio('./red.mp3');
        audio.play();
        break;
        case "blue": var audio=new Audio('./blue.mp3');
        audio.play();
        break;
        case "yellow": var audio=new Audio('./yellow.mp3');
        audio.play();
        break;
        default: var audio=new Audio('./wrong.mp3');
        audio.play();
    }
}

function animatePress(col){
    $("#"+col).addClass("pressed");
    setTimeout(function(){
        $("#"+col).removeClass("pressed");
    },100);
}

