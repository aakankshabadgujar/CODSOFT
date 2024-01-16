var origBoard;
const human = 'O';
const ai ='X';
const winnerComb = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4, 8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8,]
]
const cells = document.querySelectorAll('.cell');
startGame();
function startGame() {
document.querySelector('.endgame').style.display = "none";
origBoard = Array.from(Array(9).keys());
for(var i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick , false);

}

}
function turnClick(square){
    if(typeof origBoard[square.target.id] == 'number'){
        turn(square.target.id, human)
        if(!checkTie()) turn(bestSpot(), ai);
    }
   
}
function turn(squareid, player){
    origBoard[squareid] = player;
    document.getElementById(squareid).innerText = player;
    let win = checkWin(origBoard, player);
    if(win) over(win)
}
function checkWin(board, player){
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a , []);
    let win = null;
    for(let [index, won] of winnerComb.entries()){
        if(won.every(elem => plays.indexOf(elem) > -1)){
            win = {index: index, player: player};
            break;
        }
    }
        return win;
}
function over(win){
      for(let index of winnerComb[win.index]){
        document.getElementById(index).style.backgroundColor =
        win.player == human ? "blue" : "red";
      }
      for(var i = 0; i < cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false);
      }
      declareWinner(win.player == human ? "You win! " : "You lose!") ;
}

function emptySquares(){
    return origBoard.filter(s => typeof s == 'number');
}
function bestSpot(){

    return minimax(origBoard, ai).index;
}
function checkTie(){
    if(emptySquares().length == 0){
        for(var i = 0; i < cells.length; i++){
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);

        }
        declareWinner("Tie Game!")
        return true;
    }
    return false;
}
function declareWinner(who){
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;

}
function minimax(newBoard, player){
    var availSpots = emptySquares(newBoard);
    if(checkWin(newBoard, player)){
        return {score: -10};
    } else if(checkWin(newBoard, ai)){
        return{score: 20};
    }else if(availSpots.length === 0){
        return {score: 0};
    }
    var moves = [];
    for(var i = 0; i < availSpots.length; i++){
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;
        if(player == ai){
            var result = minimax(newBoard, human);
            move.score = result.score;
        }else{
            var result = minimax(newBoard, ai);
            move.score = result.score;
        }
        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }
    var bestMove;
    if(player == ai){
        var bestScore = -10000;
        for(var i = 0; i < moves.length; i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    else{
        var bestScore = 10000;
        for(var i = 0; i < moves.length; i++){
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}