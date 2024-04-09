const http = require('http');
const url = require('url');

const handlers = {};

handlers.newbies = (res) =>{
    res.end(`Hello newbies Route`);
}

handlers.notFound = (res) => {
    res.writeHead(404);
    res.end(`Route does not exist...`);
}

const routes = {
    'newbies': handlers.newbies
}

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

        const routeHandler = typeof(routes[parsedReq.timmedPath]) !== 'undefined' ? routes[parsedReq.timmedPath] : handlers.notFound;

        routeHandler(res);
    });
});

server.listen(3000, () => console.log("Listening on port 3000"));
