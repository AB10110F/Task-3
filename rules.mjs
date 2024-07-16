"use strict";
export class Rules {

  constructor(moves, userMove, computerMove) {
    this.m = moves;
    this.u = userMove - 1;
    this.c = computerMove;
  }

  setLabel() {
    const wo = (this.m.length - 1) / 2;
    let labels = Array(this.m.length).fill("l");

    for (let i = 0; i <= wo; i++) {
      let index = (this.u - i) % this.m.length;
      if (index < 0) {
        index += this.m.length;
      }
      labels[index] = "w";
    }
    return labels;
  }

  checkWinner() {
    const l = this.setLabel();
    if (this.c === (this.u)) {
      return "Draw";
    }
    else if (l[this.c] === "w") {
      return "You Win";
    }
    else {
      return "Computer Wins";
    }
  }
}
