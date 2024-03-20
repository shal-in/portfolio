console.log('canvas.js');

// Initialize an empty array to store the canvas squares
let canvasArray = [];

// Loop through rows
for (let i = 0; i < 10; i++) {
    // Initialize an empty array for each row
    let row = [];
    
    // Loop through columns
    for (let j = 0; j < 10; j++) {
        // Get the square element by its id
        let square = document.getElementById(`square-${i}-${j}`);
        
        // Push the square element to the row array
        row.push(square);
    }
    
    // Push the row array to the canvasArray
    canvasArray.push(row);
}

// drawLine(axis, startPoint, length, colour, lineWeight)
function drawLine(axis, startPoint, length, colour, lineWeight) {
    startX = startPoint[0];
    startY = startPoint[1];

    if (axis == 'horizontal') {
        endX = startX + length;
        if (endX > 10) {
            endX = 10;
        }

        let drawLineArray = canvasArray[startY].slice(startX, endX);
        
        drawLineArray.forEach(square => {
            square.style.borderTop = `${lineWeight}px solid ${colour}`;
        })
    }

    else if(axis == 'vertical') {
        endY = startY + length;
        if (endY > 10) {
            endY = 10;
        }

        let drawLineArray = []
        canvasArray.forEach(row => {
            square = row[startX]
            squareCol = square.id.split('-');
            squareCol = squareCol[1];
            if (startY <= squareCol && squareCol < endY) {
                drawLineArray.push(square);
            }
        })

        drawLineArray.forEach(square => {
            square.style.borderLeft = `${lineWeight}px solid ${colour}`;
        })
    }
}

function drawCanvas() {
    // Top line of middle square
    startX = getRandomInt(0,3);
    endX = getRandomInt(7,10);
    length = endX - startX

    drawLine('horizontal', [startX, 3], length, getRandomColour(), 2);
    // Bottom line of middle square
    startX = getRandomInt(0,3);
    endX = getRandomInt(7,10);
    length = endX - startX

    drawLine('horizontal', [startX, 7], length, getRandomColour(), 2);

    // Left line of middle square
    startY = getRandomInt(0,3);
    endY = getRandomInt(7,10);
    length = endY - startY

    drawLine('vertical', [3, startY], length, getRandomColour(), 2);

    // Right line of middle square
    startY = getRandomInt(0,3);
    endY = getRandomInt(7,10);
    length = endY - startY

    drawLine('vertical', [7, startY], length, getRandomColour(), 2);

    // Random extra lines
    nums= [1, 2, 8, 11, 11, 13, 15, 16, 16, 19, 20,
        24, 26, 27, 100, 130]
    index = getRandomInt(1, nums.length - 1);
    num = nums[index];
    for (let i=0; i<=num; i++) {
        coordinate = [getRandomInt(0,9), getRandomInt(0,9)];
        length = getRandomInt(3,10);

        drawLine(getRandomAxis(), coordinate, length, getRandomColour(), 2);
    }
}

drawCanvas();

// Function to handle space bar key press
function handleSpaceBar(event) {
    // Check if the pressed key is the space bar
    if (event.keyCode === 32 || event.key === " ") {
        clearCanvas();
        drawCanvas()
    }
}

// Add event listener for keydown event on the document
document.addEventListener("keydown", handleSpaceBar);

canvasEl = document.getElementById('canvas');
canvasEl.addEventListener('click', () => {
    clearCanvas();
    drawCanvas();
})















function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColour() {
    colours = [
        '#E02D15',
        '#0A8B99',
        '#37323E'
    ]

    let index = getRandomInt(0, colours.length - 1);

    return colours[index]
}

function getRandomAxis() {
    let num = getRandomInt(1,2);
    if (num == 1) {
        return 'horizontal'
    }

    return 'vertical'
}

function clearCanvas() {
    canvasArray.forEach(row => {
        row.forEach(square => 
            square.style.border = 'none');
    })
}