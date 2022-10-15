import React from "react";
import './index.css';

const GameBoard = ({constants, select}) => {
    return (
        <div className="game-board">
            {constants.map(({ value, selected }, index) => (
                <button
                    key={`${value}-${selected}`}
                    name={`${value}-${selected}`}
                    className={`cell ${selected ? "selected" : ""}`}
                    onClick={() => select(index)}
                >
                    <span className="number">{index + 1}</span>
                    <span>{value}</span>
                </button>
            ))}
        </div>
    );
};

export default GameBoard;
