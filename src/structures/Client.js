const { Client, Collection } = require("discord.js");
const config = require("../../config.json");
const { readdir } = require("fs");
module.exports = class Kate extends Client {
  constructor(options = {}) {
    super(options)
    this.commands = new Collection();
    this.aliases = new Collection();

    this.config = config;
  }



  loadCommand(file) {
    if(file.includes(".json")) return;
    if (!file.includes(".js")) {
      readdir(`./src/commands/${file}`, (err, files) => {
        if (err) console.error(err);
        for (let file2 of files) {
          this.loadCommand(`${file}/${file2}`)
        }
      })
    } else {
      console.log(file);
      if (file.includes("asset.")) return;
      try {
        const Command = new (require(`../commands/${file}`))();
        this.commands.set(Command.help.name, Command);
        Command.config.aliases.forEach((alias) => this.aliases.set(alias, Command.help.name))

      } catch (e) {
        console.error(e);
      }
    }
  }
}