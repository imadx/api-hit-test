## Usage 

Use the following to hit the service

```bash
curl -X POST -d '{"location": "/app/home", "queryStrings": { "user_id":  "001" }}'  -H "Content-Type: application/json" 'https://api-hit-test.herokuapp.com/events'
```

And monitor the hits on
```
https://api-hit-test.herokuapp.com/
```