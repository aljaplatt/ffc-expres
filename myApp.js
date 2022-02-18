var express = require("express");
let bodyParser = require("body-parser");

var app = express();
// console.log("Hello World");
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const { method, path } = req;
  const ip = "127.0.0.1";
  console.log(`${method} ${path} - ${ip}`);
  next();
});

// app.use("/public", express.static(__dirname + "/public"));

//Build an echo server, mounted at the route GET /:word/echo. Respond with a JSON object, taking the structure {echo: word}. You can find the word to be repeated at req.params.word. You can test your route from your browser's address bar, visiting some matching routes, e.g. your-app-rootpath/freecodecamp/echo.
app.get("/:word/echo", (req, res) => {
  res.json({
    echo: req.params.word,
  });
});

// Get Query Parameter Input from the Client
// http://localhost:3000/name?first=Alex&last=Platt

app.get("/name", (req, res) => {
  res.json({
    name: `${req.query.first} ${req.query.last}`,
  });
});

app.post("/name", (req, res) => {
  // console.log(req.body);
  res.json({
    name: `${req.body.first} ${req.body.last}`,
  });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
  app.use(express.static(__dirname + "/public"));
});
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  }
  res.json({ message: "Hello json" });
});
module.exports = app;

/**
 * Earlier, you were introduced to the express.static() middleware function. Now it’s time to see what middleware is, in more detail. Middleware functions are functions that take 3 arguments: the request object, the response object, and the next function in the application’s request-response cycle. These functions execute some code that can have side effects on the app, and usually add information to the request or response objects. They can also end the cycle by sending a response when some condition is met. If they don’t send the response when they are done, they start the execution of the next function in the stack. This triggers calling the 3rd argument, next().
 * 
 * Let’s suppose you mounted this function on a route. When a request matches the route, it displays the string “I’m a middleware…”, then it executes the next function in the stack. In this exercise, you are going to build root-level middleware. As you have seen in challenge 4, to mount a middleware function at root level, you can use the app.use(<mware-function>) method. In this case, the function will be executed for all the requests, but you can also set more specific conditions. For example, if you want a function to be executed only for POST requests, you could use app.post(<mware-function>). Analogous methods exist for all the HTTP verbs (GET, DELETE, PUT, …).

Build a simple logger. For every request, it should log to the console a string taking the following format: method path - ip. An example would look like this: GET /json - ::ffff:127.0.0.1. Note that there is a space between method and path and that the dash separating path and ip is surrounded by a space on both sides. You can get the request method (http verb), the relative route path, and the caller’s ip from the request object using req.method, req.path and req.ip. Remember to call next() when you are done, or your server will be stuck forever. Be sure to have the ‘Logs’ opened, and see what happens when some request arrives.
 * 
 */

app.get(
  "/now",
  (req, res, next) => {
    // req obj property time. get time from server new Date - convert to string
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({
      time: req.time,
    });
  }
);
