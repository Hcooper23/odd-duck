'use strict';

const products = [];
let roundsOfVoting = 25;
let results = document.getElementById('results');
let chart = null;

function photos(name, source) {
    this.name = name;
    this.timesClicked = 0;
    this.timesShown = 0;
    this.source = source;
}

products.push(new photos('banana', 'Images/banana.jpg'));
products.push(new photos('bathroom', 'Images/bathroom.jpg'));
products.push(new photos('boots', 'Images/boots.jpg'));
products.push(new photos('breakfast', 'Images/breakfast.jpg'));
products.push(new photos('bubblegum', 'Images/bubblegum.jpg'));
products.push(new photos('chair', 'Images/chair.jpg'));
products.push(new photos('cthulhu', 'Images/cthulhu.jpg'));
products.push(new photos('dog-duck', 'Images/dog-duck.jpg'));
products.push(new photos('dragon', 'Images/dragon.jpg'));
products.push(new photos('pen', 'Images/pen.jpg'));
products.push(new photos('pet-sweep', 'Images/pet-sweep.jpg'));
products.push(new photos('scissors', 'Images/scissors.jpg'));
products.push(new photos('shark', 'Images/shark.jpg'));
products.push(new photos('bag', 'Images/bag.jpg'));
products.push(new photos('sweep', 'Images/sweep.png'));
products.push(new photos('tauntaun', 'Images/tauntaun.jpg'));
products.push(new photos('unicorn', 'Images/unicorn.jpg'));
products.push(new photos('water-can', 'Images/water-can.jpg'));
products.push(new photos('wine-glass', 'Images/wine-glass.jpg'));

let imgElp = document.querySelectorAll('img');
let voteTrackerEl = document.getElementById('vote-tracker');
let buttonEl = document.getElementById('button');
const canvasEl = document.getElementById('chart');


imgElp[0].src = products[0].source;
imgElp[0].id = products[0].name;
imgElp[1].src = products[1].source;
imgElp[1].id = products[1].name;
imgElp[2].src = products[2].source;
imgElp[2].id = products[2].name;


function generateRandomImages() {
    const index = new Set();
    while (index.size < 3) {
        const randomIndex = Math.floor(Math.random() * products.length)
        if (!index.has(randomIndex)) {
            index.add(randomIndex);
        }
    };
    const uniqueIndex = Array.from(index);

    return uniqueIndex;
}

function renderImages() {
    let indexes = generateRandomImages();

    let photos = products[generateRandomImages()];

    imgElp[0].src = products[indexes[0]].source;
    imgElp[0].id = products[indexes[0]].name;
    products[indexes[0]].timesShown++;
    imgElp[1].src = products[indexes[1]].source
    imgElp[1].id = products[indexes[1]].name;
    products[indexes[1]].timesShown++;
    imgElp[2].src = products[indexes[2]].source;
    imgElp[2].id = products[indexes[2]].name;
    products[indexes[2]].timesShown++;
}
renderImages();

// function handleClick(event) {
//     let productThatWasClicked = event.target.value;
//     console.log(productThatWasClicked);
//     };

function handleProductClick(event) {
    let productThatWasClicked = event.target.id;
    console.log(productThatWasClicked);
    products.forEach(image => {
        if (image.name === productThatWasClicked) {
            image.timesClicked += 1;
        }
    });
    if (roundsOfVoting) {
        renderImages();
        roundsOfVoting--;
    } else {
        voteTrackerEl.removeEventListener('click', handleProductClick);
        buttonEl.addEventListener('click', renderData);
        drawChart();
        console.log("chart drwan")
        
    }
}

voteTrackerEl.addEventListener('click', handleProductClick);

function renderData(event) {
    let buttonClicked = event.target.id;
    products.forEach(products => {
        let listItemEl = document.createElement('li');
        let parentContainerEl = document.getElementById('results');
        parentContainerEl.appendChild(listItemEl);
        listItemEl.textContent = `${products.name} had ${products.timesClicked} votes, and was shown ${products.timesShown} times.`;
        products.timesClicked;
        products.timesShown;
    });
}

 
let chartObj = document.getElementById('chart').getContext("2d");

function drawChart() {
    let labels = []
    let timesShownValues = [];
    let timesClickedValues = []
    products.forEach(products => {
        labels.push(products.name);
        timesShownValues.push(products.timesShown);
        timesClickedValues.push(products.timesClicked);
    });
   

    chart = new Chart(chartObj, {
        type: 'bar',
        data: {
            labels: labels, 
            datasets: [{
                label: 'Times Shown',
                data: timesShownValues, 
                borderWidth: 1
            }, {
                label: 'Times Clicked',
                data: timesClickedValues, 
                borderWidth: 1
            }], 
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


// function renderChart() {
//     let productNames = [];
//     let productViews = [];
//     let productClicks = [];
//     for (let i = 0; i < allProducts.length; i++) {
//       productNames.push(allProducts[i].name);
//       productViews.push(allProducts[i].views);
//       productClicks.push(allProducts[i].clicks);
//     }
  
//     var chartObject = {
//       type: 'bar',
//       data: {
//         labels: productNames,
//         datasets: [{
//           label: 'Views',
//           data: productViews,
//           backgroundColor: 'rgba(255, 255, 255, 3)',
//           borderColor: 'rgba(255, 255, 255, 10)',
//           borderWidth: 1
//         },
//         {
//           label: 'Clicks',
//           data: productClicks,
//           backgroundColor: 'rgba(34, 166, 179, 3)',
//           borderColor: 'rgba(34, 166, 179, 10)',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         scales: {
//           yAxes: [{
//             ticks: {
//               beginAtZero: true
//             }
//           }]
//         }
//       }
//     };
  
//     let ctx = document.getElementById('myChart').getContext('2d');
//     let myChart = new Chart(ctx, chartObject); //eslint-disable-line
//   }
// buttonEl.addEventListener('click', function () {
//     updateChart([1, 2, 3, 4, 5, 6, 7, 8, 9]);
// });

// function updateChart(data) {
//     console.log("CHART OBJECT TO UPDATE", chartObj.data);
//     // chartObj.data.datasets[0].data = data;
//     chartObj.update();
// }
