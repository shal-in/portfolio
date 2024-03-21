console.log('canvas-test.js')

// Initialize Paper.js
paper.install(window);
window.onload = function() {
    paper.setup('myCanvas'); // Set up Paper.js with the canvas element

    // Get the canvas element
    var canvas = document.getElementById('myCanvas');

    // Set the willReadFrequently attribute to true
    canvas.willReadFrequently = true;

    // Create a fixed-size canvas with dimensions 200x200
    var canvasWidth = 200;
    var canvasHeight = 200;

    // Draw lines
    drawLine([getRandomInt(0,60),60], [getRandomInt(140,200), 60], getRandomColour(), 3); // Draw a horizontal line
    let topPoint = [getRandomInt(70, 130), 60];
    plotPoint(topPoint, 'red', 2)

    drawLine([getRandomInt(0,60),140], [getRandomInt(140,200), 140], getRandomColour(), 3); // Draw a horizontal line
    let bottomPoint = [getRandomInt(70,130), 140]
    plotPoint(bottomPoint, 'red', 2)


    drawLine([60,getRandomInt(0,60)], [60, getRandomInt(140,200)], getRandomColour(), 3); // Draw a vertical line;
    let leftPoint = [60, getRandomInt(70, 130)]
    plotPoint(leftPoint, 'red', 2)


    drawLine([140,getRandomInt(0, 60)], [140, getRandomInt(140,200)], getRandomColour(), 3); // Draw a vertical line
    let rightPoint = [140, getRandomInt(70, 130)]
    plotPoint(rightPoint, 'red', 2)

    // top right
    if (rightPoint[1] < 88 && topPoint[0] > 112) {
        console.log('top right')
        circle = drawCircleThroughTwoPoints(rightPoint, topPoint, getRandomColour(), 3)
    }
    
    if (rightPoint[1] > 112 && bottomPoint[0] > 112) {
        console.log('bottom right')
        circle = drawCircleThroughTwoPoints(rightPoint, bottomPoint, getRandomColour(), 3)
    }

    if (leftPoint[1] < 88 && topPoint[0] < 88) {
        console.log('top left')
        circle = drawCircleThroughTwoPoints(leftPoint, topPoint, getRandomColour(), 3)
    }

    if (leftPoint[1] > 11 && bottomPoint[0] < 88) {
        console.log('bottom left')
        circle = drawCircleThroughTwoPoints(leftPoint, bottomPoint, getRandomColour(), 3)
    }



    // Automatically adjust the canvas size to fit the window
    function onResize(event) {
        view.viewSize = new Size(canvasWidth, canvasHeight);
    }
    view.onResize = onResize;
    onResize();
}


function drawLine(startPoint, endPoint, strokeColor, strokeWidth) {
    let line = new Path.Line(new Point(startPoint[0], startPoint[1]), new Point(endPoint[0], endPoint[1]));
    line.strokeColor = strokeColor;
    line.strokeWidth = strokeWidth;
}

function plotPoint(point, fillColor, radius) {
    let circle = new Path.Circle({
        center: new Point(point[0], point[1]),
        radius: radius,
        fillColor: fillColor
    });
}

function drawCircle(point, strokeColor, radius) {
    let circle = new Path.Circle({
        center: new Point(point[0], point[1]),
        radius: radius,
        strokeColor: strokeColor
    });
}

function drawCircleThroughTwoPoints(point1, point2, strokeColor, strokeWidth) {
    // let point1X; let point1Y; let point2X; let point2Y
    // point1X, point1Y = point1[0], point1[1]
    // point2X, point2Y = point2[0], point2[1]

    // Extract x and y coordinates of the two points
    let [point1X, point1Y] = point1;
    let [point2X, point2Y] = point2;
    
    // Calculate the center point of the circle
    var centerX = (point1X + point2X) / 2;
    var centerY = (point1Y + point2Y) / 2;
    
    
    // Calculate the radius of the circle
    var radius = Math.sqrt(Math.pow(point2X - point1X, 2) + Math.pow(point2Y - point1Y, 2)) / 2;

    // Create the circle path
    var circle = new Path.Circle(new Point(centerX, centerY), radius);
    
    // Set the stroke color and width
    circle.strokeColor = strokeColor;
    circle.strokeWidth = strokeWidth;

    // Return the circle path
    return circle;
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColour() {
    colours = [
        '#E02D15',
        '#0A8B99',
        '#37323E',
        'orange'
    ]

    let index = getRandomInt(0, colours.length - 1);

    return colours[index]
}




function saveCanvasAsImage(canvasId, filename) {
    // Get the canvas element
    const canvas = document.getElementById(canvasId);
    
    // Create a temporary link element
    const link = document.createElement('a');
    
    // Set the href attribute to the data URL of the canvas image
    link.href = canvas.toDataURL('image/png');
    
    // Set the download attribute to specify the filename
    link.download = filename;
    
    // Simulate a click on the link to trigger the download
    link.click();
}
