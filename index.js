const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // Parsing request URL
    const parsedUrl = url.parse(req.url, true);
    const parsedReq = {};

    parsedReq.parsedUrl = url.parse(req.url, true);
    parsedReq.path = parsedReq.parsedUrl.pathname;
    parsedReq.timmedPath = parsedReq.path.replace(/^\//, '');
    parsedReq.method = req.method.toLowerCase();
    parsedReq.headers = req.headers;
    parsedReq.queryStringObject = parsedReq.parsedUrl.query;

    let body = [];

    req.on('data',(chunk) => {
        body.push(chunk);
    });

    req.on('end',() => {
        body = Buffer.concat(body).toString();
        parsedReq.body = body;
        res.end(parsedReq.body);
    });


});

server.listen(3000, () => console.log("Listening on port 3000"));
