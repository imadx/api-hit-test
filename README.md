## Usage 

Use the following to hit the service

```bash
curl -X POST -d '{"data": 123, "asdf": 123123}'  -H "Content-Type: application/json" 'http://localhost:3030/events'
```

And monitor the hits on
```
https://api-hit-test.herokuapp.com/
```