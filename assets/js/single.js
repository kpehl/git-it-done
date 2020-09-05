// Define the Issues container element 
var issueContainerEl = document.querySelector("#issues-container");

// Function to get the issues for a given repo from GitHub
var getRepoIssues = function(repo) {
    // format the URL to get the issues
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    // fetch the data, with error handling just as with homepage.js
    fetch(apiUrl)
        .then(function(response) {
            // if the request was successful
            if (response.ok) {
                // parse the data in JSON format
                response.json()
                // and display the data
                .then(function(data) {
                    displayIssues(data);
                });
            // otherwise, display an error message
            } else {
                alert("There was a problem with your request!");
            }
        });
};

// Function to display the issues on the html page
var displayIssues = function(issues) {
    // if there are no open issues, display a message
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (var i=0; i < issues.length; i++) {
        // create a link element to take the user to the issue on GitHub in a new browser tab
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        // create a span to hold the issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        // append the issue title span to the issue container
        issueEl.appendChild(titleEl)
        // create a type element
        var typeEl = document.createElement("span");
        // check if the issue is an issue or if it is a pull request and create a type label
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        // append the type span to the issue container
        issueEl.appendChild(typeEl);
        // append the individual issue container to the issue list on the html page
        issueContainerEl.appendChild(issueEl);
    }
};

getRepoIssues("facebook/react");