const gameBoard = (() => {
    let board = [];
    let player = [];


    const setBoard = (size) => {
        for(let i = 0; i < size; i++){
            
            let arr = [];
            for(let j = 0; j < size; j++){
                arr.push("-");
            }
            board.push(arr);
        }


    };

    const getBoard = () => {
        let copyBoard = board.slice();
        return copyBoard;
    };

    const addPlayer = (player) => {
        if(gameBoard.player.includes(player) === false){
            board.push(player);
            return true;
        }
        return false;
    };

    const _winVert = () => {

    };

    const _winHor = () => {

    };

    const _winDiag = () => {

    };

    const win = () => {

        

        if(_winVert() || _winHor() || _winDiag()){
            return true;
        }

        
            return false;
        
    }

    const _tie = () => {

    };

    const render = () => {

    }


return {setBoard, getBoard, addPlayer, win};
})();