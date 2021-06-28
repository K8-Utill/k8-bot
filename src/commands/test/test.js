const Command = require("../../structures/Command.js");

module.exports = class Test extends Command {
  constructor() {
    super({
      name: "test"
    })
  }

  run() {
    return "test"
  }
}