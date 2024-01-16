# laboratory-api
First, make sure to have node installed on your computer (except if you use docker-compose. In that case, you don't need Node installed).

To run the server on localhost, use the following command:
```
node src/server.js
```
This will execute the server on the port 80.
You can access all the routes in your browser in "http://localhost/" or just "localhost".

It's recommended the use of Postman Desktop for testing purposes.

If you want to use Docker Compose instead of the node command, you can use the following command:
```
docker-compose up --build -d
```

Be sure of be working on a separate branch before pushing to main ;)
