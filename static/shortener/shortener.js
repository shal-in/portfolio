console.log('shortener')
const currentDomain = window.location.origin;
const endpointPath = '/api/check-shortener';
const postRequestPath = `${currentDomain}${endpointPath}`;

shortener = extractShortenerFromCurrentURL()

fetch(postRequestPath, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(shortener),
})
.then(response => response.json())
.then(data => {
    if (data['result'] === 'success') {
        window.location.href = data['url'];
    }
    else if (data['result'] === 'no shortener') {
        alert('invalid url');
        window.location.href = currentDomain;
    }
})



function extractShortenerFromCurrentURL() {
    const currentPath = window.location.pathname;
    const shortener = currentPath.startsWith('/') ? currentPath.slice(1) : currentPath;
    
    return shortener;
}
