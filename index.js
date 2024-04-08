const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // Parsing request URL
    const parsedUrl = url.parse(req.url, true);

    const parsedReq = {
        path: parsedUrl.pathname,
        method: req.method.toLowerCase(),
        headers: req.headers,
        queryStringObject: parsedUrl.query
    };

    // Remove the leading slash (/) from the path
    parsedReq.timmedPath = parsedReq.path.replace(/^\//, '');

    // Sending response
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`
    Path: ${parsedReq.path}
    Timmed Path: ${parsedReq.timmedPath}
    Method: ${parsedReq.method}
    Headers: \n${JSON.stringify(parsedReq.headers, null, 2)}
    Query Object: \n${JSON.stringify(parsedReq.queryStringObject, null, 2)}
    `);
});

server.listen(3000, () => console.log("Listening on port 3000"));
