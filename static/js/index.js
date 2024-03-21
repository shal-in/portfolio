console.log('index.js')

// Select all elements with the class name "hyperlink"
const elements = document.getElementsByClassName('hyperlink');

Array.from(elements).forEach(element => {
    let link = element.getAttribute('link');

    element.addEventListener('click', () => {
        hyperlinkFunction(link);
    })
});

function hyperlinkFunction(link) {
    console.log(link);
}