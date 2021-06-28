const kate = require('kate-sleep')

module.exports = class Say extends require('../../structures/Command.js') {
  constructor() {
    super({
      name: 'color',
      description: 'Send a color to Kate!',
      botPerms: ['EMBED_LINKS']
    })
  }

  async run({ message, args }) {
    if (!args[0]) return "You forgot a color for Kate"

    const forKate = args.slice(0).join(' ')
    const res = await kate.color(forKate)
    if (!res) return "A error happened"
    return `Sent **${forKate}** to Kate!`
  }
}