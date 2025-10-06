import express from "express";
import cors from "cors";


const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));
app.options('*', cors());

app.use(express.json());

let books = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    description: "A classic American novel set in the Jazz Age.",
    image: "placeholder.svg"
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 14.99,
    description: "A gripping tale of racial injustice and childhood innocence.",
    image: "placeholder.svg"
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    price: 13.99,
    description: "A dystopian social science fiction novel.",
    image: "placeholder.svg"
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 11.99,
    description: "A romantic novel of manners written by Jane Austen.",
    image: "placeholder.svg"
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 15.99,
    description: "A coming-of-age story about teenage rebellion.",
    image: "placeholder.svg"
  },
  {
    id: "6",
    title: "Animal Farm",
    author: "George Orwell",
    price: 10.99,
    description: "An allegorical novella about farm animals who rebel against their human farmer.",
    image: "placeholder.svg"
  },
  {
    id: "7",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 16.99,
    description: "A fantasy novel about a hobbit's unexpected journey.",
    image: "placeholder.svg"
  },
  {
    id: "8",
    title: "Brave New World",
    author: "Aldous Huxley",
    price: 13.99,
    description: "A dystopian social science fiction novel.",
    image: "placeholder.svg"
  },
  {
    id: "9",
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 45.99,
    description: "A handbook of agile software craftsmanship.",
    image: "placeholder.svg"
  }
];

app.get("/books", (req, res) => res.json(books));

app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === id);
  if (book) return res.json(book);
  res.status(400).send();
});

app.post("/books/new", (req, res) => {
  const { book } = req.body;
  
  // Generate new ID - find the highest existing ID and increment
  const maxId = Math.max(...books.map(b => parseInt(b.id) || 0), 0);
  const newId = (maxId + 1).toString();
  const newBook = { ...book, id: newId };
  
  books.push(newBook);
  res.json(newBook);
});

app.post("/books/:id", (req, res) => {
  const { id } = req.params;
  const { book: updatedBook } = req.body;

  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  books[bookIndex] = { ...books[bookIndex], ...updatedBook };
  res.json(books[bookIndex]);
});

app.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  books.splice(bookIndex, 1);
  res.json(books);
});

let SERVER_PORT = 3001;
app.listen(SERVER_PORT, () =>
  console.log(`Server is listening on port: ${SERVER_PORT}`)
);
