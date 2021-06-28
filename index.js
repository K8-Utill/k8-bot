//Defining
const Discord = require('discord.js');
const path = require('path');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
require('dotenv').config()

//Code
client.config = config

/* Load all events */
fs.readdir("./events/", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Event loaded: ${eventName}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = new Discord.Collection();

/* Load all commands */
fs.readdir("./commands/", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log(`Command loaded: ${commandName}`);
  });
});

fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err) // we wanna log this, useful for debugging;
  for (let file of files) {
    if (!file.includes(".js")) return;
    
  }
})
// i dont see a chat lmfao 


client.login(process.env.token)

//WebServiceBuildProvider
const express = require('express')
const app = express()
const port = 3000

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname+'/html/index.html'));
    })
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
