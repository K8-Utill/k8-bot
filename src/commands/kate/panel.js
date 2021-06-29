const kate = require('kate-sleep');

module.exports = class Say extends require('../../structures/Command.js') {
	constructor() {
		super({
			name: 'panel',
			description: 'Get a panel!',
			botPerms: ['EMBED_LINKS'],
		});
	}

	async run({ args }) {
		if (!args[0]) return 'You need to pass a panel id';
		const panelId = args[0];
		const panels = await kate.layout();
		const res = await kate.getColor(panelId);
		if (!panels.successful) return panels.message;
		if (!res.successful) return res.message;
		const panel = panels.message.positionData.filter(p => p.panelId === parseInt(panelId))[0];
		const embed = {
			title: `Panel ${panelId}`,
			description: `panel id: ${panel.panelId}\nR: ${res.message.r}\nG: ${res.message.g}\nB: ${res.message.b}\nx position: ${panel.x}\ny position: ${panel.y}\nshape type: ${panel.shapeType}`,
		};
		return { embed };
	}
};
