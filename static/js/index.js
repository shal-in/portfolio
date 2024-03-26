console.log('index.js')



const launchPageNameEl = document.getElementById('launch-page-name');
const launchPageTextEl = document.getElementById('launch-page-text');
const launchPageBoxEl = document.getElementById('launch-page-box');
const text1 = `Shalin Ahasan`;

const arrowDownEl = document.getElementById('arrow-down');

function textTypingEffect(element, text, i=0) {
    if (i === 0) {
        element.innerHTML = '';
    }

    element.innerHTML += text[i];

    if (i === text.length - 1) {
        return;
    }

    let time = getRandomInt(3,6)
    time *= 10;
    setTimeout(()=> textTypingEffect(element, text, i + 1), time);
}

// Launch Page Animation

// Comment Out
launchPageNameEl.textContent = 'Shalin Ahasan';
launchPageTextEl.style.opacity = 1;
arrowDownEl.style.display = 'flex'

// // Comment In
// document.addEventListener("DOMContentLoaded", function() {
//     // Wait for the DOM to be fully loaded
//     setTimeout(function() {
//       // After a delay, hide the title page
//       document.getElementById("launch-page-container").classList.add("hide");

//         setTimeout(() => {
//             arrowDownEl.style.display = 'flex'
//         }, 1500)

//     }, 2200); // Adjust the delay (in milliseconds) as needed

// });

// textTypingEffect(launchPageNameEl, text1);
// setTimeout(() => {
//     launchPageTextEl.classList.add('fade-in')
//     launchPageTextEl.style.opacity = 1
// }, 800)

window.addEventListener('scroll', function() {
    if (window.scrollY > 40) { // Adjust the threshold value as needed
        arrowDownEl.classList.add('fade-out');
        setTimeout(() => {
        arrowDownEl.style.display = 'none';
        }, 490)
    }
});




function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}