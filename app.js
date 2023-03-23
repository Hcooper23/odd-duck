'use strict';

let products = [];
let previousIndexes = [];
let roundsOfVoting = 25;
let results = document.getElementById('results');
let chart = null;
let index = []

function photos(name, source) {
    this.name = name;
    this.timesClicked = 0;
    this.timesShown = 0;
    this.source = source;
}

function createProducts() {
    if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
    }
    else {
        products.push(new photos('Banana', 'Images/banana.jpg'));
        products.push(new photos('Bathroom', 'Images/bathroom.jpg'));
        products.push(new photos('Boots', 'Images/boots.jpg'));
        products.push(new photos('Breakfast', 'Images/breakfast.jpg'));
        products.push(new photos('Bubblegum', 'Images/bubblegum.jpg'));
        products.push(new photos('Chair', 'Images/chair.jpg'));
        products.push(new photos('Cthulhu', 'Images/cthulhu.jpg'));
        products.push(new photos('Dog-Duck', 'Images/dog-duck.jpg'));
        products.push(new photos('Dragon', 'Images/dragon.jpg'));
        products.push(new photos('Pen', 'Images/pen.jpg'));
        products.push(new photos('Pet-Sweep', 'Images/pet-sweep.jpg'));
        products.push(new photos('Scissors', 'Images/scissors.jpg'));
        products.push(new photos('Shark', 'Images/shark.jpg'));
        products.push(new photos('Bag', 'Images/bag.jpg'));
        products.push(new photos('Sweep', 'Images/sweep.png'));
        products.push(new photos('Tauntaun', 'Images/tauntaun.jpg'));
        products.push(new photos('Unicorn', 'Images/unicorn.jpg'));
        products.push(new photos('Water-Can', 'Images/water-can.jpg'));
        products.push(new photos('Wine-Glass', 'Images/wine-glass.jpg'));
    }
}
createProducts();

let imgElp = document.querySelectorAll('img');
let voteTrackerEl = document.getElementById('vote-tracker');
let buttonEl = document.getElementById('button');
const canvasEl = document.getElementById('chart');
let buttonResetEl = document.getElementById('reset-chart');


imgElp[0].src = products[0].source;
// imgElp[0].id = products[0].name;
// imgElp[1].src = products[1].source;
// imgElp[1].id = products[1].name;
// imgElp[2].src = products[2].source;
// imgElp[2].id = products[2].name;

function generateRandomImages() {
    index = [];
    console.log (index)
      // const index = new Set();
    while (index.length < 3) {
        console.log (index.length)  
        const randomIndex = Math.floor(Math.random() * products.length)
        if (!index.includes(randomIndex) && !previousIndexes.includes(randomIndex)) {
            index.push(randomIndex);
        }
    };
    // const uniqueIndex = Array.from(index);
    previousIndexes = index;
    return index;
}

function renderImages() {
    let indexes = generateRandomImages();
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
        console.log("chart draw")
        writeData();
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
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            }, {
                label: 'Times Clicked',
                data: timesClickedValues,
                backgroundColor: 'rgba(255, 99, 132, 3)',
                borderColor: 'rgba(255, 99, 132, 10)',
            }],
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        font: {
                            size: 30
                        },
                    },

                }
            }
        },
        x: {
            ticks: {
                font: {
                    size: 30
                },
            },
        }

    });
    chart.canvas.parentNode.style.height = '1200px';
    chart.canvas.parentNode.style.width = '1200px';
}


function writeData() {
    localStorage.setItem('photos', JSON.stringify(products));
}

function readData() {
    return JSON.parse(localStorage.getItem('photos')) || [];
}

products = readData();
console.log(products);

function updateChart(event) {
    event.preventDefault();
    console.log(event.target.name);
    let name = event.target.name.value;
    let source = event.target.source.value;
    products.forEach(products => {
        if (products.name === name) {
            products.source = source;
        }
    });
    readData();
    drawChart();
}


buttonResetEl.addEventListener('click', resetChart);
function resetChart(event) {
    roundsOfVoting = 25;
    chart.destroy();
    voteTrackerEl.addEventListener('click', handleProductClick);
}
