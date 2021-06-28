class Message {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    if (message.author.bot || message.channel.type === "dm") return;
    

    // command handling;
    const { prefix, ownerID } = this.client.config;

    if (message.content.startsWith(prefix)) {
      let Command = message.content.split(" ")[0].slice(prefix.length).toLowerCase();
      let Args = message.content.split(" ").slice(1);

      if (this.client.commands.has(Command) || this.client.aliases.has(Command)) {
        Command = this.client.commands.get(Command) || this.client.commands.get(this.client.aliases.get(Command));

        if (!ownerID.includes(message.author.id) && Command.config.developer) {
          message.channel.send({
            embed: {
              title: "You must be a developer to run this command",
              color: 8879851
            }
          })
        } else if (!Command.config.enabled) {
          return;
        } else if (          !Command.config.botPerms.every((perm) =>
        message.guild.member(this.client.user).hasPermission(perm)
      )) {
        message.channel.send(
          `I require \`${Command.config.botPerms
            .filter(
              (perm) =>
                !message.guild.member(this.client.user).hasPermission(perm)
            )
            .map((r) => r.split("_").join(" "))
            .join(", ")}\` permissions`
        );
        } else if(          !Command.config.userPerms.every((perm) =>
        message.member.hasPermission(perm)
        )) {
          message.channel.send(
            `You require \`${Command.config.userPerms
              .filter((perm) => !message.member.hasPermission(perm))
              .map((r) => r.split("_").join(" "))
              .join(", ")}\` permissions`
          );
        } else {
          // run command;
          let res = await Command.run({ client: this.client, message, args: Args });
          if (res) {
            if (typeof res === "string" || typeof res === "object") {
              message.channel.send(res);
            }
          }
      }
      }
    }

  }
}

module.exports = Message