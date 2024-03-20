console.log('canvas-test.js')

// Initialize Paper.js
paper.install(window);
window.onload = function() {
    paper.setup('myCanvas'); // Set up Paper.js with the canvas element

    // Create a fixed-size canvas with dimensions 200x200
    var canvasWidth = 200;
    var canvasHeight = 200;

    // Draw a rectangle to serve as the canvas border
    var borderRect = new Path.Rectangle({
        point: [0, 0],
        size: [canvasWidth, canvasHeight],
        strokeColor: 'black',
        strokeWidth: 1,
        dashArray: [2, 2] // Define the dash pattern for the outline
    });


    // Draw lines
    drawLine([getRandomInt(0,60),60], [getRandomInt(140,200), 60], getRandomColour(), 2); // Draw a horizontal line
    let topPoint = [getRandomInt(70, 130), 60];
    // plotPoint(topPoint, 'red', 2)
    drawCircle(topPoint, getRandomColour(), getRandomInt(15, 50))

    drawLine([getRandomInt(0,60),140], [getRandomInt(140,200), 140], getRandomColour(), 2); // Draw a horizontal line
    let bottomPoint = [getRandomInt(70,130), 140]
    // plotPoint(bottomPoint, 'red', 2)
    drawCircle(bottomPoint, getRandomColour(), getRandomInt(15, 50))


    drawLine([60,getRandomInt(0,60)], [60, getRandomInt(140,200)], getRandomColour(), 2); // Draw a vertical line;
    let leftPoint = [60, getRandomInt(70, 130)]
    // plotPoint(leftPoint, 'red', 2)
    drawCircle(leftPoint, getRandomColour(), getRandomInt(15, 50))


    drawLine([140,getRandomInt(0, 60)], [140, getRandomInt(140,200)], getRandomColour(), 2); // Draw a vertical line
    let rightPoint = [140, getRandomInt(70, 130)]
    // plotPoint(rightPoint, 'red', 2)
    drawCircle(rightPoint, getRandomColour(), getRandomInt(15, 50))

    // num = getRandomInt(2, 11)
    num = 2
    for (let i=0; i <= num; i++) {
        startX = getRandomInt(0, 200);
        startY = getRandomInt(0,200);

        endX = startX + getRandomInt(40,200);
        if (endX > 200) {
            endX = 200;
        }

        endY = startY

        drawLine([startX, startY], [endX, endY], getRandomColour(), 2)
    }

    for (let i=0; i <= num; i++) {
        startX = getRandomInt(0, 200);
        startY = getRandomInt(0,200);

        endY = startY + getRandomInt(40,200);
        if (endY > 200) {
            endY = 200;
        }

        endX = startX

        drawLine([startX, startY], [endX, endY], getRandomColour(), 2)
    }






    // var downloadBtn = new Group(); // Create a group for button elements

    // var btnRect = new Path.Rectangle({
    //     point: [10, 10],
    //     size: [100, 30],
    //     fillColor: 'blue'
    // });

    // var btnText = new PointText({
    //     point: [35, 30],
    //     content: 'Download',
    //     fillColor: 'white'
    // });

    // downloadBtn.addChild(btnRect);
    // downloadBtn.addChild(btnText);


    // downloadBtn.onMouseDown = function(event) {
    //     console.log('teadasd')
    // }





    // Automatically adjust the canvas size to fit the window
    function onResize(event) {
        view.viewSize = new Size(canvasWidth, canvasHeight);
        borderRect.size = new Size(canvasWidth, canvasHeight);
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

