const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("X-Powered-By", "NodeJS");

  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end("<h1>Welcome to Homepage</h1>");
    } else {
      response.statusCode = 400;
      response.end(`<h1>This page can't access with ${method} request</h1>`);
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end("<h1>Welcome to About Page</h1>");
    } else if (method === "POST") {
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.statusCode = 200;
        response.end(`<h1>Hello, ${name}! This is About Page</h1>`);
      });
    } else {
      response.statusCode = 400;
      response.end(`<h1>This page can't access with ${method} request</h1>`);
    }
  } else {
    response.statusCode = 400;
    response.end("<h1>Halaman tidak ditemukan!</h1>");
  }

  // if (method === "GET") {
  //   response.end("<h1>You're doing GET!</h1>");
  // } else if (method === "POST") {
  //   let body = [];

  //   request.on("data", (chunk) => {
  //     body.push(chunk);
  //   });

  //   request.on("end", () => {
  //     body = Buffer.concat(body).toString();
  //     const { name } = JSON.parse(body);
  //     response.end(`<h1>Hello, ${name}!</h1>`);
  //   });
  // } else if (method === "PUT") {
  //   response.end("<h1>You're doing PUT!</h1>");
  // } else if (method === "DELETE") {
  //   response.end("<h1>You're doing DELETE!</h1>");
  // } else {
  //   response.end("<h1>Failed action</h1>");
  // }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server run at http://${host}:${port}`);
});
