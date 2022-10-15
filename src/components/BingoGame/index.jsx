import React, {useCallback, useEffect, useState} from "react";
import shuffle from "shuffle-array";
import quotes from "../../constants/quotes";
import GameBoard from "./GameBoard";
import './index.css';

function BingoGame() {
    const [board, setBoard] = useState([]);
    const [isWinner, setIsWinner] = useState(false);
    const [bingoSelector, setBingoSelector] = useState([]);

    const initialize = () => {
        let data = shuffle(quotes);
        data = [...[...data].splice(0, 12), `🍻 BINGO 🍻`, ...[...data].splice(12)];
        data = data.reduce(
            (data, value, index) => [
                ...data,
                { value, selected: index === 12 },
            ],
            []
        );
        setBoard(data);
        setBingoSelector(new Array(12).fill(false));
        setIsWinner(false);
    };

    useEffect(() => {
        initialize();
    }, []);

    const triggerVictory = useCallback(
        () => {
            setIsWinner(true);
            setTimeout(() => setIsWinner(false), 2000);
        },
        [],
    );
    
    const checkWinner = () => {
        // console.log(bingoSelector);
        if (!board.length) return;

        //  Select diagonal with bingoSelector 10
        if (!bingoSelector[10]) {
            let j = 0;
            while (j <= 24 && board[j].selected) {
                j += 6;
            }
            if (j === 30) {
                bingoSelector[10] = true;
                triggerVictory();
            }
        }
        //  Select diagonal with bingoSelector 11
        if (!bingoSelector[11]) {
            let j = 4;
            while (j <= 20 && board[j].selected) {
                j += 4;
            }
            if (j === 24) {
                bingoSelector[11] = true;
                triggerVictory();
            }
        }

        for (let i = 0; i < 5; i++) {
            //  Select from column
            if (!bingoSelector[i + 5]) {
                let j = i;
                while (j <= i + 20 && board[j].selected) {
                    j += 5;
                }
                if (j === i + 25) {
                    bingoSelector[i + 5] = true;
                    triggerVictory();
                }
            }
            //  Select from row
            if (!bingoSelector[i]) {
                let j = i * 5;
                while (j <= i * 5 + 4 && board[j].selected) {
                    j++;
                }
                if (j === i * 5 + 5) {
                    bingoSelector[i] = true;
                    triggerVictory();
                }
            }
        }
        //  Set Victory "you won"
        if (board.every((val) => val.selected === true)) {
            setIsWinner(true);
        }
    };

    const selectCell = (index) => {
        // if (isWinner) return;
        let newBoard = [...board];
        newBoard[index].selected = index !== 12 ? !board[index].selected : true;
        setBoard(newBoard);
        checkWinner()
    };

  return (
    <div className="container" >
        {
            isWinner && (
                <img
                    className="winner-gif"
                    src="https://media3.giphy.com/media/t2sKa4JKNW9DawxAYi/giphy.gif?cid=790b76118fa06a57ca932261ed49e803d67b4dc6ce100df2&rid=giphy.gif&ct=g"
                    alt="Cheers"
                    width="500"
                />
            )
        }
      <GameBoard constants={board} select={selectCell}/>
    </div>
  );
}

export default BingoGame;
