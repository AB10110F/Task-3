"use strict";
import { Rules } from "./rules.mjs";
import { Key } from "./key.mjs";
import { HMAC } from "./HMAC.mjs";
import { Table } from "./table.mjs";
import readlineSync from "readline-sync";

function receiveMoves(argv) {
  const args = argv.slice(2);
  return args;
}

function printMoves(moves) {
  console.log("Available moves:\n");
  moves.map((move, index) => {
    console.log(`${index + 1} - ${move}`);
  });
  console.log("0 - exit\n? - help")
}

function valUniq(moves) {
  const set = new Set(moves);
  return set.size === moves.length;
}

function main() {
  const moves = receiveMoves(process.argv);
  const flag = valUniq(moves);
  let input = null
  let count = 0

  if (moves.length > 2 && moves.length % 2 != 0 && flag === true) {

    const key1 = new Key()
    key1.genKey();
    const k = key1.getKey()
    const hmac1 = new HMAC(k, moves)
    const h = hmac1.genH();
    console.log(`HMAC: ${h}`)

    do {
      if (count > 0) {
        console.log("\nOption unavailable. Choose Again")
      }
      printMoves(moves);
      input = readlineSync.question('\nEnter your move: ');
      if (input == "?") {
        console.log("This are the possible cases:")
        const t = new Table(moves)
        console.log(t.genTable());
        console.log("Note: this cases are from the point of view of the player")
      }
      else if (input == 0) {
        console.log("Ending Game")
        process.exit();
      }
      count++
    } while (!(input >= 0 && input < moves.length + 1))

    console.log(`Your Move: ${moves[input - 1]}`)
    const cm = hmac1.getM();

    const rules1 = new Rules(moves, input, cm);
    console.log(`Computer Move: ${moves[cm]}`)
    console.log(rules1.checkWinner());
    console.log(`HMAC Key: ${k}\n`)
  }
  else {
    console.log("Invalid input. You need to enter an odd amount of different moves\ne.g. Rock Paper Scissors\nYou can also try with 5, 7, 9, etc moves as long as they are odd and different between them");
  }
}

main()
