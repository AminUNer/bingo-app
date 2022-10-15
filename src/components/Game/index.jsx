import React from "react";

const Game = ({constants}) => {
    return (
        <div >
            {constants.map(({ value, selected }, index) => {
                return console.log(index, value, selected);
            })}
        </div>
    );
};

export default Game;
