// A function to retrieve repo information from GitHub
var getUserRepos = function(user) {
    // Format the GitHub API URL for the fetch function
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // Make a request to the URL
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayRepos(data, user);
        });
});
};

// Variables for user name search form
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

// Form Submit Handler Function
var formSubmitHandler = function(event) {
    // prevent the submit default action of submitting the information to a URL
    event.preventDefault();
    // get value from the input element
    var username = nameInputEl.value.trim();
    // call the function to retrieve the repo list of the user and reset the input value
    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    // alert if a user name was not entered
    } else {
        alert("Please enter a GitHub username");
    }
};

// Variables for displaying the repo list in the DOM
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// Function to display repos on the html page
var displayRepos = function(repos, searchTerm) {
    // clear out old content
    repoContainerEl.textContent = "";
    // add the user name that was entered to the heading
    repoSearchTerm.textContent = searchTerm;
    // loop over the repos
    for (var i=0; i < repos.length; i++) {
        // format the repo name from the JSON data object
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // create a span element to hold the repository name and add the name from imported data
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        // append the information to the container element
        repoEl.appendChild(titleEl);
        // append the container to the DOM
        repoContainerEl.appendChild(repoEl);
    };
};

// Event listener for form submittal
userFormEl.addEventListener("submit", formSubmitHandler);