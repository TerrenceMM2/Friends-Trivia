# coursework5-trivia-game  
Vanderbilt Coding Boot Camp - Coursework 5 - Trivia Game  
Live Link: https://terrencemm2.github.io/coursework5-trivia-game/  
  
## Instructions  
1. Click "Start Game" to begin.  
2. You have 30 seconds to answer each question.  
3. After 10 questions, the game is over.  
    * Your answer totals will be shown.  
4. Click "Play Again?" to being a new game.  

### Pseudocode  
1. User clicks "start" to begin `startGame()`   
2. First question is displays  
    * Randomize question  
    * Randomize answer placement  
    * 30 second timer starts  
    `setInterval()` 
3. User selects an answer  
    `swtich(expression) { case x: break; case y: break; }`  
    * Shows image/gif depending on answer  
4. After x seconds, the next question is displays
    `setTimeout()`  
5. After x questions, user is shown total number of correct/incorrect  
    * Music plays  
6. Button is shown to play again  
