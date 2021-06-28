const fetch = require('node-fetch')

module.exports = class Status extends require('../../structures/Command.js') {
  constructor () {
    super({ 
      name: 'status',
      description: 'Gets the status of kate',
      botPerms: ["EMBED_LINKS"],
     })
  }

  async run({ message }) {
    let embed = {
      title: 'Kates status',
      thumbnail: {
        url: 'https://raw.githubusercontent.com/K8-Utill/logo/main/k8.png'
      }
    }

    await fetch('https://kate.rest/state')
      .then(r => r.json())
      .then(j => {
        embed.description = `**Color:** ${j.color}\n**Last text said:** ${j.lastText}\n**Is sleeping:** ${j.isSleeping}`
        embed.color = j.color
      })
    return {embed}
  }
}
