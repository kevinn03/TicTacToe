

const gameBoard = (() => {
    let board = [];
    let dimension;
    let counter;
    
    const container = document.querySelector(".game");


const getDimension = () => dimension;

const getCounter = () => counter;

const clearBoard = () => {
    board = [];
    while (container.lastElementChild) {
    container.removeChild(container.lastElementChild);
  }
}; 

const setBoard = (size = 3, count = 3) => {
     
    if(size <= 3){
        size = 3;
        count = 3;
    }
    
    if(count > size){
        count = size;
    }
    
    counter = count;
    dimension = size;
    
    for(let i = 0; i < size; i++){
        let arr = [];
        for(let j = 0; j < size; j++){
            arr.push("-");
        }
        board.push(arr);
    }

    for(let i = 0; i < size; i++){
        for (let j = 0; j < size; j++) {
            let grid = document.createElement("div");
            grid.classList.add(`box${i}${j}`);
            grid.classList.add("box");
            container.appendChild(grid);
        }
    }
    
    let frac = "1fr ";
    container.style.cssText = "grid-template-columns:" + frac.repeat(size);
};

    const getBoard = () => board;

    const _winVert = (marker) => {

        for(let i = 0; i < board.length; i++){
            let tally = 0;
           for(let j = 0; j < board.length; j++){
                if(board[j][i] === marker ){
                    tally++;
                    if(tally >= counter){return true;}
                }
                else{
                    tally = 0;
                }
            }
            
        }
        return false;
    };
    
    const _winHor = (marker) => {
        for(let i = 0; i < board.length; i++){
            let tally = 0;
           for(let j = 0; j < board.length; j++){
                if(board[i][j] === marker ){
                    tally++;
                    if(tally >= counter){return true;}
                 }
                else{
                    tally = 0;
                }
            }
            
        }
        return false;
    };

    const _winDiagLeft = (marker) => {
        let tally = 0;
        for (let i = 0; i < board.length; i++) {
            if(board[i][i] === marker){
                tally++
                if(tally >= counter){return true;}
            }
            else{
                tally = 0;
            }
        }
        return false;
    };

    const _winDiagRight = (marker) => {
        let tally = 0;
        let j = board.length - 1;
        for (let i = 0; i < board.length; i++) {
            if(board[i][j] === marker){
                tally++
                if(tally >= counter){return true;}
                j--;
            }
            else{
                tally = 0;
                j--
            }
            
            
        }
        return false;
    };

    const win = (marker) => {
       if(_winVert(marker) || _winHor(marker) || _winDiagLeft(marker) || _winDiagRight(marker)){
            return true;
        }
        return false;
    }

    const tie = () => {
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board.length; j++){
                if(board[i][j].includes("-")){
                    return false;
                }
            }
        }
        return true;
        
    };

    const render = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                let square = document.querySelector(`.box${i}${j}`);
                square.textContent = board[i][j];
            }   
        }
    }

    const _valid = (x, y) => {
        
        if(board[x][y] === "-"){
            return true;
        }
        alert("this spot is taken");
        return false;
    };

    function mark(marker, attach) {
        
        let x = attach.classList[0].slice(-2,-1) * 1;
        let y = attach.classList[0].slice(-1) * 1;
        
        if(_valid(x,y)){
           if(marker === "X"){
               attach.classList.add("xmark");
           }
           else{
               attach.classList.add("omark");
           }
            board[x][y] = marker;
            return true;
        }
        console.log("This spot is taken!");
        return false;
    }

return {setBoard, getBoard, win, render, tie, clearBoard, getDimension, getCounter, mark};
})();



const Playa = (marker, name = "John Doe") => {
    
    const setMarker = (mark) =>{
        marker = mark;
    };
    const move = () => marker;
    const setName = (nam) => {
        if(nam === null || nam === ""){
        name = "John Doe";}
        else{
            name = nam;
        }
    }
    const getName = () => name; 
    return {getName,setMarker, move, setName };
};


const Tic = (() => {
    let gb = gameBoard;
    let player = [];
    let current;

    const initiate = () => {
        let button = document.querySelector(".start");
        button.addEventListener("click", _clearGame);
        let size = prompt("Choose size of the board!") * 1;
        let winCond = prompt("Choose how many in a row to win") * 1;
        gb.setBoard(size, winCond);
        _addPlayer();
        setCurr();
        _event();
        gb.render();

    };
    
    const getPlayer = () => {
        return `player1: ${player[0].getName()} \n player2: ${player[1].getName()}`;
    };

    const _addPlayer = () => {
        let player1Name = prompt("Player1 enter your name!");
        let player2Name = prompt("Player2 enter your name");
        const player1 = Playa("X",);
        player1.setName(player1Name);

        const player2 = Playa("O",);
        player2.setName(player2Name);
        player.push(player1);
        player.push(player2);

    };

    /*  Handles the board click
        validates the chosen square
        if valid marks the board through the gameboard mark function
    */
    const _event = () => {
        let grid = document.querySelectorAll(".box");
        
        grid.forEach((box) => {
            box.addEventListener("click", function(){
                let that = this;
                let currentMarker = getCurr().move();
                if(!gb.win(currentMarker)){
                    let marked = gb.mark(currentMarker, that);
                    if (marked){
                    _checkForWin(currentMarker);
                    }
                }
                
                })
            }
        )
    };

    const setCurr = () => {
        if(current === player[0]){
            current = player[1];
        }
        else{
            current = player[0];
        }
    };

    const getCurr = () => current;

    const _clearGame = () => {
       let display = document.querySelector(".winner");
       if(display !== null){
        display.remove();
       }
        gb.clearBoard();
        current = null;
        gb.setBoard(gb.getDimension(), gb.getCounter());
        _event();
        gb.render();
        setCurr();
    };

    const _displayW = () => {
        let display = document.createElement("div");
        let game = document.querySelector(".btn");
        display.classList.add("winner");
        game.appendChild(display);
        display.textContent = `${getCurr().getName()} is the winner!`

    };

    const _checkForWin = (x) => {
        gb.render();
        
        
        if(gb.win(x)){
            _displayW();
            
        }
        else if(gb.tie(x)){
            alert("tie game");
        }
        else{
            setCurr();
        }
    };
    
    return {setCurr, getPlayer, getCurr, initiate}

})();

Tic.initiate();