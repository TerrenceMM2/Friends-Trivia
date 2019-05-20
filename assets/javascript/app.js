$(document).ready(function () {

    var questionArray = [{
            question: "What is the name of the coffee shop the friends hang out at?",
            1: ["Central Perk", true],
            2: ["Starbucks", false],
            3: ["Central Joe's", false],
            4: ["Coffee Corner", false]
        },
        {
            question: "Who was Ross' first wife?",
            1: ["Emily", false],
            2: ["Rachel", false],
            3: ["Susan", false],
            4: ["Carol", true],
        },
        {
            question: "What was the name of Pheobe's hit single?",
            1: ["Pervert Parade", false],
            2: ["Smelly Cat", true],
            3: ["Sticky Shoes", false],
            4: ["Lather, Rinse, Repeat", false]
        }
    ];

    var correctGif = ["correct1.gif", "correct2.gif", "correct3.gif", "correct4.gif", "correct5.gif", "correct6.gif", "correct7.gif", "correct8.gif", "correct9.gif", "correct10.gif", "correct11.gif", "correct12.gif", "correct13.gif", "correct14.gif", "correct15.gif"];
    var incorrectGif = ["incorrect1.gif", "incorrect2.gif", "incorrect3.gif", "incorrect4.gif", "incorrect5.gif", "incorrect6.gif", "incorrect7.gif", "incorrect8.gif", "incorrect9.gif", "incorrect10.gif", "incorrect11.gif", "incorrect12.gif", "incorrect13.gif", "incorrect15.gif", "incorrect15.gif"];
    var unansweredGif = ["unanswered1.gif", "unanswered2.gif", "unanswered3.gif", "unanswered4.gif", "unanswered5.gif"]
    var questionsAsked = 0;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;
    var timer = 30;
    var intervalID;

    $(".start").on("click", function () {
        showQuestion();
        startGame();
    });

    $(".answer").on("click", function () {
        clearInterval(intervalID);
        answerBoolean = $(this).data("value");
        showResult(answerBoolean);
        setTimeout(nextQuestion, 5000);
        clearTimeout();
        stopInterval(); 
    });

    function startGame() {
        $("#start").fadeOut().hide();
        $("#question-container").fadeIn().show();
    };

    function showResult(boolean) {
        console.log(boolean);
        if (boolean) {
            var randomGif = Math.floor(Math.random() * correctGif.length);
            var gifUrl = "assets/images/" + correctGif[randomGif];
            $(".result-text").text("Correct!");
            $(".result-text").attr("id", "correct");
            $("#gif").attr("src", gifUrl);
        } else if (boolean === false) {
            var randomGif = Math.floor(Math.random() * incorrectGif.length);
            var gifUrl = "assets/images/" + incorrectGif[randomGif];
            $(".result-text").text("Wrong!");
            $(".result-text").attr("id", "incorrect");
            $("#gif").attr("src", gifUrl);
        } else {
            var randomGif = Math.floor(Math.random() * unansweredGif.length);
            var gifUrl = "assets/images/" + unansweredGif[randomGif];
            $(".result-text").text("Out of time!");
            $(".result-text").attr("id", "");
            $("#gif").attr("src", gifUrl);
        };
        clearInterval(intervalID);
        setTimeout(nextQuestion, 5000);
        resetQuestion();
        $("#question-container").fadeOut().hide();
        $("#result-container").fadeIn().show();
    };

    function showQuestion () {
        startInterval();
        resetResult();
        randomQuestion();
        $("#timer").text(timer);
    };

    function randomQuestion() {
        var randomQuestionIndex = Math.floor(Math.random() * questionArray.length); // 1
        // var nextIndex = randomQuestionIndex + 1;
        var randomQuestion = questionArray.splice(randomQuestionIndex, 1);
        // intervalID = setInterval(countDown, 1000, 31);
        $("#question").text(randomQuestion[0].question);
        $("#answer1").text(randomQuestion[0][1][0]);
        $("#answer1").attr("data-value", randomQuestion[0][1][1]);
        $("#answer2").text(randomQuestion[0][2][0]);
        $("#answer2").attr("data-value", randomQuestion[0][2][1]);
        $("#answer3").text(randomQuestion[0][3][0]);
        $("#answer3").attr("data-value", randomQuestion[0][3][1]);
        $("#answer4").text(randomQuestion[0][4][0]);
        $("#answer4").attr("data-value", randomQuestion[0][4][1]);
    };

    function resetQuestion() {
        $("#timer").css("color", "");
        $("#answer1").removeAttr("data-value");
        $("#answer2").removeAttr("data-value");
        $("#answer3").removeAttr("data-value");
        $("#answer4").removeAttr("data-value");
        timer = 30; 
        $("#timer").text(timer);
        randomQuestion();
    };

    function resetResult() {
        $(".result-text").attr("id", "");
        $("#gif").attr("src", "");
    };

    function nextQuestion() {
        clearInterval(intervalID);
        startInterval();
        $("#result-container").fadeOut().hide();
        $("#question-container").fadeIn().show();
    };

    function startInterval() {
        clearInterval(intervalID);
        intervalID = setInterval(countDown, 1000);
    };

    function stopInterval () {
        clearInterval(intervalID);
    }

    // Decrements timer variable. Adds styling if less than 10 and less than 5 secions.
    // If the time reaches 0, unanswered value increases by 1.
    function countDown() {
        $("#timer").text(timer);
        if (timer === 0) {
            showResult();
        } else if (timer < 11 && timer > 6) {
            $("#timer").css("color", "#fd7e14")
            timer--;
        } else if (timer < 6) {
            $("#timer").css("color", "#dc3545");
            timer--;
        } else {
            timer--;
        };
        return timer;
    };


        // setInterval to fire "x" number of times.
    // Source: https://stackoverflow.com/questions/2956966/javascript-telling-setinterval-to-only-fire-x-amount-of-times
    // function setInterval(callback, delay, repetitions) {
    //     var x = 0;
    //     var intervalID = window.setInterval(function () {
    //         callback();
    //         if (++x === repetitions) {
    //             window.clearInterval(intervalID);
    //         }
    //     }, delay);
    // };

});