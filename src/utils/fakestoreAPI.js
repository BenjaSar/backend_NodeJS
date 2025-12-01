const API_URL_BASE = "https://fakestoreapi.com";

export async function readAllProducts() {
  const configuration = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(`${API_URL_BASE}/products`, configuration);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorText}`
      );
    }
    const data = await response.json();
    data.forEach((product) => {
      console.log(`- ${product.title}`);
    });
    return data;
  } catch (error) {
    console.log("Network or parsing error:", error.message);
  } finally {
    console.log("All products were read");
  }
}

export async function readProductById(id) {
  const configuration = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await fetch(
      `${API_URL_BASE}/${id}`,
      configuration
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorText}`
      );
    }
  } catch (error) {
    console.log("Error:", error);
  } finally {
    console.log(`Product with id ${id} was read`);
  }
}

export async function createProduct(product) {
  const configuration = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  };
  try {
    const response = await fetch(`${API_URL_BASE}/products`, configuration);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorText}`
      );
    }
    const data = await response.json();
    console.log("Created product:", data);
    console.log(
      `Product with title "${product.title}" was created successfully`
    );
    return data;
  } catch (error) {
    console.error("Error creating product:", error.message);
    throw error;
  } finally {
    console.log(`Product with title ${product.title} was created`);
  }
}

export async function updateProduct(id, product) {
  const configuration = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  };
  try {
    const response = await fetch(
      `${API_URL_BASE}/products/${id}`,
      configuration
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorText}`
      );
    }
    const data = await response.json();
    console.log("Updated product:", data);
  } catch (error) {
    console.log("Error updating product:", error.message);
  } finally {
    console.log(`Product with id ${id} was updated`);
  }
}

export async function deleteProduct(id) {
  const configuration = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await fetch(
      `${API_URL_BASE}/${id}`,
      configuration
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorText}`
      );
    }
    const data = await response.json();
    console.log("Deleted product:", data);
    return data;
  } catch (error) {
    console.log("Error:", error);
  } finally {
    console.log(`Product with id ${id} was deleted`);
  }
}
