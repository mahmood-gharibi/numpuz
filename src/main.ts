let tile: Array<any> = [];
let countClick: number = 0;
let timerCount: number = 0;
let gameStart: boolean = false;
let winColor = "#007e25";
let defaultColor = "white";
function init() {
  // tile = []; /
  const table: HTMLTableElement = <HTMLTableElement>(
    document.getElementById("table")
  );
  for (let i = 0; i < 5; i++) {
    let tr: HTMLElement = <HTMLElement>document.createElement("tr");
    for (let j = 0; j < 5; j++) {
      let td: HTMLElement = <HTMLElement>document.createElement("td");
      let index: number = i * 5 + j;
      td.className = "tile";
      td.tabIndex = index;
      td.ariaValueText = index.toString();
      td.onclick = click;
      td.textContent = index == 0 ? "" : index.toString();
      tr.appendChild(td);
      tile.push(td);
    }
    table.appendChild(tr);
  }
  //ChangebtnStart("شروع بازی", defaultColor);
  //newGame()
}

function click(a: any) {
  if (gameStart === true) {
    let i = a.srcElement.tabIndex;

    if (i - 5 >= 0 && tile[i - 5].ariaValueText == 0) {
      swipe(i, i - 5);
    } else if (i + 5 < 25 && tile[i + 5].ariaValueText == 0) {
      swipe(i, i + 5);
    } else if (i % 5 != 0 && tile[i - 1].ariaValueText == 0) {
      swipe(i, i - 1);
    } else if (i % 5 != 4 && tile[i + 1].ariaValueText == 0) {
      swipe(i, i + 1);
    }
  }
}

function swipe(i: number, j: number) {
  let X = tile[i].ariaValueText;
  tile[i].textContent = tile[j].textContent;
  tile[i].ariaValueText = tile[j].ariaValueText;
  tile[j].textContent = X;
  tile[j].ariaValueText = X;

  const Solved = CheckSolve();
  if (Solved === true) {
    gameStart = false;
    ChangebtnStart("آفرین برنده شدی! دوباره امتحان کن!", winColor);
  }

  if (gameStart === true) {
    countClick = countClick + 1;
    ChangeClickCounter(countClick);
  }
}

function ChangeClickCounter(value: number) {
  const ClickCount = <HTMLElement>document.getElementById("ClickCount");
  ClickCount.textContent = value.toString();
}

function ChangetimeCounter(value: number) {
  const ClickCount = <HTMLElement>document.getElementById("timeCounter");
  ClickCount.textContent = value.toString() + " ثانیه";
}

function ChangebtnStart(value: string, color: string) {
  const btnstart = <HTMLElement>document.getElementById("btnStart");
  btnstart.textContent = value;
  btnstart.style.color = color;
}

function CheckSolve(): boolean {
  let Solvestate: boolean = false;
  for (let i = 0; i < 23; i++) {
    let numValue: number = parseInt(tile[i].ariaValueText);

    if (numValue === i + 1) {
      Solvestate = true;
    } else {
      Solvestate = false;

      return Solvestate;
      break;
    }
  }
  return Solvestate;
}

function newGame() {
  gameStart = true;
  for (let i = 0; i < 2000; i++) {
    click({ srcElement: { tabIndex: Math.floor(Math.random() * 25) } });
  }
  countClick = 0;
  timerCount = 0;
  ChangeClickCounter(countClick);
  ChangebtnStart("شروع مجدد", defaultColor);
}

setInterval(function () {
  if (gameStart === true) {
    timerCount = timerCount + 1;
    ChangetimeCounter(timerCount);
  }
}, 1000);
