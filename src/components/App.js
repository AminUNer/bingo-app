import React, {useEffect, useState} from "react";
import shuffle from "shuffle-array";
import Game from "./Game";
import quotes from "../constants/quotes";

function App() {
    const [gameConstants, setGameConstants] = useState([]);

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
    };

    useEffect(() => {
        initialize();
    }, []);

  return (
    <div className="App">
      <Game constants={gameConstants} />
    </div>
  );
}

export default App;
