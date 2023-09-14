const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");

  response.statusCode = 200;
  const { method } = request;

  if (method === "GET") {
    response.end("<h1>You're doing GET!</h1>");
  } else if (method === "POST") {
    let body = [];

    request.on("data", (chunk) => {
      body.push(chunk);
    });

    request.on("end", () => {
      body = Buffer.concat(body).toString();
      const { name } = JSON.parse(body);
      response.end(`<h1>Hello, ${name}!</h1>`);
    });
  } else if (method === "PUT") {
    response.end("<h1>You're doing PUT!</h1>");
  } else if (method === "DELETE") {
    response.end("<h1>You're doing DELETE!</h1>");
  } else {
    response.end("<h1>Failed action</h1>");
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server run at http://${host}:${port}`);
});
