import express from "express";

const server = express();

server.get("/hello", (req, res) => {
    res.send('Hello World!');
});

server.listen(8080, () => {
    console.log('Listening at port 8080');
});