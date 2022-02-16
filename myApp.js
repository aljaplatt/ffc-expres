var express = require("express");
var app = express();

/**
 * You can respond to requests with a file using the res.sendFile(path) method. You can put it inside the app.get('/', ...) route handler. Behind the scenes, this method will set the appropriate headers to instruct your browser on how to handle the file you want to send, according to its type. Then it will read and send the file. This method needs an absolute file path. We recommend you to use the Node global variable __dirname to calculate the path like this:

absolutePath = __dirname + relativePath/file.ext

Send the /views/index.html file as a response to GET requests to the / path. If you view your live app, you should see a big HTML heading (and a form that we will use later…), with no style applied.
 */

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  // res.send('Hello Express')
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;

/**
 * Let's create a simple API by creating a route that responds with JSON at the path /json. You can do it as usual, with the app.get() method. Inside the route handler, use the method res.json(), passing in an object as an argument. This method closes the request-response loop, returning the data. Behind the scenes, it converts a valid JavaScript object into a string, then sets the appropriate headers to tell your browser that you are serving JSON, and sends the data back. A valid object has the usual structure {key: data}. data can be a number, a string, a nested object or an array. data can also be a variable or the result of a function call, in which case it will be evaluated before being converted into a string.
 *
 * *
 */

app.get("/json", (req, res) => {
  res.json({
    message: "Hello json",
  });
});
