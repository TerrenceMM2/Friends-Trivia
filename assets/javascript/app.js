$(document).ready(function() {

var questions = {
    1 : {
        question: "What is the name of the coffee shop the friends hang out at?",
        1: "Central Perk",
        2: "Starbucks",
        3: "Central Joe's",
        4: "Coffee Corner"
    },
    2 : {
        question: "Who was Ross' first wife?",
        1: "Emily",
        2: "Rachel",
        3: "Susan",
        4: "Carol"
    } 
}

var correctGif = ["correct1.gif", "correct2.gif", "correct3.gif", "correct4.gif", "correct5.gif", "correct6.gif", "correct7.gif", "correct8.gif", "correct9.gif", "correct10.gif", "correct11.gif", "correct12.gif", "correct13.gif", "correct14.gif", "correct15.gif"];
var incorrectGif = ["incorrect1.gif", "incorrect2.gif", "incorrect3.gif", "incorrect4.gif", "incorrect5.gif", "incorrect6.gif", "incorrect7.gif", "incorrect8.gif", "incorrect9.gif", "incorrect10.gif", "incorrect11.gif", "incorrect12.gif", "incorrect13.gif", "incorrect15.gif", "incorrect15.gif"];
var questionsAsked = 0;

$(".start").on("click", function() {
    startGame();
});

function startGame() {
    $("#start").fadeOut().hide();
    $("#questions").fadeIn().show();
}

});