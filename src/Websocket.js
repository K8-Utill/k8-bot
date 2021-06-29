const WebSocket = require('ws');

module.exports = async client => {
	const socket = new WebSocket('wss://kate.rest/control/panels/socket');
	const sendTo = await client.channels.cache.get('856252141844561960');

	socket.on('error', console.log);

	socket.on('message', e => {
		const data = JSON.parse(e);
		const embed = {
			title: `${(data.type === 'layoutUpdate' && 'layout') || (data.type === 'colorUpdate' && 'color')} update!`,
			fields: [],
		};
		if (data.type === 'layoutUpdate')
			data.d.positionData.forEach(panel =>
				embed.fields.push({
					name: `Panel ${panel.panelId}`,
					value: `panel id: ${panel.panelId}\nx position: ${panel.x}\ny position: ${panel.y}\no: ${panel.o}\npanel shape type: ${panel.shapeType}`,
					inline: true,
				})
			);
		else if (data.type === 'colorUpdate')
			data.d.forEach(panel =>
				embed.fields.push({ name: `Panel ${panel.panelId}`, value: `R: ${panel.r}\nG: ${panel.g}\nB: ${panel.b}`, inline: true })
			);

		sendTo?.send({ embed });
	});
};
