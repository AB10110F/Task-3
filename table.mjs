"use strict";
import AsciiTable from "ascii-table";
export class Table {

  constructor(m) {
    this.m = m;
  }

  genTable() {
    const table = new AsciiTable();
    const wo = (this.m.length - 1) / 2;
    const cases = []

    cases[0] = "Draw";

    for (let i = 1; i < this.m.length; i++) {
      if (i <= wo) {
        cases[i] = "Win";
      }
      else {
        cases[i] = "Lose";
      }
    }

    table
      .setBorder('│', '─')
      .setJustify()
      .setHeading("PC\\User", ...this.m)
    for (let i = 0; i < this.m.length; i++) {
      table.addRow(this.m[i], ...cases)
      cases.unshift(cases.pop());
    }

    return table.toString()
  }

}
