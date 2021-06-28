const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

exports.run = (client, message, args) => {
//your code here
// make the event handler
  fetch('https://kate.rest/state')
    .then(r => r.json())
    .then(j => { 
      const embed = new MessageEmbed()
        .setTitle('Commands')
        .setColor(j.color)
        .setThumbnail("https://raw.githubusercontent.com/K8-Utill/logo/main/k8.png")
        .setDescription(`List of commands for <@829533541619728385>`)
        .addFields(
            { name: 'Status', value: 'See what has been set for the color and text' },
            { name: 'Say', value: 'Send Kate a message!' },
            { name: 'Color', value: "Set Kate's screen color!" }
        )
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: 'Usage', value: 'How to use the commands' },
            { name: 'Status', value: 'k8..status' },
            { name: 'Say', value: "k8..say (Your Message Here)" },
            { name: 'Color', value: "k8..color (Hex Value)" }
        )
        .setTimestamp()
        .setFooter('This uses the npm package kate-sleep', 'https://raw.githubusercontent.com/K8-Utill/logo/main/k8.png');
      return message.channel.send(embed)
    })
};