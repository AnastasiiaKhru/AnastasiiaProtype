document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const ncrId = urlParams.get('id');

    if (ncrId) {
        fetchNcrData(ncrId);
    } else {
        alert('No NCR ID provided');
        window.location.href = 'view-ncrs.html';
    }

    document.getElementById('editNcrForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveNcrChanges();
    });
});

function fetchNcrData(ncrId) {
    // In a real application, you would fetch the NCR data from your backend
    // For this example, we'll use mock data
    const mockNcrData = {
        number: ncrId,
        date: '2023-05-01',
        defectType: 'dimensional',
        status: 'open'
    };

    document.getElementById('ncrNumber').value = mockNcrData.number;
    document.getElementById('date').value = mockNcrData.date;
    document.getElementById('defectType').value = mockNcrData.defectType;
    document.getElementById('status').value = mockNcrData.status;
}

function saveNcrChanges() {
    const formData = {
        number: document.getElementById('ncrNumber').value,
        date: document.getElementById('date').value,
        defectType: document.getElementById('defectType').value,
        status: document.getElementById('status').value
    };

    // In a real application, you would send this data to your backend
    console.log('Saving NCR changes:', formData);
    alert('Changes saved successfully!');
    window.location.href = 'view-ncrs.html';
}

function cancelEdit() {
    window.location.href = 'view-ncrs.html';
}