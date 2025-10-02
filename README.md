![header](doc/imgs/LogoHeader.png)

# Project Store API Client

This project demonstrates how to handle HTTP requests to a fake store API using JavaScript's `fetch` API. It provides functions to perform CRUD operations (Create, Read, Update, Delete) on products.

## Features

- Read all products
- Read a product by ID
- Create a new product
- Update an existing product
- Delete a product

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended for built-in fetch support)

### Installation

1. Clone this repository:
   ```sh
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```sh
   cd Project
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

## Usage

The application supports the following commands:

### Read All Products
```sh
node app/index.js GET products
```

### Read Product by ID
```sh
node app/index.js GET products/id_product
```

### Create New Product
```sh
node app/index.js POST products "product_title" "product_price" "product_description"
```

### Update Product
```sh
node app/index.js UPDATE products id_product price description_product
```

### Delete Product
```sh
node app/index.js DELETE products/id_product
```

## API Reference

### Commands Structure

| Command | Format | Description |
|---------|---------|-------------|
| GET | `GET products` | Retrieve all products |
| GET | `GET products/{id}` | Retrieve a specific product |
| POST | `POST products {title} {price} {description}` | Create a new product |
| PUT | `PUT products/{id} {newTitle}` | Update a product |
| DELETE | `DELETE products/{id}` | Delete a product |

## Error Handling

- Invalid commands will display an error message
- The application will exit with code 1 for unrecognized commands
- Network errors and API responses are properly handled

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

MIT

## Author

FS

---

Done with :heart:

![footer](doc/imgs/LogoFooter.png)