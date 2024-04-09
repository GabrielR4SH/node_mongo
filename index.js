const http = require('http');
const url = require('url');

const handlers = {};

handlers.newbies = (parsedReq, res) =>{
    const methods = {
        'get': (parsedReq, res) => res.end('GET'),
        'post': (parsedReq, res) => res.end('POST'),
        'put': (parsedReq, res) => res.end('PUT'),
        'delete': (parsedReq, res) => res.end('DELETE'),
    };

    const routeHandler = getMethodHandler(parsedReq.method, methods);
    routeHandler(parsedReq, res);
};

const getMethodHandler = (method, methods) => {
    const acceptedMethods = Object.keys(methods);
    if (acceptedMethods.includes(method)) {
        return methods[method];
    } else {
        return (parsedReq, res) => {
            res.writeHead(400);
            res.end(`Non accepted method...`);
        };
    }
};

handlers.notFound = (parsedReq, res) => {
    res.writeHead(404);
    res.end(`Route does not exist...`);
};

const routes = {
    'newbies': handlers.newbies
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const parsedReq = {
        parsedUrl,
        path: parsedUrl.pathname,
        timmedPath: parsedUrl.pathname.replace(/^\//, ''),
        method: req.method.toLowerCase(),
        headers: req.headers,
        queryStringObject: parsedUrl.query,
    };

    let body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    });

    req.on('end', () => {
        body = Buffer.concat(body).toString();
        parsedReq.body = body;

        const routeHandler = routes[parsedReq.timmedPath] || handlers.notFound;
        routeHandler(parsedReq, res);
    });
});

server.listen(3000, () => console.log("Listening on port 3000"));
