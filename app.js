'use strict';

let products = [];
// This line initializes an empty array named products.
let previousIndexes = [];
// This line initializes an empty array named previousIndexes.
let roundsOfVoting = 25;
// This line sets the number of rounds of voting to 25.
let results = document.getElementById('results');
// This line gets the DOM element with the ID results and assigns it to the variable results.
let chart = null;
// This line initializes the variable chart to null. This variable will later be used to store a reference to a chart object.


// This is a constructor function named Photos that is used to create objects with three properties: name, timesClicked, and timesShown, and a source. 
function Photos(name, source) {
    this.name = name;
    this.timesClicked = 0;
    this.timesShown = 0;
    this.source = source;
}


// This code defines a function named createProducts that is called when the script runs.The purpose of this function is to create an array of objects representing products, if one doesn't already exist in localStorage.
// The function first checks if there is an array of products in localStorage by calling the getItem method of the localStorage object, passing in the key products. If an array is found, it is parsed using JSON.parse and assigned to the products variable. If not, the function creates a new array of product objects, and pushes them into the products array.
function createProducts() {
    if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
    }
    else {
        products.push(new Photos('Banana', './Images/banana.jpg'));
        products.push(new Photos('Bathroom', './Images/bathroom.jpg'));
        products.push(new Photos('Boots', './Images/boots.jpg'));
        products.push(new Photos('Breakfast', './Images/breakfast.jpg'));
        products.push(new Photos('Bubblegum', './Images/bubblegum.jpg'));
        products.push(new Photos('Chair', './Images/chair.jpg'));
        products.push(new Photos('Cthulhu', './Images/cthulhu.jpg'));
        products.push(new Photos('Dog-Duck', './Images/dog-duck.jpg'));
        products.push(new Photos('Dragon', './Images/dragon.jpg'));
        products.push(new Photos('Pen', './Images/pen.jpg'));
        products.push(new Photos('Pet-Sweep', './Images/pet-sweep.jpg'));
        products.push(new Photos('Scissors', './Images/scissors.jpg'));
        products.push(new Photos('Shark', './Images/shark.jpg'));
        products.push(new Photos('Bag', './Images/bag.jpg'));
        products.push(new Photos('Sweep', './Images/sweep.png'));
        products.push(new Photos('Tauntaun', './Images/tauntaun.jpg'));
        products.push(new Photos('Unicorn', './Images/unicorn.jpg'));
        products.push(new Photos('Water-Can', './Images/water-can.jpg'));
        products.push(new Photos('Wine-Glass', './Images/wine-glass.jpg'));
    }
    console.log(products)
}
createProducts();

// Refers to an image element with the ID imageOne.
let imageOneEl = document.getElementById('imageOne');
// refers to an image element with the ID imageTwo.
let imageTwoEl = document.getElementById('imageTwo');
// refers to an image element with the ID imageThree.
let imageThreeEl = document.getElementById('imageThree');
// refers to an element with the ID vote-tracker
let voteTrackerEl = document.getElementById('vote-tracker');
// refers to a button element with the ID button.
let buttonEl = document.getElementById('button');
// refers to a canvas element with the ID chart.
const canvasEl = document.getElementById('chart');
// refers to a button element with the ID reset-chart.
let buttonResetEl = document.getElementById('reset-chart');


// This code defines a function named generateRandomImages that is used to generate three unique random indexes for the product array, which will be used to display three random product images to the user in a survey or poll.
function generateRandomImages() {
    let indexes = [];
    console.log(indexes);
    while (indexes.length < 3) {
        const randomIndex = Math.floor(Math.random() * products.length)
        console.log(randomIndex)
        if (!indexes.includes(randomIndex) && !previousIndexes.includes(randomIndex)) {
            indexes.push(randomIndex);
        }
    };
    previousIndexes = indexes;
    return indexes;
}

