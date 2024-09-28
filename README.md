# Book Management System

A web application to manage and review books. Users can add, modify, and view books along with their reviews, notes and ratings.

## Project Description

This project is a book management system that allows users to keep track of books they have read, along with their reviews, notes and ratings. The application fetches book cover images from the Open Library API.

## Features

- Add new books with details like ISBN, name, author, read date, rating, review, and Amazon link.
- Modify existing book details and notes.
- View a list of books with their details and reviews, with sorting.
- Fetch book cover images from the Open Library API.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/linhbuitung/book-reviews.git
    cd book-reviews
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    PG_USER=your_postgres_user
    PG_HOST=your_postgres_host
    PG_DATABASE=your_postgres_database
    PG_PASSWORD=your_postgres_password
    PG_PORT=your_postgres_port
    ```
    You can use my queries in queries.sql to create initial data

4. Start the server:
    ```bash
    node index.js
    ```

    ```bash
    node api-server.js
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Use the web interface to add, modify, and view books.

## API Endpoints

Sure! Here is a detailed API endpoint documentation that you can include in your GitHub README file.

### API Endpoints

#### GET /books

Fetch a list of books. Optionally, you can sort the books by a specific category and order.

**Query Parameters:**
- [`category`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FF%3A%2FWebDevStudy%2Fudemy%2Fcapstone-postgres%2Fapi-server.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A30%2C%22character%22%3A32%7D%7D%5D%2C%22b96d7d5d-4d6a-4f2e-a338-c2b55e3aacea%22%5D "Go to definition") (optional): The category to sort by (e.g., [`name`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FF%3A%2FWebDevStudy%2Fudemy%2Fcapstone-postgres%2Fapi-server.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A136%2C%22character%22%3A13%7D%7D%5D%2C%22b96d7d5d-4d6a-4f2e-a338-c2b55e3aacea%22%5D "Go to definition"), [`author`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FF%3A%2FWebDevStudy%2Fudemy%2Fcapstone-postgres%2Fapi-server.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A137%2C%22character%22%3A13%7D%7D%5D%2C%22b96d7d5d-4d6a-4f2e-a338-c2b55e3aacea%22%5D "Go to definition"), [`rating`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FF%3A%2FWebDevStudy%2Fudemy%2Fcapstone-postgres%2Fapi-server.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A128%2C%22character%22%3A15%7D%7D%5D%2C%22b96d7d5d-4d6a-4f2e-a338-c2b55e3aacea%22%5D "Go to definition")).
- [`order`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FF%3A%2FWebDevStudy%2Fudemy%2Fcapstone-postgres%2Fapi-server.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A31%2C%22character%22%3A29%7D%7D%5D%2C%22b96d7d5d-4d6a-4f2e-a338-c2b55e3aacea%22%5D "Go to definition") (optional): The order to sort (asc or desc).

**Response:**
```json
[
    {
        "id": 1,
        "isbn": "978-3-16-148410-0",
        "name": "Book Name",
        "author": "Author Name",
        "read_date": "2023-10-01",
        "rating": 8,
        "review": "This is a review.",
        "amazon_link": "https://amazon.com/book",
        "url": "https://covers.openlibrary.org/b/isbn/978-3-16-148410-0-M.jpg"
    },
    ...
]
```

#### GET /book/:id

Fetch details of a specific book by its ID.

**Path Parameters:**
- [`id`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FF%3A%2FWebDevStudy%2Fudemy%2Fcapstone-postgres%2Fapi-server.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A53%2C%22character%22%3A7%7D%7D%5D%2C%22b96d7d5d-4d6a-4f2e-a338-c2b55e3aacea%22%5D "Go to definition"): The ID of the book.

**Response:**
```json
{
    "id": 1,
    "isbn": "978-3-16-148410-0",
    "name": "Book Name",
    "author": "Author Name",
    "read_date": "2023-10-01",
    "rating": 8,
    "review": "This is a review.",
    "amazon_link": "https://amazon.com/book",
    "url": "https://covers.openlibrary.org/b/isbn/978-3-16-148410-0-M.jpg"
}
```

#### GET /book/:id/notes

Fetch all notes for a specific book by its ID.

**Path Parameters:**
- [`id`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FF%3A%2FWebDevStudy%2Fudemy%2Fcapstone-postgres%2Fapi-server.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A53%2C%22character%22%3A7%7D%7D%5D%2C%22b96d7d5d-4d6a-4f2e-a338-c2b55e3aacea%22%5D "Go to definition"): The ID of the book.

**Response:**
```json
[
    {
        "id": 1,
        "book_id": 1,
        "content": "This is a note."
    },
    ...
]
```

#### GET /notes

Fetch all notes.

**Response:**
```json
[
    {
        "id": 1,
        "book_id": 1,
        "content": "This is a note."
    },
    ...
]
```

#### GET /note/:id

Fetch details of a specific note by its ID.

