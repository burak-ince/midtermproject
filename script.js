document.addEventListener("DOMContentLoaded", function () {
    // Get form and submit button elements
    var form = document.querySelector("form");
    var submitButton = document.getElementById("submitButton"); // Corrected the button selection

    // Fetch data for the City dropdown
    fetchAndPopulateDropdown("https://run.mocky.io/v3/3c63ff2f-b5b8-48f2-9ccd-c69d2f71f71b", "city");

    // Fetch data for the Course Type dropdown
    fetchAndPopulateDropdown("https://run.mocky.io/v3/15816ef3-c746-45aa-8083-eb8a37ec89dd", "course");

    // Add a click event listener to the submit button
    submitButton.addEventListener("click", function (event) {
        // Validate email
        if (!isValidInput("email", isValidEmail, "Please enter a valid email address.")) {
            event.preventDefault();
            return;
        }

        // Validate phone number
        if (!isValidInput("number", isValidPhoneNumber, "Please enter a valid Turkish phone number.")) {
            event.preventDefault();
            return;
        }

        // Validate city
        if (!isValidSelection("city", "Please select a City.")) {
            event.preventDefault();
            return;
        }

        // Validate courseType
        if (!isValidSelection("course", "Please select a Course Type.")) {
            event.preventDefault();
            return;
        }

        // If all validations pass, submit the form
        form.submit();
    });

    // Function to validate email address
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to validate Turkish phone number
    function isValidPhoneNumber(number) {
        // Assuming Turkish phone numbers start with +90 and have 10 digits
        var phoneRegex = /^\+90\d{10}$/;
        console.log(number);(number);
        return phoneRegex.test(number);
    }

    // Function to fetch data from API and populate dropdown
    function fetchAndPopulateDropdown(apiUrl, elementId) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => populateDropdown(elementId, data));
    }

    // Function to validate input based on validation function
    function isValidInput(inputId, validationFunction, errorMessage) {
        var input = document.getElementById(inputId);
        if (!validationFunction(input.value)) {
            alert(errorMessage);
            return false;
        }
        return true;
    }

    // Function to validate dropdown selection
    function isValidSelection(elementId, errorMessage) {
        var dropdown = document.getElementById(elementId);
        if (!dropdown.value) {
            alert(errorMessage);
            return false;
        }
        return true;
    }

    // Function to populate dropdown
    function populateDropdown(elementId, data) {
        var dropdown = document.getElementById(elementId);

        // Check if data is an array or an object with a named key
        var dataArray = Array.isArray(data) ? data : data[elementId];

        // Check if dataArray is an array
        if (Array.isArray(dataArray)) {
            dataArray.forEach(item => {
                var option = document.createElement("option");
                option.value = item;
                option.text = item;
                dropdown.add(option);
            });
        } else {
            console.error("Invalid data structure. Expected an array.");
        }
    }
});
