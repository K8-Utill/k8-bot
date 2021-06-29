const kate = require('kate-sleep');

module.exports = class Status extends require('../../structures/Command.js') {
	constructor() {
		super({
			name: 'status',
			description: 'Gets the status of kate',
			botPerms: ['EMBED_LINKS'],
		});
	}

	async run() {
		let embed = {
			title: 'Kates status',
			thumbnail: {
				url: 'https://raw.githubusercontent.com/K8-Utill/logo/main/k8.png',
			},
			fields: [],
		};

		const kateStatus = await kate.kate();
		const layout = await kate.layout();
		if (!layout.successful) return layout.message;
		else if (!kateStatus.successful) return kateStatus.message;
		layout.message.positionData.forEach(panel =>
			embed.fields.push({
				name: `Panel ${panel.panelId}`,
				value: `panel id: ${panel.panelId}\nx position: ${panel.x}\ny position: ${panel.y}\no: ${panel.o}\npanel shape type: ${panel.shapeType}`,
				inline: true,
			})
		);
		embed.description = `Sleeping: ${kateStatus.sleeping}\nNumber of panels: ${layout.message.numPanels}`;
		return { embed };
	}
};
