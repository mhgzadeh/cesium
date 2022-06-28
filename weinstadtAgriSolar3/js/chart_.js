const data = {
    labels: [
        'Burg (South)',
        'Burg (North)',
        'Beutelstein',
    ],
    datasets: [{
        label: 'The Total Amount of Solar Radiation (MWh)',
        data: [6836, 7597, 14432],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            // 'rgb(201, 203, 207)',
            // 'rgb(54, 162, 235)'
        ]
    }]
};

const configPolar = {
    type: 'polarArea',
    data: data,
    options: {}
};

const myChart3 = new Chart(
    document.getElementById('myChart3'),
    configPolar
);


const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const data2 = {
    labels: labels,
    datasets: [
        {
            label: 'Burg (South)',
            data: [15.42705852, 32.71968843, 76.05313433, 118.3181153, 158.7638952, 167.8255502, 165.9474428, 135.3314169, 89.35165242, 44.45216764, 18.42327747, 10.62298915],
            borderColor: 'rgb(0, 192, 192)',
            //   backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        },{
            label: 'Burg (North)',
            data: [16.11583853, 34.93426196, 80.01648948, 119.8859652, 155.6540617, 162.2249392, 161.6007562, 135.5305325, 93.09833235, 47.47952006, 19.2943901, 10.69832943],
            borderColor: 'rgb(175, 0, 192)',
            //   backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
        }, {
            label: 'Beutelstein',
            data: [15.77144853, 33.82697519, 78.0348119, 119.1020403, 157.2089784, 165.0252447, 163.7740995, 135.4309747, 91.22499238, 45.96584385, 18.85883378, 10.66065929],
            borderColor: 'rgb(175, 192, 0)',
            //   backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
        }
    ]
};

const config = {
    type: 'line',
    data: data2,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'The Mean of Solar Radiation for Each Month (KWh/m2)'
            }
        }
    },
};

const myChart2 = new Chart(
    document.getElementById('myChart2'),
    config
);