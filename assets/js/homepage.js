// A function to retrieve repo information from GitHub
var getUserRepos = function(user) {
    // Format the GitHub API URL for the fetch function
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // Make a request to the URL.  If the reponse is okay, the data is displayed, otherwise, the error is displayed in an alert
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });           
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        // chain an error catch onto the .then() for network errors
        alert("Unable to connect to GitHub");
    })
};

// A variable to define a language element for the featured repo search
var languageButtonsEl = document.querySelector("#language-buttons")

// A function to handle the language button clicks
var buttonClickHandler = function(event) {
    var language = event.target.getAttribute("data-language");
    // if a language is selected, clear out old content and get the featured repos (asynchonous event, so order doesn't matter in the if)
    if (language) {
        getFeaturedRepos(language);
        repoContainerEl.textContent = "";
    }
};

// A function to retrieve featured repos for a specified language
var getFeaturedRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data.items, language);
            })
        } else {
            alert("Error: " + response.statusText);
        }
    })
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
    // check if the API returned any repos; if not, display a message
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    // loop over the repos
    for (var i=0; i < repos.length; i++) {
        // format the repo name from the JSON data object
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        // create a link container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
        // create a span element to hold the repository name and add the name from imported data
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        // append the information to the container element
        repoEl.appendChild(titleEl);
        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
        // check if the current repo has issues or not
        if (repos[i].open_issues_count > 0 ) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        // append the status to the container
        repoEl.appendChild(statusEl);
        // append the container to the DOM
        repoContainerEl.appendChild(repoEl);
    };
};

// Event listener for form submittal
userFormEl.addEventListener("submit", formSubmitHandler);

// Event listener for the language select button search
languageButtonsEl.addEventListener("click", buttonClickHandler);