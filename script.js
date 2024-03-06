fetch('data.csv')
    .then(response => response.text())
    .then(csvString => {
        const rows = csvString.trim().split('\n').map(row => row.split(','));
        const data = rows.slice(1).map(row => parseFloat(row[1])); 

        // Generate labels from 0 to 3133 instead of using dates
        const labels = Array.from({ length: data.length }, (_, index) => index);


        // Calculate trend line values based on the equation provided
        const trendLineData = data.map((value, index) => {
            const x = index;
            return 20866 + 94.9*x + -0.122*x**2 + -1.01E-04*x**3 + 2.22E-07*x**4 + -1.03E-10*x**5 + 1.46E-14*x**6;
        });

        console.log(labels, data); // Debugging: log to see if data is parsed correctly

        // Render the chart
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
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
                    borderColor: 'rgba(0, 255, 0, 1)',
                    borderWidth: 2,
                    fill: false, 
                    pointRadius: 0, 
                    tension: 0.1 
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Days after 7/23/2015 (First Data Collection)',
                            color: '#a020f0',
                            font: {
                                size: 16,
                                weight: 'bold',
                            }
                        },
                        grid: {
                            color: '#6a0dad',
                        },
                        ticks: {
                            color: '#a020f0',
                        }
                    },
                    y: {
                        grid: {
                            color: '#6a0dad', 
                        },
                        ticks: {
                            color: '#a020f0',
                        }
                    }
                },
                plugins: {
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true,
                            },
                            mode: 'x'
                        },
                        pan: {
                            enabled: true,
                            mode: 'x' 
                        }
                    },
                    annotation: {
                        annotations: {
                            box1: {
                                type: 'box',
                                xMin: 1652,
                                xMax: 2843,
                                yMin: 0,
                                yMax: 300000,
                                backgroundColor: 'rgba(0, 255, 0, 0.25)', 
                                borderColor: 'rgb(0, 255, 0)', // Solid neon green border
                                borderWidth: 1,
                            }
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }).catch(error => console.error('Error loading or parsing CSV:', error));
