        // Data untuk berbagai film dan periode
        const chartData = {
            avengers: {
                weekly: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    data: [2400, 3200, 2800, 3500, 2200, 3800]
                },
                monthly: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    data: [8400, 9500, 7800, 8200]
                },
                yearly: {
                    labels: ['2021', '2022', '2023', '2024'],
                    data: [32000, 35000, 29000, 33000]
                }
            },
            spiderman: {
                weekly: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    data: [2800, 3600, 3200, 3900, 2600, 4200]
                },
                monthly: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    data: [9600, 10800, 8900, 9300]
                },
                yearly: {
                    labels: ['2021', '2022', '2023', '2024'],
                    data: [36000, 39000, 33000, 37000]
                }
            },
            batman: {
                weekly: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    data: [2000, 2800, 2400, 3100, 1800, 3400]
                },
                monthly: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    data: [7200, 8300, 6700, 7100]
                },
                yearly: {
                    labels: ['2021', '2022', '2023', '2024'],
                    data: [28000, 31000, 25000, 29000]
                }
            },
            topgun: {
                weekly: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    data: [2600, 3400, 3000, 3700, 2400, 4000]
                },
                monthly: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    data: [9000, 10200, 8400, 8800]
                },
                yearly: {
                    labels: ['2021', '2022', '2023', '2024'],
                    data: [34000, 37000, 31000, 35000]
                }
            }
        };

        const ticketData = {
            adventure: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [2200, 3000, 2600, 3300, 2000, 3600]
            },
            action: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [2800, 3600, 3200, 3900, 2600, 4200]
            },
            drama: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [1800, 2400, 2000, 2700, 1400, 3000]
            },
            comedy: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [2400, 3200, 2800, 3500, 2200, 3800]
            }
        };

        let salesChart, ticketChart;

        // Konfigurasi chart
        const chartConfig = {
            type: 'line',
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#6b7280'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f3f4f6'
                        },
                        ticks: {
                            color: '#6b7280',
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0.4,
                        borderWidth: 2,
                        borderColor: '#3b82f6',
                        fill: true
                    },
                    point: {
                        radius: 4,
                        backgroundColor: '#3b82f6',
                        borderColor: '#ffffff',
                        borderWidth: 2
                    }
                }
            }
        };

        // Inisialisasi chart
        function initCharts() {
            const ctx1 = document.getElementById('salesChart').getContext('2d');
            const ctx2 = document.getElementById('ticketChart').getContext('2d');

            salesChart = new Chart(ctx1, {
                ...chartConfig,
                data: {
                    labels: chartData.avengers.weekly.labels,
                    datasets: [{
                        data: chartData.avengers.weekly.data,
                        backgroundColor: createGradient(ctx1),
                        borderColor: '#3b82f6',
                        fill: true
                    }]
                }
            });

            ticketChart = new Chart(ctx2, {
                ...chartConfig,
                data: {
                    labels: ticketData.adventure.labels,
                    datasets: [{
                        data: ticketData.adventure.data,
                        backgroundColor: createGradient(ctx2),
                        borderColor: '#3b82f6',
                        fill: true
                    }]
                }
            });
        }

        // Membuat gradient untuk area chart
        function createGradient(ctx) {
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
            return gradient;
        }

        // Update Sales Chart
        function updateChart() {
            const movie = document.getElementById('movieSelect').value;
            const period = document.getElementById('periodSelect').value;
            const movieName = document.getElementById('movieSelect').selectedOptions[0].text;
            
            document.getElementById('movieInfo').textContent = movieName;
            
            const data = chartData[movie][period];
            salesChart.data.labels = data.labels;
            salesChart.data.datasets[0].data = data.data;
            salesChart.data.datasets[0].backgroundColor = createGradient(salesChart.ctx);
            salesChart.update();
        }

        // Update Ticket Chart
        function updateTicketChart() {
            const category = document.getElementById('categorySelect').value;
            const categoryName = document.getElementById('categorySelect').selectedOptions[0].text;
            
            document.getElementById('categoryInfo').textContent = categoryName;
            
            const data = ticketData[category];
            ticketChart.data.labels = data.labels;
            ticketChart.data.datasets[0].data = data.data;
            ticketChart.data.datasets[0].backgroundColor = createGradient(ticketChart.ctx);
            ticketChart.update();
        }

        // Inisialisasi saat halaman dimuat
        window.addEventListener('load', initCharts);