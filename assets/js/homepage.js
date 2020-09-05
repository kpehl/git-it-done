// A function to retrieve repo information from GitHub
var getUserRepos = function(user) {
    // Format the GitHub API URL for the fetch function
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // Make a request to the URL
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
});
};
