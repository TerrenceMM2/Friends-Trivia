$(document).ready(function () {

    loadQuestions();

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
        bamboozled();
    });

    $(".answer").on("click", function () {
        clearInterval(intervalID);
        var answerBoolean;
        var answerBoolean = $(this).data("value");
        console.log("click answer value", answerBoolean, typeof answerBoolean);
        showResult(answerBoolean);
        questionsAsked++;
    });

    $(".restart").on("click", function () {
        questionsAsked = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        loadQuestions();
        showQuestion();
        resetResult();
        stopMusic();
        bamboozled();
        $("#end-screen").fadeOut().hide();
        $("#question-container").fadeIn().show();
    });

    // Start Game screen fades out; Questions screen fades in
    function startGame() {
        $("#start").fadeOut().hide();
        $("#question-container").fadeIn().show();
    };

    // Initial function for the "Start Game" button
    function showQuestion() {
        startInterval();
        resetQuestion();
        $("#timer").text(timer);
    };

    // Pulls out a question from the questionArray.
    // Displays text from the question object pulled and sets the true/false data value to each HTML "#answer" element.
    function randomQuestion() {
        var randomQuestionIndex = Math.floor(Math.random() * questionArray.length); // 1
        var randomQuestion = questionArray.splice(randomQuestionIndex, 1);
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

    // Resets the timer's color (if changed) and removes the previous questions data attribute.
    // Resets timer to 30 seconds and stages a new random question.
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

    // Determine if the answer selected was correct, incorrect (based on data values), or answered (if no answer was selected before time ran out) and sets Result screen text and random Gif.
    function showResult(boolean) {
        if (boolean) {
            console.log("showResult true");
            correctAnswers++
            var randomGif = Math.floor(Math.random() * correctGif.length);
            var gifUrl = "assets/images/" + correctGif[randomGif];
            $(".result-text").text("Correct!");
            $(".result-text").attr("id", "correct");
            $("#gif").attr("src", gifUrl);
        } else if (boolean === false) {
            console.log("showResult false");
            incorrectAnswers++
            var randomGif = Math.floor(Math.random() * incorrectGif.length);
            var gifUrl = "assets/images/" + incorrectGif[randomGif];
            $(".result-text").text("Wrong!");
            $(".result-text").attr("id", "incorrect");
            $("#gif").attr("src", gifUrl);
        } else {
            console.log("showResult undefined");
            questionsAsked++;
            unanswered++
            var randomGif = Math.floor(Math.random() * unansweredGif.length);
            var gifUrl = "assets/images/" + unansweredGif[randomGif];
            $(".result-text").text("Out of time!");
            $(".result-text").attr("id", "");
            $("#gif").attr("src", gifUrl);
        };
        resetQuestion();
        stopInterval();
        clearTimeout();
        setTimeout(nextQuestion, 5000);
        $("#question-container").fadeOut().hide();
        $("#result-container").fadeIn().show();
    };

    // Resets the Results screen text and gif to blank
    function resetResult() {
        $(".result-text").attr("id", "");
        $("#gif").attr("src", "");
    };

    // Determines if the max number of questions was asked (10). If not, the next random question is shown.
    function nextQuestion() {
        if (questionsAsked === 10) {
            endGame();
            clearInterval(intervalID);
        } else {
            clearInterval(intervalID);
            startInterval();
            $("#result-container").fadeOut().hide();
            $("#question-container").fadeIn().show();
            resetResult();
        };
    };

    function startInterval() {
        clearInterval(intervalID);
        intervalID = setInterval(countDown, 1000);
    };

    function stopInterval() {
        clearInterval(intervalID);
    }

    // Decrements timer variable. Adds styling if less than 10 and less than 5 seconds.
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

    // Called if the number of questionsAsked === 10. Starts music, stages number totals, fades out Results screen and fades in the End (Totals) screen.
    function endGame() {
        startMusic();
        $("#number-correct").text(correctAnswers);
        $("#number-incorrect").text(incorrectAnswers);
        $("#number-unanswered").text(unanswered);
        $("#result-container").fadeOut().hide();
        $("#end-screen").fadeIn().show();
    };

    // Called when "Start Game" or "Play Again?" is clicked.
    function bamboozled() {
        audio = document.getElementById("start-sound");
        audio.play();
    }

    // Start music bed on the End screen.
    function startMusic() {
        audio = document.getElementById("music-bed");
        audio.currentTime = 0;
        audio.volume = 0.5;
        audio.loop = true;
        audio.play();
    }

    // Stops music when "Play Again?" is clicked.
    function stopMusic() {
        audio = document.getElementById("music-bed");
        audio.pause();
    }

});