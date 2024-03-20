console.log('index.js')

function setup() {
    // Create a canvas inside the canvas-container div
    let canvas = createCanvas(250, 250);
    canvas.parent('canvas'); // Set the parent container for the canvas
    
    // Set the background color to white
    background('#F1FAEE');
    
    // Draw a circle at coordinates (200, 200) with a radius of 50 pixels
    fill(255, 0, 0); // Set fill color to red
    circle(100, 100, 20);

    // Draw a line from (100, 100) to (300, 300)
    stroke(0, 0, 255); // Set stroke color to blue
    line(0, 0, 250, 250);
    
    // You can add more circles and lines here based on your coordinates
}