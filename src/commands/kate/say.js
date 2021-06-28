const kate = require('kate-sleep')

module.exports = class Say extends require('../../structures/Command.js') {
  constructor() {
    super({
      name: 'say',
      description: 'Send a message to Kate!',
      botPerms: ['EMBED_LINKS']
    })
  }

  async run({ message, args }) {
    if (!args[0]) return "You forgot a message to say for Kate"

    const forKate = args.slice(0).join(' ')
    const res = await kate.say(forKate)
    if (!res) return "A error happened"
    return `Sent **${forKate}** to Kate!`
  }
}