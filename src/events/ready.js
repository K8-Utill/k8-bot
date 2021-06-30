const Websocket = require('../Websocket');

module.exports = class ready {
	constructor(client) {
		this.client = client;
	}
	run() {
		console.log('this is a test to see if any of this stupid fucking shit works');
		this.handleSocket();
	}

	async handleSocket() {
		const socket = new Websocket();
		const sendTo = await this.client.channels.cache.get('856252141844561960');
		socket.on('colorUpdate', e => {
			const embed = {
				title: 'Color update!',
				fields: [],
			};
			e.forEach(panel => embed.fields.push({ name: `Panel ${panel.panelId}:`, value: `R: ${panel.r}\nG: ${panel.g}\nB: ${panel.b}`, inline: true }));
			sendTo?.send({ embed });
		});
		socket.on('layoutUpdate', e => {
			const embed = {
				title: 'Layout update!',
				fields: [],
			};
			e.positionData.forEach(panel =>
				embed.fields.push({
					name: `Panel ${panel.panelId}`,
					value: `x position: ${panel.x}\ny position: ${panel.y}\no: ${panel.o}\npanel shape type: ${panel.shapeType}`,
					inline: true,
				})
			);
			sendTo?.send({ embed });
		});
	}
};
