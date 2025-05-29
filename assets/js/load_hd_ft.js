// load_components.js
//load header and footer cho index
document.addEventListener('DOMContentLoaded', function() {
    // Function to load HTML content from a file
    function loadHTML(filePath, elementId) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // Create a temporary div to parse the HTML
                const temp = document.createElement('div');
                temp.innerHTML = html;

                // Insert the content into the placeholder
                document.getElementById(elementId).innerHTML = html;

                // Load any scripts within the fetched HTML
                const scripts = temp.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                });
            })
            .catch(error => {
                console.error(`Error loading ${filePath}:`, error);
            });
    }

    // Load header and footer
    loadHTML('header.html', 'header-placeholder');
    loadHTML('footer.html', 'footer-placeholder');
}); 