module.exports = class Help extends require("../../structures/Command.js") {
  constructor() {
      super({
          name: "help",
          aliases: ["?"],
          botPerms: ["EMBED_LINKS"]
      })
  }

  run({
      message,
      args,
      client
  }) {

    if (!args[0]) {
      let groups = [];
      client.commands.forEach((command) => {
          if (!groups.includes(command.help.category.toLowerCase())) {
              groups.push(command.help.category.toLowerCase());
          }
      })

      let embed = {
          title: "Commands",
          fields: [],
      }

      groups.sort().forEach((group) => {
          embed.fields.push({
              name: group.split("")[0].toUpperCase() + group.split("").slice(1).join("").toLowerCase(),
              value: `\`${client.commands.filter((f) => f.help.category.toLowerCase() === group && f.config.enabled).map((command) => command.help.name).join("`, `")}\``
          })
      })

      return {
          embed
      }
    } else {
      if (client.commands.has(args[0].toLowerCase()) || client.aliases.has(args[0].toLowerCase())) {
        var Command = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));

        return {
          embed: {
            title: Command.help.name,
            fields: [{name: "Description", value: Command.help.description}]
          }
        }
      } else {
        return `Command \`${args[0]}\` does not exist!`
      }

    }

  }
}