"use strict";
import crypto from "crypto";

export class Key {
  #key

  constructor() {
    this.#key = "";
  }

  genKey() {
    this.#key = crypto.randomBytes(32).toString('hex');
  }

  getKey() {
    return this.#key;
  }
}
