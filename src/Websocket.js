const ws = require('ws');

module.exports = class Websocket {
	constructor() {
		this.websocket = new ws('wss://kate.rest/control/panels/socket');
	}
	/**
	 * @param {('layoutUpdate'|'colorUpdate')} event
	 * @param {(...args) => void} listener
	 */

	on(event, listener) {
		this.websocket.on('message', e => {
			const data = JSON.parse(e);
			if (data.type === event) return listener(data.d);
		});
	}
};
