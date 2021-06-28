const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

exports.run = (client, message, args) => {
//your code here
// make the event handler
  fetch('https://kate.rest/state')
    .then(r => r.json())
    .then(j => { 
      const embed = new MessageEmbed()
        .setTitle('Kate status')
        .setColor(j.color)
        .setThumbnail("https://raw.githubusercontent.com/K8-Utill/logo/main/k8.png")
        .setDescription(`**Color:** ${j.color}\n**Last text said:** ${j.lastText}\n**Is sleeping:** ${j.isSleeping}`);
      return message.channel.send(embed)
    })
};