// This code defines a function named renderImages that is used to render three random product images to the user interface of a survey or poll.
function renderImages() {
    let indexes = generateRandomImages();
    imageOneEl.src = products[indexes[0]].source;
    imageOneEl.id = products[indexes[0]].name;
    products[indexes[0]].timesShown++;
    imageTwoEl.src = products[indexes[1]].source
    imageTwoEl.id = products[indexes[1]].name;
    products[indexes[1]].timesShown++;
    imageThreeEl.src = products[indexes[2]].source;
    imageThreeEl.id = products[indexes[2]].name;
    products[indexes[2]].timesShown++;
}
renderImages();

// This function handles the event of a product image being clicked. It first identifies the product that was clicked by accessing the id property of the event target. It then iterates over the products array to find the product that matches the clicked id and increments its timesClicked property.
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

// This line of code adds an event listener to the voteTrackerEl element, which is a container that holds the three product images that the user can click on. The event listener listens for a "click" event and triggers the handleProductClick function when the event occurs. This is how the program tracks which product image the user clicked on and updates the corresponding timesClicked property of the Photos object.
voteTrackerEl.addEventListener('click', handleProductClick);

// This function is responsible for rendering the voting results in a list format. It creates a new list item element for each product, adds the relevant data (number of clicks and number of times shown) to the item's text content, and appends the item to a parent container element.
function renderData(event) {
    let buttonClicked = event.target.id;
    products.forEach(products => {
        let listItemEl = document.createElement('li');
        let parentContainerEl = document.getElementById('results');
        parentContainerEl.appendChild(listItemEl);
        listItemEl.textContent = `${products.name} had ${products.timesClicked} votes, and was shown ${products.timesShown} times.`;
    });
}

// This line of code selects the canvas element with the ID chart and sets its context to 2d using the getContext() method. This context allows the code to draw graphics, text, and other content on the canvas. The chartObj variable holds this context, which can be used to create charts or other visualizations.
let chartObj = document.getElementById('chart').getContext("2d");

// This function creates a bar chart using the Chart.js library, where the x-axis represents the product names and the y-axis represents the number of times each product was shown or clicked.
function drawChart() {
    let labels = []
    let timesShownValues = [];
    let timesClickedValues = []
    products.forEach(products => {
        labels.push(products.name);
        timesShownValues.push(products.timesShown);
        timesClickedValues.push(products.timesClicked);
    });

    // This function creates a chart using Chart.js library to display the results of the voting. It takes the data from the products array and formats it to create the chart.
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

// This function uses the localStorage API to store the products array as a JSON string. This allows the data to persist even if the user refreshes or closes the page. The setItem() method is called on the localStorage object and takes two arguments: a key and a value. The key is a string that serves as the identifier for the stored data, while the value is the actual data to be stored. In this case, the key is 'photos' and the value is the products array converted to a JSON string using JSON.stringify().
function writeData() {
    localStorage.setItem('photos', JSON.stringify(products));
}

// The readData() function reads the data stored in the browser's local storage under the key 'photos'. If the data exists, it returns the parsed JSON data as an array of objects representing each product. If the data doesn't exist or is empty, it returns an empty array.
function readData() {
    return JSON.parse(localStorage.getItem('photos')) || [];
}


// This function appears to update the chart data when a form is submitted. It prevents the default form submission behavior, retrieves the name and source values from the form, and iterates over the products array to find the product that matches the name submitted in the form. If a match is found, the product's source property is updated to the source value submitted in the form. Finally, the function calls the readData() function to update the localStorage and the drawChart() function to update the chart with the new data.
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

The resetChart function is a click event handler function that resets the chart and the number of rounds of voting. It takes an event parameter as input, but it is not used in the function.

// When the function is called, it sets roundsOfVoting back to 25, which means there are 25 rounds of voting available. It then calls the destroy() method on the chart object to destroy the current chart. Finally, it adds an event listener to the voteTrackerEl element that calls the handleProductClick function when clicked, allowing the user to start a new round of voting.
buttonResetEl.addEventListener('click', resetChart);
function resetChart(event) {
    roundsOfVoting = 25;
    chart.destroy();
    voteTrackerEl.addEventListener('click', handleProductClick);
}
