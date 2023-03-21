const express = require('express');

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome!");
});

app.listen(PORT, (error) => {
    if (error) {
        console.log("Server isn't running.");
    } else {
        console.log("Server is running sucessfully.");
    }
})
