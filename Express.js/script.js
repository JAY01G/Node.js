const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemp = require("./replce");

let overView = fs.readFileSync(`${__dirname}/template/overview.html`, "utf-8");
let tempProduct = fs.readFileSync(
  `${__dirname}/template/product.html`,
  "utf-8"
);
let card = fs.readFileSync(`${__dirname}/template/card.html`, "utf-8");
// console.log(card);
let data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
// console.log(data);
let dataObj = JSON.parse(data);
// console.log(dataObj);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardHtml = dataObj.map((el) => {
      return replaceTemp(card, el);
    });
    const output = overView.replace("{%PRODUCT_CARDS%}", cardHtml);
    // console.log(cardHtml);
    // res.end(cardHtml);

    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemp(tempProduct, product);
    res.end(output);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening.....");
});
