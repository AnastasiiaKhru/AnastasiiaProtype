document.addEventListener('DOMContentLoaded', function() {
    // Initialize the department chart
    initDepartmentChart();

    // Add event listeners to sidebar menu items
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Simulate loading of dynamic content
    updateNCRStatistics();
    updateRecentNCRs();

    // Add event listener for form submission
    document.getElementById('ncrForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Get the value from the input field
        const ncrDescription = document.getElementById('ncrDescription').value;

        // Save data to localStorage
        localStorage.setItem('ncrDescription', ncrDescription);

        // Redirect to the next page (display page)
        window.location.href = 'view-ncr.html';
    });
});

function initDepartmentChart() {
    const ctx = document.getElementById('departmentChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Production', 'Quality Control', 'Engineering', 'Logistics'],
            datasets: [{
                data: [12, 19, 8, 5],
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#e74c3c',
                    '#f39c12'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

function updateNCRStatistics() {
    // Simulate fetching data from an API
    setTimeout(() => {
        document.querySelector('.stat-value:first-child').textContent = '27';
        document.querySelector('.stat-value:last-child').textContent = '15';
    }, 1000);
}

function updateRecentNCRs() {
    // Simulate fetching recent NCRs from an API
    const recentNCRs = [
        'NCR-2023-004: Equipment Malfunction',
        'NCR-2023-005: Supplier Quality Issue',
        'NCR-2023-006: Calibration Error'
    ];

    setTimeout(() => {
        const recentList = document.querySelector('.recent-list');
        recentNCRs.forEach(ncr => {
            const li = document.createElement('li');
            li.textContent = ncr;
            recentList.appendChild(li);
        });
    }, 1500);
}

// Function to save the form data into localStorage
function saveFormData() {
    const formData = new FormData(document.getElementById('ncrForm'));
    const ncrData = Object.fromEntries(formData.entries());
    
    // Get existing NCR data from localStorage or initialize an empty array
    let allNCRData = JSON.parse(localStorage.getItem('ncrData')) || [];
    
    // Push the new NCR data into the array
    allNCRData.push(ncrData);

    // Save the updated array back to localStorage
    localStorage.setItem('ncrData', JSON.stringify(allNCRData));

    // Optionally show a message or redirect after saving
    alert('NCR saved successfully!');
}
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

let ncrData = [];

app.post('/submit', (req, res) => {
    // Get data from the form
    const ncrDescription = req.body.ncrDescription;
    // Save data (in-memory for now)
    ncrData.push(ncrDescription);

    // Redirect to the display page
    res.redirect('/view');
});

app.get('/view', (req, res) => {
    // Render the view page with saved NCR data
    res.send(`<h2>Submitted NCR Information</h2><p>${ncrData.join('<br>')}</p>`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


