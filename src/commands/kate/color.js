const kate = require('kate-sleep');

module.exports = class Say extends require('../../structures/Command.js') {
	constructor() {
		super({
			name: 'color',
			description: 'Send a color to Kate with a hex color!',
			botPerms: ['EMBED_LINKS'],
		});
	}

	async run({ args }) {
		if (!args[0]) return 'You need to pass a panel id';
		if (!args[1]) return 'You need to pass a hex value';
		const panelId = args[0],
			hex = args[1],
			rgb = hexToRgb(hex);
		const res = await kate.color(rgb, panelId);
		if (!res.successful) return 'A error happened';
		return `Set panel ${panelId} to **${hex}**!`;
	}
};

function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: null;
}
