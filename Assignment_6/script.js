const API_URL = "https://fakestoreapi.com/products";

async function getProducts() {
    const response = await fetch(API_URL);
    const data = await response.json();

    console.log("Products:", data);
}

async function addProduct() {
    const product = {
        title: "Wireless Headphones",
        price: 1999,
        category: "electronics"
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });

    const data = await response.json();

    console.log("Added Product:", data);
}

async function updateProduct() {
    const product = {
        title: "Updated Wireless Headphones",
        price: 2499,
        description: "Completely updated product",
        category: "electronics",
        image: "https://i.pravatar.cc"
    };

    const response = await fetch(`${API_URL}/1`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });

    const data = await response.json();

    console.log("Updated Product:", data);
}

async function updatePrice() {
    const response = await fetch(`${API_URL}/1`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            price: 2999
        })
    });

    const data = await response.json();

    console.log("Updated Price:", data);
}

async function deleteProduct() {
    const response = await fetch(`${API_URL}/1`, {
        method: "DELETE"
    });

    const data = await response.json();

    console.log("Deleted Product:", data);
}