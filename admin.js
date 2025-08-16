document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const image = document.getElementById('product-image').value;

    // Generate a unique-ish ID using the current timestamp
    const id = Date.now();

    const newProduct = {
        id: id,
        name: name,
        description: description,
        price: price,
        image: image
    };

    // Convert the object to a formatted JSON string
    const jsonString = JSON.stringify(newProduct, null, 2);

    // Display the JSON output
    const outputContainer = document.getElementById('json-output-container');
    const outputPre = document.getElementById('json-output');

    outputPre.textContent = jsonString;
    outputContainer.style.display = 'block';

    // Optional: Scroll to the output
    outputContainer.scrollIntoView({ behavior: 'smooth' });
});
