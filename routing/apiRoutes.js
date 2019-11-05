// Require friends.js file to access friends array
var friends = require("../app/data/friends");


// Export api routes as a function that takes in express app as a parameter
module.exports = function(app) {
    
    // GET route for api page that displays friends array
    app.get("/api/friends", function(req, res) {
        return res.json(friends)
    });

    // POST route to add user's data to friends array and find best match
    app.post("/api/friends", function(req, res) {

        // Store user's survey data in newFriend variable
        var newFriend = req.body;

        console.log(newFriend);

        // Store array of user's survey scores in newFriendScores variable
        var newFriendScores = req.body.scores;      

        // Summation function to be used later with reduce method
        const add = (a, b) => a + b;        

        // Loop through friends array
        for(var i = 0; i < friends.length; i++) {

            // Store each friend's scores array in a variable
            let friendScores = friends[i].scores;

            let diffArray = [];

            // Loop through each friend's scores array
            for(var j = 0; j < friendScores.length; j++) {
                // And find difference between each friend's score and new user's score at each index
                // Get absolute value of difference so there will be no negative values
                let diff = Math.abs(friendScores[j] - parseInt(newFriendScores[j]));
                
                // Push each difference into empty array
                diffArray.push(diff);
            }

            // Use reduce method with summation function from above to add up all of the differences between friend's scores and new user's scores
            let totalDifference = diffArray.reduce(add)

            // Make the total difference between friend and user scores a new property in each friend object so it can be tracked
            friends[i].totalDifference = totalDifference;
        }

        console.log(friends);
        
        var findMatchArr = []

        // Loop through updated friends array and push the values of the total difference properties into an empty array
        for(var i = 0; i < friends.length; i++) {
            findMatchArr.push(friends[i].totalDifference);
        }
        
        // Use a sort function to loop over array containing total differences and locate smallest number
        // The index of the smallest number will also be the index of the friend who is the most compatible match
        var index = 0; 
        var value = findMatchArr[0];
        for(var i = 1; i < findMatchArr.length; i++) {
            if(findMatchArr[i] < value) {
                value = findMatchArr[i];
                index = i;
            }
        }
        
        console.log(value, index)

        // Send JSON response to client side that contains the object data of the most compatible friend
        res.json(friends[index]);

        // Push new user's data object into friends array
        friends.push(newFriend);
    });
}
