

const gameBoard = (() => {
    let board = [];
    
    let counter;
    const container = document.querySelector(".game");



const clearBoard = () => {
    board = [];
    
  while (container.lastElementChild) {
    container.removeChild(container.lastElementChild);
  }
} 
const setBoard = (size = 3, count = 3) => {
     
    if(size < 3){size = 3};
    for(let i = 0; i < size; i++){
        let arr = [];
        
        for(let j = 0; j < size; j++){
            arr.push("-");
        }
        board.push(arr);
        counter = count
    }

    
    
    let frac = "";
    for(let i = 0; i < size; i++){
            
        for (let j = 0; j < size; j++) {
            let grid = document.createElement("div");
            
            grid.classList.add(`box${i}${j}`);
            grid.classList.add("box");
            
            grid.addEventListener("click", function(){
                let that = this;
                mark(tic.getCurr().move(), that);
            });
           ;
            container.appendChild(grid);
        }
    
    }
    
        for(let k = 0; k < size; k++){
            frac += "1fr "; 
        }
        container.style.cssText = `grid-template-columns: ${frac}`;
    
    
};

    

    const getBoard = () => board;

    

    const _winVert = (marker) => {

        
        for(let i = 0; i < board.length; i++){
            let tally = 0;
           
            for(let j = 0; j < board.length; j++){
                
                if(board[j][i] === marker ){
                    tally++;
                }
                }
            if(tally === counter){return true;}
            }
        return false;
    };
    
    const _winHor = (marker) => {
        for(let i = 0; i < board.length; i++){
            let tally = 0;
           
            for(let j = 0; j < board.length; j++){
                
                if(board[i][j] === marker ){
                    tally++;
                }
                }
            if(tally === counter){return true;}
            }
        return false;
    };

    const _winDiagLeft = (marker) => {
        let tally = 0;
        for (let i = 0; i < board.length; i++) {
            if(board[i][i] === marker){
                tally++
            }
            if(tally === counter){return true;}
        }
        return false;
    };

    const _winDiagRight = (marker) => {
        let tally = 0;
        let j = board.length - 1;
        for (let i = 0; i < board.length; i++) {
            if(board[i][j] === marker){
                tally++
                j--;
                
            }
            if(tally === counter){return true;}
            
        }
        return false;
    };

    const win = (marker) => {
       
        if(_winVert(marker) || _winHor(marker) || _winDiagLeft(marker) || _winDiagRight(marker))
            
        {
            
        return true;}

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
            
            tic.test(marker);
            
            return true;
        }
        console.log("This spot is taken!");
        return false;
    }




return {setBoard, getBoard, win, render, tie, clearBoard};
})();



const Playa = (marker, name = "John Doe") => {
    
    
    const setMarker = (mark) =>{
        marker = mark;
    };
    
    const move = () => marker;
    const setName = (nam) => name = nam;
    const getName = () => name; 
    return {getName,setMarker, move, setName };
};

const tic = (() => {
    let gb = gameBoard;
    let player = [];
    let current;

    const initiate = () => {
        let button = document.querySelector(".start");
        button.addEventListener("click", _clearGame);
        gb.setBoard();
        _addPlayer();
        gb.render();
        setCurr();

    }
    const getPlayer = () => {
        return `player1: ${player[0].getName()} \n player2: ${player[1].getName()}`;
    };

    const _addPlayer = () => {
        let player1Name = prompt("Player1 enter your name!");
        let player2Name = prompt("Player2 enter your name");
        const player1 = Playa("X", player1Name);
        const player2 = Playa("O", player2Name);
        player.push(player1);
        player.push(player2);

    };

    const setCurr = () => {
        if(current === player[0]){
            current = player[1];
        }
        else{
            current = player[0];
        }
    }
    const getCurr = () => current;

    const _clearGame = () => {
       
        gb.clearBoard();
        current = null;
        gb.setBoard();
        gb.render();
        setCurr();
    }

    const test = (x) => {
        gb.render();
        
        
        if(gb.win(x)){
            
            alert(`${getCurr().getName()} is the winner!`)
        }
        else if(gb.tie(x)){
            alert("tie game");
        }
        else{
            setCurr();
        }
    };
    
    return {test, setCurr, getPlayer, getCurr, initiate}

})();

tic.initiate();

    
    
   
    



