"use strict";
import crypto from "crypto";
export class HMAC {
  #key
  #move

  constructor(key, m) {
    this.#key = key;
    this.m = m;
    const l = m.length;
    this.#move = Math.floor(Math.random() * l);
  }

  genH() {
    const hmac = crypto.createHmac("sha256", this.#key);
    const s = String(this.#move);
    hmac.update(s);
    const hmacDigest = hmac.digest("hex");
    return hmacDigest;
  }

  getM() {
    return this.#move;
  }
}
