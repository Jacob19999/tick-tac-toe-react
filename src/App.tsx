import { useState } from "react";
import "./styles.css";
import { confirmAlert } from "react-confirm-alert"; // Import

type player = {
  id: number;
  name: string;
  score: number;
  symbol: string;
};

type box = {
  id: string;
  boxInput: string;
};

const size = 3;
const boxArrayInitial: box[] = [
  { id: "R0C0", boxInput: "" },
  { id: "R0C1", boxInput: "" },
  { id: "R0C2", boxInput: "" },
  { id: "R1C0", boxInput: "" },
  { id: "R1C1", boxInput: "" },
  { id: "R1C2", boxInput: "" },
  { id: "R2C0", boxInput: "" },
  { id: "R2C1", boxInput: "" },
  { id: "R2C2", boxInput: "" },
];

const userInitial: player[] = [
  { id: 0, name: "Jacob", score: 0, symbol: "X" },
  { id: 1, name: "Kelly", score: 0, symbol: "O" },
];

export default function App() {
  const [boxArray, setBoxArray] = useState<box[]>(boxArrayInitial);
  const [players, SetPlayers] = useState<player[]>(userInitial);
  const [currentPlayer, SetCurrentUser] = useState<player>(userInitial[0]);

  const handleResetBoard = () => {
    console.log("Reset");
    SetCurrentUser(userInitial[0]);
    setBoxArray(boxArrayInitial);
  };

  const handleOnClick = (inBox: box) => {
    // Updates the state of the box boxArray
    const index = boxArray.findIndex((box) => box.id === inBox.id);
    let newBoxArr = [...boxArray];

    // Change the state of the box array , updates game board
    if (newBoxArr[index].boxInput === "") {
      if (index !== -1) {
        newBoxArr[index].boxInput = currentPlayer.symbol;
        setBoxArray(newBoxArr);
      }

      // If user Wins
      if (CheckWinner(boxArray)) {
        const index = players.findIndex(
          (player) => player.id === currentPlayer.id
        );

        // Resets the board adds score and provide an alert
        if (index !== -1) {
          const newPlayers = [...players];
          newPlayers[index].score = newPlayers[index].score + 1;
          SetPlayers(newPlayers);
          WinAlert(currentPlayer, handleResetBoard);
        }
      } else {
        // If no win, game continues, Switches the user
        if (currentPlayer.name === userInitial[0].name) {
          SetCurrentUser(userInitial[1]);
        } else {
          SetCurrentUser(userInitial[0]);
        }
      }
    }
  };

  return (
    <div className="App">
      <div className="gamegrid-container">
        <RenderPlayers currPlayer={currentPlayer} />
        <RenderGrid boxes={boxArray} handleOnClick={handleOnClick} />
      </div>
    </div>
  );
}

const WinAlert = (player: player, handleResetBoard: any) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      function fireEvents() {
        onClose();
        handleResetBoard();
      }
      return (
        <div className="custom-ui">
          <h1>Player {player.name} wins!</h1>
          <button onClick={fireEvents}>Play Again</button>
        </div>
      );
    },
  });
};

const CheckWinner = (boxArray: box[]) => {
  // Check Horizontal for win
  for (let i = 0; i < 3; i++) {
    const j = i * 3;
    if (
      boxArray[j].boxInput !== "" &&
      boxArray[j + 1].boxInput !== "" &&
      boxArray[j + 2].boxInput !== ""
    ) {
      if (
        boxArray[j].boxInput === boxArray[j + 1].boxInput &&
        boxArray[j + 1].boxInput === boxArray[j + 2].boxInput
      ) {
        return true;
      }
    }
  }

  // Check Vertical for win
  for (let i = 0; i < 3; i++) {
    if (
      boxArray[i].boxInput !== "" &&
      boxArray[i + 3].boxInput !== "" &&
      boxArray[i + 6].boxInput !== ""
    ) {
      if (
        boxArray[i].boxInput === boxArray[i + 3].boxInput &&
        boxArray[i + 3].boxInput === boxArray[i + 6].boxInput
      ) {
        return true;
      }
    }
  }

  // Check Diagonal
  if (
    boxArray[0].boxInput !== "" &&
    boxArray[4].boxInput !== "" &&
    boxArray[8].boxInput !== ""
  ) {
    if (
      boxArray[0].boxInput === boxArray[4].boxInput &&
      boxArray[4].boxInput === boxArray[8].boxInput
    ) {
      return true;
    }
  }

  // Check Diagonal 2
  if (
    boxArray[2].boxInput !== "" &&
    boxArray[4].boxInput !== "" &&
    boxArray[6].boxInput !== ""
  ) {
    if (
      boxArray[2].boxInput === boxArray[4].boxInput &&
      boxArray[4].boxInput === boxArray[6].boxInput
    ) {
      return true;
    }
  }
  return false;
};

function RenderPlayers({ currPlayer }: { currPlayer: player }) {
  const renderPlayer = (player: player) => {
    return (
      <li
        key={player.id}
        className={
          currPlayer.name === player.name ? "active-player" : "inactive-player"
        }
      >
        <div className="player-display">
          {player.name} | {player.score}
        </div>
      </li>
    );
  };

  return (
    <ul className="player-container">
      {userInitial.map((player) => renderPlayer(player))}
    </ul>
  );
}

function RenderGrid({
  boxes,
  handleOnClick,
}: {
  boxes: box[];
  handleOnClick: any;
}) {
  const gridBox = (box: box) => {
    return (
      <li key={box.id} className="grid-Box" onClick={() => handleOnClick(box)}>
        <h1 className="box-display">{box.boxInput}</h1>
      </li>
    );
  };

  return <ul className="game-grid">{boxes.map((item) => gridBox(item))}</ul>;
}
