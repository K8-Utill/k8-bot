class Command {
  constructor({
    name = "Command",
    description = "None given!",
    usage = "{c}",
    category = "Miscellaneous",
    cooldown = 3000, // my way of implementing cooldowns usually uses a database, but shrug.
    aliases = new Array(),
    botPerms = ["SEND_MESSAGES"],
    userPerms = new Array(),
    nsfw = false,
    developer = false,
    enabled = true,
  }) {
    this.help = {
      name, description, usage, category
    }
    this.config = {
      aliases,
      botPerms,
      userPerms,
      nsfw,
      developer,
      enabled,
      cooldown
    }
  }
}

module.exports = Command;