const kate = require('kate-sleep')

exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send('You forgot a color for kate')

  const forKate = args.slice(0).join(' ')
  const request = await kate.color(forKate);
  if (!request) return message.channel.send('A error happened'); // if the request some how went wrong

  return message.channel.send(`Sent **${forKate}** to kate!`)
}