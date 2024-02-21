// Fetch the CSV data
fetch('https://drive.google.com/file/d/1Pw6k5Svy1S8j0zb45dV-mayIp3NSlmze/view?usp=sharing')
    .then(response => response.text())
    .then(csvString => {
        // Convert CSV string to arrays
        const rows = csvString.trim().split('\n').map(row => row.split(','));
        const labels = rows.slice(1).map(row => row[0]); // Assuming first row is header and first column contains labels
        const data = rows.slice(1).map(row => parseFloat(row[1])); // Convert string to float for chart data

        console.log(labels, data); // Debugging: log to see if data is parsed correctly

        // Render the chart
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'line', // Change to 'bar', 'pie', etc. as needed
            data: {
                labels: labels,
                datasets: [{
                    label: 'My Dataset',
                    data: data,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {}
        });
    }).catch(error => console.error('Error loading or parsing CSV:', error));
