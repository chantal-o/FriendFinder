// Dependencies
var app = express();
var PORT = process.env.PORT || 3000;

// middleware for data inputs
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//built-in middleware function for static files
app.use(express.static("./app/public"));

// Require routes 
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

// Initiate server 
app.listen(PORT, function() {
    console.log("Application listening on PORT: " + PORT);
});