// Require path core module
var path = require("path");

// Export GET routes as a function that takes in the express app as a parameter
module.exports = function(app) {

    // GET route for survey html page
    app.get("/survey",function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // GET route for home html page
    app.get("*",function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
}