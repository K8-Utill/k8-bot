const Client = require('./structures/Client.js');
const { readdir } = require('fs');
const Kate = new Client();
require('dotenv').config();

Kate.login(process.env.token);

readdir('./src/commands', (err, files) => {
	if (err) console.error(err);
	for (let file of files) {
		Kate.loadCommand(file);
	}
});

readdir('./src/events', (err, files) => {
	if (err) console.error(err);
	files.forEach(file => {
		const eventName = file.split('.')[0];
		const event = new (require('./events/' + file))(Kate);
		Kate.on(eventName, (...args) => {
			event.run(...args);
		});
	});
});
