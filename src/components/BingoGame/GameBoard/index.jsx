import React from "react";

const GameBoard = ({constants}) => {
    return (
        <div >
            {constants.map(({ value, selected }, index) => {
                return console.log(index, value, selected);
            })}
        </div>
    );
};

export default GameBoard;
