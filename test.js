const https = require('https');

const emitStats = (data = {}) => {
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
		res.on('data', d => {
			process.stdout.write(d);
		});
	});

	req.on('error', e => {
		throw new Error(e);
	});

	req.write(postData);
	req.end();
};

emitStats({ test: '123123' });
