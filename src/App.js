import { useState } from "react";
import "./App.css";
import images from "./components/images";
import { shuffle } from "lodash";

function App() {
  const [cards, setCards] = useState(shuffle([...images, ...images]));
  const [activeCards, setActiveCards] = useState([]);
  const [foundMatches, setFoundMathces] = useState([]);
  const [click, setClick] = useState([]);
  const [won, setWon] = useState(false);

  function flipCard(index) {
    if (won) {
      setWon(false);
      setCards(shuffle([...images, ...images]));
      setFoundMathces([]);
      setClick(0);
    }

    if (activeCards.length === 0) {
      setActiveCards([index]);
    }

    if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondIndex = index;

      if (cards[firstIndex] === cards[secondIndex]) {
        setFoundMathces([...foundMatches, firstIndex, secondIndex]);

        if (foundMatches.length + 2 === cards.length) {
          setWon(true);
        }
      }

      setActiveCards([...activeCards, index]);
    }

    if (activeCards.length === 2) {
      setActiveCards([index]);
    }

    setClick(+click + 1);
  }

  return (
    <div>
      <h1>Memory Game</h1>
      <div className="board">
        {cards.map((card, index) => {
          const flippedToFront =
            activeCards.indexOf(index) !== -1 ||
            foundMatches.indexOf(index) !== -1;
          return (
            <div
              className={"card-outer " + (flippedToFront ? "flipped" : "")}
              onClick={() => {
                flipCard(index);
              }}
            >
              <div className="card">
                <div className="front">
                  <img src={card} alt="picture" />
                </div>
                <div className="back" />
              </div>
            </div>
          );
        })}
      </div>
      <h2>Clicks: {click}</h2>
      {won && alert("You Won The Game!")}
    </div>
  );
}

export default App;
