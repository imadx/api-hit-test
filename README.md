## Usage

Use the following to hit the service

### cURL

```bash
curl -X POST -d '{"location": "/app/home", "queryStrings": { "user_id":  "001" }}'  -H "Content-Type: application/json" 'https://api-hit-test.herokuapp.com/events'
```

### Browser/Console

```es6
let data = {
	location: '/app/home',
	queryStrings: { user_id: '001' }
};

await fetch('https://api-hit-test.herokuapp.com/events', {
	body: JSON.stringify(data),
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json'
	},
	method: 'POST'
});
```

### NodeJS

```es6
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

emitStats({
	location: '/app/home',
	queryStrings: { user_id: '001' }
});
```

And monitor the hits on

```
https://api-hit-test.herokuapp.com/
```
