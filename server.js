// Dependency for express module and setting up express app
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware used to interpret form data coming from client
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("./app/public"));

// Require route js files and pass express app to them
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

// Initiate server to begin listening
app.listen(PORT, function() {
    console.log("Application listening on PORT: " + PORT);
});