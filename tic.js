

const gameBoard = (() => {
    let board = [];
    let player = [];
    let current;
    let counter;
    const container = document.querySelector(".game");


    const setCurr = () => {
        if(current === player[0]){
            current = player[1];
        }
        else{
            current = player[0];
        }
    }
    const getCurr = () => current;

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
            
            grid.addEventListener("click", mark);
           ;
            container.appendChild(grid);
        }
    
    }
    
        for(let k = 0; k < size; k++){
            frac += "1fr "; 
        }
        container.style.cssText = `grid-template-columns: ${frac}`;
    
    _addPlayer();
};

    const getPlayer = () => {
        return `player1: ${player[0].getName()} \n player2: ${player[1].getName()}`;
    };

    const getBoard = () => board;

    const _addPlayer = () => {
        const player1 = Playa("X");
        
        const player2 = Playa("O");
        
        player.push(player1);
        player.push(player2);

    };

    /*const _winVert = (marker) => {

        
        for (let i = 0; i < board.length; i++) {
                
            for(let j = 0; j < board.length; j++){
               if(board[j][i] !== marker){return false;}
            }
            
        }
        return true;
    };
    */
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

    // const _winDiagLeft = (marker) => {
        
    //     for (let i = 0; i < board.length; i++) {
    //         if(board[i][i] !== marker){return false;}
            
    //     }
    //     return true;
    // };

    // const _winDiagRight = (marker) => {
        
    //     let j = board.length - 1;
    //     for (let i = 0; i < board.length; i++) {
    //         if(board[i][j] !== marker){
    //             j--;
    //             return false;}
            
    //     }
    //     return true;
    // };

    const win = (marker) => {
       
        // if(_winVert(marker) || _winHor(marker) || _winDiagLeft(marker) || _winDiagRight(marker))
            if(_winHor(marker))
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
//console.log(`board: ${board[i][j]} marker: ${marker}`);

    function mark() {
        let x = this.classList[0].slice(-2,-1) * 1;
        let y = this.classList[0].slice(-1) * 1;
        
        if(board[x][y] === "-"){
            console.log(board[x][y]);
            board[x][y] = current.move();
            console.log(board[x][y]);
            tic.test(current.move());
            
            return true;
        }

        return false;
    }




return {setBoard, getBoard, win, render, tie, setCurr, getPlayer, getCurr};
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
    let running = true;
    const start = () => {
        gb.setBoard();
    
        gb.render();
        gb.setCurr();


    };

    const test = (x) => {
        gb.render();
        
        
        if(gb.win(x)){
            
            alert(`${gb.getCurr} is the winner!`)
        }
        else if(gb.tie(x)){
            alert("tie game");
        }
        else{
            gb.setCurr();
        }
    };
    
    return {start, test}

})();

tic.start();

    
    
   
    



