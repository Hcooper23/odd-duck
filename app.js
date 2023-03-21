'use strict';

const products = [];
let roundsOfVoting = 25;
let results = document.getElementById('results');

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
    }
}

voteTrackerEl.addEventListener('click', handleProductClick);

// let eventId = voteTrackerEl.addEventListener('click', function (event) {
//     console.log(event.target); // event.target always represents the exact element where an event occurred.

//     // identify which image was clicked on??
//     let productThatWasClicked = event.target.id;
//     products.forEach(photos => {
//         if (photos.name === productThatWasClicked) {
//             photos.timesClicked += 1; // mutation of an object
//         }
//     });
//     console.log('UPDATED STATE', state);

//     // re-render new goat images -> random goat image from state
//     if (roundsOfVoting) {
//         renderGoats();
//         roundsOfVoting--;
//     } else {
//         voteTrackerEl.removeEventListener('click', eventId);
//     }
// });