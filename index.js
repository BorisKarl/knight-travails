const content = document.getElementById("content");

// content.innerHTML= "MOIN";

class Node {
    constructor(data) {
        this.data = data;
        this.path =[data];
    }
} 

const possibleMoves = ([x, y]) => {
  let array = [];
  for (let i = -2; i < 3; i++) {
    if (i === 0) {
      // array.unshift([x, y]);
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
  // console.log(result);
  return result;
};

// from jotafer19 github
const isVisited = (node, array) => {
  array.forEach((element) => {
    if (element[0] === node.data[0] && element[1] === node.data[1]) return true;
  });
  array.push(node.data);
  return false;
}

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

function getMoves(start, end) {
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
        console.log(`${start}/${end} out of range!`)
        return;
     }
       
  const movePath = knightMoves(start, end).path;
  console.log(
    `You made it in ${movePath.length - 1} moves! Here is your path:`
  );
  movePath.forEach((move) => console.log(move));
}

getMoves([0, 0], [7, 7]);
getMoves([1,1],[5,5]);
getMoves([-1,2],[-5,0]);
// content.textContent(getMoves([0,0], [7,7]));
