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

// Function to display repos on the html page
var displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);
};

// Event listener for form submittal
userFormEl.addEventListener("submit", formSubmitHandler);