**Path Parameters:**
- [`id`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FF%3A%2FWebDevStudy%2Fudemy%2Fcapstone-postgres%2Fapi-server.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A53%2C%22character%22%3A7%7D%7D%5D%2C%22b96d7d5d-4d6a-4f2e-a338-c2b55e3aacea%22%5D "Go to definition"): The ID of the note.

**Response:**
```json
{
    "id": 1,
    "book_id": 1,
    "content": "This is a note."
}
```

#### POST /book

Add a new book.

**Request Body:**
```json
{
    "isbn": "978-3-16-148410-0",
    "name": "Book Name",
    "author": "Author Name",
    "read_date": "2023-10-01",
    "rating": 8,
    "review": "This is a review.",
    "amazon_link": "https://amazon.com/book"
}
```

**Response:**
```json
{
    "id": 1,
    "isbn": "978-3-16-148410-0",
    "name": "Book Name",
    "author": "Author Name",
    "read_date": "2023-10-01",
    "rating": 8,
    "review": "This is a review.",
    "amazon_link": "https://amazon.com/book"
}
```

#### POST /book/:id/note

Add a new note to a specific book by its ID.

**Path Parameters:**
- [`id`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FF%3A%2FWebDevStudy%2Fudemy%2Fcapstone-postgres%2Fapi-server.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A53%2C%22character%22%3A7%7D%7D%5D%2C%22b96d7d5d-4d6a-4f2e-a338-c2b55e3aacea%22%5D "Go to definition"): The ID of the book.

**Request Body:**
```json
{
    "content": "This is a note."
}
```

**Response:**
```json
{
    "id": 1,
    "book_id": 1,
    "content": "This is a note."
}
```

#### PUT /book/:id

Update details of a specific book by its ID.

**Path Parameters:**
- [`id`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FF%3A%2FWebDevStudy%2Fudemy%2Fcapstone-postgres%2Fapi-server.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A53%2C%22character%22%3A7%7D%7D%5D%2C%22b96d7d5d-4d6a-4f2e-a338-c2b55e3aacea%22%5D "Go to definition"): The ID of the book.

**Request Body:**
```json
{
    "isbn": "978-3-16-148410-0",
    "name": "Updated Book Name",
    "author": "Updated Author Name",
    "read_date": "2023-10-01",
    "rating": 9,
    "review": "This is an updated review.",
    "amazon_link": "https://amazon.com/updated-book"
}
```

**Response:**
```json
{
    "id": 1,
    "isbn": "978-3-16-148410-0",
    "name": "Updated Book Name",
    "author": "Updated Author Name",
    "read_date": "2023-10-01",
    "rating": 9,
    "review": "This is an updated review.",
    "amazon_link": "https://amazon.com/updated-book"
}
```

#### PUT /note/:id

Update details of a specific note by its ID.

**Path Parameters:**
- [`id`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FF%3A%2FWebDevStudy%2Fudemy%2Fcapstone-postgres%2Fapi-server.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A53%2C%22character%22%3A7%7D%7D%5D%2C%22b96d7d5d-4d6a-4f2e-a338-c2b55e3aacea%22%5D "Go to definition"): The ID of the note.

**Request Body:**
```json
{
    "content": "This is an updated note.",
    "book_id": 1
}
```

**Response:**
```json
{
    "id": 1,
    "book_id": 1,
    "content": "This is an updated note."
}
```

#### DELETE /book/:id

Delete a specific book by its ID.

**Path Parameters:**
- [`id`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FF%3A%2FWebDevStudy%2Fudemy%2Fcapstone-postgres%2Fapi-server.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A53%2C%22character%22%3A7%7D%7D%5D%2C%22b96d7d5d-4d6a-4f2e-a338-c2b55e3aacea%22%5D "Go to definition"): The ID of the book.

**Response:**
```json
{
    "message": "Book deleted with id 1"
}
```

#### DELETE /note/:id

Delete a specific note by its ID.

**Path Parameters:**
- [`id`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FF%3A%2FWebDevStudy%2Fudemy%2Fcapstone-postgres%2Fapi-server.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A53%2C%22character%22%3A7%7D%7D%5D%2C%22b96d7d5d-4d6a-4f2e-a338-c2b55e3aacea%22%5D "Go to definition"): The ID of the note.

**Response:**
```json
{
    "message": "Note deleted with id 1"
}
```

### Summary
- **GET /books**: Fetch a list of books with optional sorting.
- **GET /book/:id**: Fetch details of a specific book.
- **GET /book/:id/notes**: Fetch all notes for a specific book.
- **GET /notes**: Fetch all notes.
- **GET /note/:id**: Fetch details of a specific note.
- **POST /book**: Add a new book.
- **POST /book/:id/note**: Add a new note to a specific book.
- **PUT /book/:id**: Update details of a specific book.
- **PUT /note/:id**: Update details of a specific note.
- **DELETE /book/:id**: Delete a specific book.
- **DELETE /note/:id**: Delete a specific note.


## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- EJS (Embedded JavaScript templates)
- Axios

