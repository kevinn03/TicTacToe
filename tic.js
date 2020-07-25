/*const tic = ((gameBoard) => {



})();
*/
const gameBoard = (() => {
    let board = [];
    let player = [];
    let current;
    const container = document.querySelector(".game");


    const setCurr = () => {
        if(current === player[0]){
            current = player[1];
        }
        else{
            current = player[0];
        }
    }
const setBoard = (size = 3) => {
    if(size < 3){size = 3};
    for(let i = 0; i < size; i++){
        let arr = [];
        
        for(let j = 0; j < size; j++){
            arr.push("-");
        }
        board.push(arr);
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
    };

    const getPlayer = () => player;

    const getBoard = () => board;

    const addPlayer = (person) => {
        if(player.includes(person) === false){
            player.push(person);
            return true;
        }
        return false;
    };

    const _winVert = (marker) => {

        
        for (let i = 0; i < board.length; i++) {
                
            for(let j = 0; j < board.length; j++){
               if(board[j][i] !== marker){return false;}
            }
            
        }
        return true;
    };

    const _winHor = (marker) => {
        for(let i = 0; i < board.length; i++){
            
           
            for(let j = 0; j < board.length; j++){
                if(board[i][j] !== marker ){return false;}
            }
            
        }
        return true;
    };

    const _winDiagLeft = (marker) => {
        
        for (let i = 0; i < array.length; i++) {
            if(board[i][i] !== marker){return false;}
            
        }
        return true;
    };

    const _winDiagRight = (marker) => {
        
        let j = board.length - 1;
        for (let i = 0; i < array.length; i++) {
            if(board[i][j] !== marker){
                j--;
                return false;}
            
        }
        return true;
    };

    const win = (marker) => {

        if(_winVert(marker) || _winHor(marker) || _winDiagLeft(marker) || _winDiagRight(marker)){return true;}

        return false;
    }

    const tie = () => {
        if(!board.includes("-")){
        return true;}
        
        return false;
    };

    const render = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                let square = document.querySelector(`.box${i}${j}`);
                square.textContent = board[i][j];
            
            }   
            
        }

    }

    function mark() {
        let x = this.classList[0].slice(-2,-1) * 1;
        let y = this.classList[0].slice(-1) * 1;
        
        if(board[x][y] === "-"){
            board[x][y] = current.move();
            render();
            return true;
        }

        return false;
    }




return {setBoard, getBoard, addPlayer, win, render, tie, setCurr, getPlayer, player};
})();



const Playa = (name) => {
    let marker = "";
    
    const setMarker = (mark) =>{
        marker = mark;
    };
    const move = () => marker;
    const setName = (nam) => name = nam;
    const getName = () => name; 
    return {getName,setMarker, move, setName };
};

window.onload = function(){
    
    
   
    gameBoard.setBoard();
    gameBoard.render();

}

