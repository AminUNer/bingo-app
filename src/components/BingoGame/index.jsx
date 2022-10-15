import React, {useEffect, useState} from "react";
import shuffle from "shuffle-array";
import quotes from "../../constants/quotes";
import GameBoard from "./GameBoard";
import './index.css';

function BingoGame() {
    const [gameConstants, setGameConstants] = useState([]);
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
        setGameConstants(data);
        setBingoSelector(new Array(12).fill(false));
        setIsWinner(false);
    };

    useEffect(() => {
        initialize();
    }, []);

    const checkWinner = () => {
        console.log(bingoSelector);
        if (!gameConstants.length) return;

        // Test selected ligne
        if (
            gameConstants[0,4].selected &&

            !gameConstants[0]
        ) {
            gameConstants[0] = true;


            setIsWinner(true);
            console.log(gameConstants[0].selected);
            console.log(bingoSelector[0]);
        }

        if (
            gameConstants[5,9].selected &&

            !bingoSelector[1]
        ) {
            bingoSelector[1] = true;
            setIsWinner(true);
        }
        if (
            gameConstants[10,14].selected &&

            !bingoSelector[2]
        ) {
            bingoSelector[2] = true;
            setIsWinner(true);
        }
        if (
            gameConstants[15,19].selected &&

            !bingoSelector[3]
        ) {
            bingoSelector[3] = true;
            setIsWinner(true);
        }

        if (
            gameConstants[20,24].selected &&

            !bingoSelector[4]
        ) {
            bingoSelector[4] = true;
            setIsWinner(true);
        }



        if (gameConstants.every((val) => val.selected === true)) {
            setIsWinner(true);
        }
        // else {
        //    setIsWinner(false);
        // }
    };

    const selectCell = (index) => {
        // if (isWinner) return;
        let newBoard = [...gameConstants];
        newBoard[index].selected = index !== 12 ? !gameConstants[index].selected : true;
        setGameConstants(newBoard);
        checkWinner()
    };

  return (
    <div className="container" >
        {
            isWinner && (
                console.log('WINNER')
            )
        }
      <GameBoard constants={gameConstants} select={selectCell}/>
    </div>
  );
}

export default BingoGame;
