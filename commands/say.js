const kate = require('kate-sleep')

exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send('You forgot to say something to kate')

  const forKate = args.slice(0).join(' ')
  const request = await kate.say(forKate);
  if (!request) return message.channel.send('A error happened'); // if the request some how went wrong

  return message.channel.send(`Sent **${forKate}** to kate!`)
}