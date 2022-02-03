import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'

const DynamicChart = () => {
    const [chartData, setChartData] = useState({});
    const [employeeSalary, setEmployeeSalary] = useState([]);
    const [employeeName, setEmployeeName] = useState([]);

    const [name, setName] = useState([]);
    const [hours, setHours] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        saveFile()
    }

    const saveFile = async () => {

        axios.get('http://localhost:8080/api')
            .then(function (response) {
                const fileName = "Employees";
                const json = JSON.stringify(response);
                const blob = new Blob([json], { type: 'application/json' });
                const href = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = href;
                link.download = fileName + ".xls";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const Chart = () => {

        let empHours = [];
        let empName = [];

        axios.get('http://localhost:8080/api')
            .then(res => {
                console.log(res);
                for (const dataObj of res.data) {
                    empName.push(dataObj.name);
                    empHours.push(parseInt(dataObj.hours));
                }
                setChartData({
                    labels: empName,
                    datasets: [{
                        label: 'Isdirbta valandu',
                        data: empHours,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1
                    }]
                });
            })
            .catch(err => {
                console.log(err);
            })

    }
    useEffect(() => {
        Chart();
    }, []);
    return (
        <div className="App">
            <h1>Darbuotoju valandos</h1>
            <form onSubmit={handleSubmit}>
                <button type="submit">Download .xls</button>
            </form>
            <div>
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        title: { text: "Isdirbta valandu", display: true },
                        scales: {
                            yAxes: {
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default DynamicChart;