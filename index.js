// Node class for storing the data of the field and the path
class Node {
  constructor(data) {
    this.data = data;
    this.path = [data];
  }
}

const content = document.getElementById("content");

// build an array of possible moves without the starting position
const possibleMoves = ([x, y]) => {
  let array = [];
  for (let i = -2; i < 3; i++) {
    if (i === 0) {
      i++;
    }

    if (i % 2 === 0) {
      let x1 = 0;
      let y1 = 0;
      let y2 = 0;
      x1 = x + i;
      y1 = y - 1;
      y2 = y + 1;
      if (x1 >= 0 && x1 <= 7 && y1 >= 0 && y1 <= 7) {
        array.push([x1, y1]);
      }
      if (x1 >= 0 && x1 <= 7 && y2 >= 0 && y2 <= 7) {
        array.push([x1, y2]);
      }
    } else {
      let x1 = 0;
      let y1 = 0;
      let y2 = 0;
      x1 = x + i;
      y1 = y + 2;
      y2 = y - 2;
      if (x1 >= 0 && x1 <= 7 && y2 >= 0 && y2 <= 7) {
        array.push([x1, y2]);
      }
      if (x1 >= 0 && x1 <= 7 && y1 >= 0 && y1 <= 7) {
        array.push([x1, y1]);
      }
    }
  }

  return array;
};

// build an array with the lenght of 64 and the corresponding possible moves per field
const buildChessArray = () => {
  let result = [];
  let chessBoard = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      chessBoard.push([i, j]);
    }
  }
  chessBoard.forEach((e) => {
    result.push(possibleMoves(e));
  });
  console.log(result);
  return result;
};

// has this field been visited?
const isVisited = (node, array) => {
  array.forEach((element) => {
    if (element[0] === node.data[0] && element[1] === node.data[1]) return true;
  });
  array.push(node.data);
  return false;
};

// here the magic happens
function knightMoves(
  start,
  end,
  queue = [new Node(start)],
  visitedNodes = [start]
) {
  if (start[0] === end[0] && start[1] === end[1]) return queue.shift();

  if (!queue.length) return;

  const currentPosition = queue.shift();

  const currentMoves = possibleMoves(currentPosition.data);

  currentMoves.forEach((zug) => {
    const newPosition = new Node(zug);

    if (!isVisited(newPosition, visitedNodes)) {
      queue.push(newPosition);
      newPosition.path = currentPosition.path.concat(newPosition.path);
    }
  });

  return knightMoves(queue[0].data, end, queue, visitedNodes);
}

// helper function with input check
function getMoves(start, end) {
  const movePath = knightMoves(start, end).path;
  const h2 = document.createElement("h2");
  if (
    start[0] < 0 ||
    start[0] > 7 ||
    start[1] < 0 ||
    start[1] > 7 ||
    end[0] < 0 ||
    end[0] > 7 ||
    end[0] < 0 ||
    end[0] > 7
  ) {
    console.log(`${start}/${end} out of range!`);
    return;
  }

  h2.textContent = `You made it from start [${start}] to [${end}] in ${
    movePath.length - 1
  } moves! Here is your path:`;
  const h3 = document.createElement("h3");
  movePath.forEach((move) => (h3.textContent += `[${move}] `));
  h2.appendChild(h3);
  content.appendChild(h2);

  console.log(
    `You made it in ${movePath.length - 1} moves! Here is your path:`
  );
  movePath.forEach((move) => console.log(move));
}


const start = document.getElementById("start");
const end = document.getElementById("end");
const submitButton = document.getElementById("submitButton");
const input_content = document.querySelector(".input_content");
const reset = document.createElement("button");
reset.textContent = "RESET";
reset.addEventListener("click", () => {
  location.reload();
});

submitButton.addEventListener("click", () => {
  let s = [];
  let e = [];
  s.push(parseInt(start.value[0]), parseInt(start.value[2]));
  e.push(parseInt(end.value[0]), parseInt(end.value[2]));
  input_content.innerHTML = "";
  if (
    parseInt(start.value) < 0 ||
    parseInt(start.value) > 7 ||
    parseInt(end.value) < 0 ||
    parseInt(end.value) > 7
  ) {
    alert("Illegal input");
    location.reload();
    return;
  } else {
    getMoves(s, e);
    content.appendChild(reset);
  }

  // console.log(typeof(s[0]))
});
