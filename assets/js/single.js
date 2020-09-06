// Define the issues container element 
var issueContainerEl = document.querySelector("#issues-container");
// Define an element for a pagination limit warning
var limitWarningEl = document.querySelector("#limit-warning");
// Define an element for the page title repo name section
var repoNameEl = document.querySelector("#repo-name")

// Function to get the repo name
var getRepoName = function() {
    // Variable for the query string as taken from the index.html link
    var queryString = document.location.search;
    // Variable for repoName as in homepage.js by splitting the query and taking the portion after the =
    var repoName = queryString.split("=")[1];
    // If a name is supplied, get the issues and populate the page title
    if (repoName) {
        getRepoIssues(repoName);
        repoNameEl.textContent = repoName;
    // otherwise, redirect back to index.html
    } else {
        // alert("A repo name was not provided. Sending you back to home page.")
        document.location.replace("./index.html");
    }
};




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
                    // check to see if there are more than 30 results, i.e. check for paginated issues
                    if (response.headers.get("Link")) {
                        displayWarning(repo);
                    }
                });
            // otherwise, redirect the user to index.html
            } else {
                // alert("There was a problem with your request. Sending you back to home page.")
                document.location.replace("./index.html");
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

// Function to display a pagination warning if there are more than 30 issues
var displayWarning = function(repo) {
    // add text to the element defined at the beginning of the single.js file
    limitWarningEl.textContent = "To see more than 30 issues, visit: "
    // create a link to the repo issue page
    var linkEl = document.createElement("a");
    linkEl.textContent = "More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues")
    linkEl.setAttribute("target", "_blank");
    // append the link to the warning container
    limitWarningEl.appendChild(linkEl);
};

getRepoName();