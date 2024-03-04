fetch('data.csv')
    .then(response => response.text())
    .then(csvString => {
        // Convert CSV string to arrays
        const rows = csvString.trim().split('\n').map(row => row.split(','));
        // Assuming first row is header and first column contains timestamps
        const labels = rows.slice(1).map(row => {
            // Convert each timestamp to a readable date format
            const timestamp = parseInt(row[0], 10); // Convert string to integer
            const date = new Date(timestamp); // Convert integer to Date
            return date.toLocaleDateString("en-US"); // Format date as needed ("en-US" is just an example)
        });
        const data = rows.slice(1).map(row => parseFloat(row[1])); // Convert string to float for chart data

        // Calculate trend line values based on the equation provided
        const trendLineData = data.map((value, index) => {
            const x = index; // Assuming x starts from 0 and increments by 1
            // Calculate value based on the given equation
            return 20866 + 94.9*x + -0.122*x**2 + -1.01E-04*x**3 + 2.22E-07*x**4 + -1.03E-10*x**5 + 1.46E-14*x**6;
        });

        console.log(labels, data); // Debugging: log to see if data is parsed correctly

        // Render the chart
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'line', // Change to 'bar', 'pie', etc. as needed
            data: {
                labels: labels,
                datasets: [{
                    label: 'Player Count',
                    data: data,
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    borderColor: '#a020f0',
                    borderWidth: 2,
                    pointBackgroundColor: '#a020f0',
                    pointBorderColor: '#ffffff',
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    tension: 0.1
                },
                {
                    label: 'Trend Line',
                    data: trendLineData,
                    borderColor: 'rgba(255, 0, 0, 1)', // Bright red for the trend line
                    borderWidth: 2,
                    fill: false, // Don't fill under the line
                    pointRadius: 0, // No points visible on the trend line
                    tension: 0.1 // Slight curve to the line
                }]
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            color: '#6a0dad', // A brighter purple for grid lines
                        },
                        ticks: {
                            color: '#a020f0', // A vivid purple for tick labels
                        }
                    },
                    y: {
                        grid: {
                            color: '#6a0dad', // A brighter purple for grid lines
                        },
                        ticks: {
                            color: '#a020f0', // A vivid purple for tick labels
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#a020f0', // A vivid purple for legend labels
                        }
                    },
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true, // Enable zooming with the mouse wheel
                            },
                            pinch: {
                                enabled: true, // Enable zooming with pinch gestures on touch devices
                            },
                            mode: 'x' // Enable zooming on the x-axis
                        },
                        pan: {
                            enabled: true, // Enable panning
                            mode: 'x' // Enable panning on the x-axis
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }).catch(error => console.error('Error loading or parsing CSV:', error));
