const https = require('https');

const emitStats = (data = {}) => {
	new Promise((resolve, reject) => {
		const postData = JSON.stringify(data);

		const options = {
			hostname: 'api-hit-test.herokuapp.com',
			port: 443,
			path: '/events',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const req = https.request(options, res => {
			console.log('statusCode:', res.statusCode);
			console.log('headers:', res.headers);

			res.on('data', d => {
				process.stdout.write(d);
			});
		});

		req.on('error', e => {
			reject(e);
		});

		req.write(postData);
		req.end();
		resolve();
	});
};

module.exports = emitStats;
