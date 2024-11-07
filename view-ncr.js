// Global variable to store NCR data
let ncrData = [];

document.addEventListener('DOMContentLoaded', function () {
    loadNCRData();
    displayNCRDetails();
});

// Function to load NCR data (simulating fetching from a server)
function loadNCRData() {
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'block';

    setTimeout(() => {
        try {
            // Dummy data for demonstration purposes
            ncrData = [
                { ncr_number: 'NCR-001', document_date: '2023-05-01', defect_type: 'Dimensional', ncr_status: 'Open', sales_order_no: 'SO-001', po_prod_no: 'PO-001', defect_description: 'Part out of tolerance', quantity_defective: 5, quantity_received: 100, supplier_name: 'Supplier A', car_status: 'Pending', disposition_type: 'Rework', disposition_notes: 'Rework required', engineer_name: 'John Doe', engineering_review_status: 'In Progress', quality_rep: 'Jane Smith' },
                { ncr_number: 'NCR-002', document_date: '2023-05-02', defect_type: 'Visual', ncr_status: 'In Progress', sales_order_no: 'SO-002', po_prod_no: 'PO-002', defect_description: 'Surface scratch', quantity_defective: 3, quantity_received: 50, supplier_name: 'Supplier B', car_status: 'Not Required', disposition_type: 'Use As Is', disposition_notes: 'Cosmetic issue only', engineer_name: 'Bob Johnson', engineering_review_status: 'Approved', quality_rep: 'Alice Brown' },
                { ncr_number: 'NCR-003', document_date: '2023-05-03', defect_type: 'Functional', ncr_status: 'Closed', sales_order_no: 'SO-003', po_prod_no: 'PO-003', defect_description: 'Failed performance test', quantity_defective: 10, quantity_received: 200, supplier_name: 'Supplier C', car_status: 'Closed', disposition_type: 'Scrap', disposition_notes: 'Cannot be repaired', engineer_name: 'Emma Wilson', engineering_review_status: 'Rejected', quality_rep: 'David Lee' }
            ];
            loadingMessage.style.display = 'none';
            filterNCRs(); // Apply filtering after data is loaded
        } catch (error) {
            loadingMessage.style.display = 'none';
            document.getElementById('errorMessage').style.display = 'block';
        }
    }, 1000); // Simulating a 1-second delay
}

// Function to display NCR details based on selected index
function displayNCRDetails() {
    const selectedNCRIndex = sessionStorage.getItem('selectedNCRIndex');
    if (selectedNCRIndex === null) {
        // Handle the case where no NCR is selected
        window.location.href = 'view-ncrs.html'; // Redirect to view NCRs page if no selection is made
        return;
    }

    const ncr = ncrData[selectedNCRIndex];
    const detailsContainer = document.getElementById('ncrDetails');

    if (ncr) {
        detailsContainer.innerHTML = `
            <h2>NCR Number: ${ncr.ncr_number}</h2>
            <p><strong>Date:</strong> ${ncr.document_date}</p>
            <p><strong>Sales Order No:</strong> ${ncr.sales_order_no}</p>
            <p><strong>PO/Production No:</strong> ${ncr.po_prod_no}</p>
            <p><strong>Defect Type:</strong> ${ncr.defect_type}</p>
            <p><strong>Defect Description:</strong> ${ncr.defect_description}</p>
            <p><strong>Quantity Defective:</strong> ${ncr.quantity_defective}</p>
            <p><strong>Quantity Received:</strong> ${ncr.quantity_received}</p>
            <p><strong>Supplier Name:</strong> ${ncr.supplier_name}</p>
            <p><strong>CAR Status:</strong> ${ncr.car_status}</p>
            <p><strong>Disposition Type:</strong> ${ncr.disposition_type}</p>
            <p><strong>Disposition Notes:</strong> ${ncr.disposition_notes}</p>
            <p><strong>Engineer:</strong> ${ncr.engineer_name}</p>
            <p><strong>Review Status:</strong> ${ncr.engineering_review_status}</p>
            <p><strong>Quality Representative:</strong> ${ncr.quality_rep}</p>
            <p><strong>NCR Status:</strong> ${ncr.ncr_status}</p>
        `;
    } else {
        detailsContainer.innerHTML = '<p>No NCR data found.</p>';
    }
}

// Function to handle searching and filtering of NCR data
function filterNCRs() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;

    const filteredRecords = ncrData.filter(record => {
        const matchesSearch = record.ncr_number.toLowerCase().includes(searchInput) ||
                              record.defect_type.toLowerCase().includes(searchInput) ||
                              record.defect_description.toLowerCase().includes(searchInput);
        const matchesStatus = statusFilter ? record.ncr_status === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    const tableBody = document.getElementById('ncrTableBody');
    tableBody.innerHTML = '';  // Clear existing rows

    if (filteredRecords.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5">No matching NCRs found.</td></tr>';
    } else {
        filteredRecords.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.ncr_number}</td>
                <td>${record.document_date}</td>
                <td>${record.defect_type}</td>
                <td>${record.ncr_status}</td>
                <td><button onclick="viewDetails('${record.ncr_number}')">View Details</button></td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Function to view NCR details
function viewDetails(ncrNumber) {
    const selectedIndex = ncrData.findIndex(record => record.ncr_number === ncrNumber);
    sessionStorage.setItem('selectedNCRIndex', selectedIndex);
    window.location.href = 'view-details.html';  // Redirect to the detail page
}
