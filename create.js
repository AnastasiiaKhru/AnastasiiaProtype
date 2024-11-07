// Function to auto-generate an NCR number following a sequence based on the date
function generateNCRNumber() {
    const currentDate = new Date();
    const yearMonthDay = currentDate.toISOString().slice(0, 10).replace(/-/g, ''); // Format as YYYYMMDD
    let ncrData = JSON.parse(localStorage.getItem('ncrData')) || {};

    // Check if the date exists in localStorage
    if (!ncrData[yearMonthDay]) {
        ncrData[yearMonthDay] = 1; // Starting sequence for the day
    } else {
        ncrData[yearMonthDay] += 1; // Increment the NCR number for the day
    }

    // Update localStorage with the new sequence
    localStorage.setItem('ncrData', JSON.stringify(ncrData));

    // Format the NCR number as YYYYMMDD-NNN
    const ncrNumber = `${yearMonthDay}-${String(ncrData[yearMonthDay]).padStart(3, '0')}`;

    // Set the NCR number in the input field, but make it readonly so it can't be changed
    const ncrInput = document.getElementById('ncrNo');
    ncrInput.value = ncrNumber;
    ncrInput.setAttribute('readonly', 'true'); // Make the input field read-only
}

// Function to save form data to localStorage
function saveFormData() {
    const formData = new FormData(document.getElementById('ncrForm'));
    const ncrData = Object.fromEntries(formData.entries());
    localStorage.setItem('ncrFormData', JSON.stringify(ncrData));
}

// Function to load saved form data from localStorage
function loadSavedData() {
    const savedData = localStorage.getItem('ncrFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        for (const key in formData) {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = formData[key];
            }
        }
    }
}

// Function to handle user session
function loadUserSession() {
    const username = localStorage.getItem('users.username');
    if (username) {
        document.getElementById('user-name').textContent = `Welcome, ${username}`;
    }
}

// Form validation before submission
function validateForm(formData) {
    let isValid = true;
    const requiredFields = ['defectType', 'defectDescription', 'quantityDefective', 'quantityReceived'];
    const errorMessages = [];

    // Validate required fields
    requiredFields.forEach(field => {
        if (!formData[field]) {
            isValid = false;
            errorMessages.push(`${field.replace(/([A-Z])/g, ' $1')} is required.`);
        }
    });

    // Show error messages if validation fails
    if (!isValid) {
        alert(errorMessages.join('\n'));
    }

    return isValid;
}

// Document ready event
document.addEventListener('DOMContentLoaded', function () {
    // Load saved data and user session
    loadSavedData();
    loadUserSession();

    // Auto-generate NCR number on page load
    generateNCRNumber();

    // Handle form submission
    const ncrForm = document.getElementById('ncrForm');
    ncrForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Collect form data
        const formData = new FormData(ncrForm);
        const ncrData = Object.fromEntries(formData.entries());

        // Validate the form before submission
        if (validateForm(ncrData)) {
            // Log the collected data (or send it to your backend)
            console.log('NCR Data:', ncrData);

            // Save the form data in localStorage
            saveFormData();

            // Notify the user of successful submission
            alert('NCR created successfully!');

            // Reset the form and generate a new NCR number
            ncrForm.reset();
            generateNCRNumber();

            // Optionally, redirect to dashboard after submission
            // window.location.href = 'index.html';
        }
    });

    // Add event listeners to all "Save" buttons
    const saveButtons = document.querySelectorAll('.btn-save');
    saveButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            saveFormData();
            alert('Form data saved successfully!');
        });
    });
});
