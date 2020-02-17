## Usage

Use the following to hit the service

```bash
curl -X POST -d '{"location": "/app/home", "queryStrings": { "user_id":  "001" }}'  -H "Content-Type: application/json" 'https://api-hit-test.herokuapp.com/events'
```

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

And monitor the hits on

```
https://api-hit-test.herokuapp.com/
```
