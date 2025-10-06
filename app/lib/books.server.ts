import type { Book } from "./types";

// Mock data - in a real app, this would come from a database
const books: Book[] = [
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

export async function getBooks(): Promise<Book[]> {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return [...books];
}

export async function getBook(id: string): Promise<Book | null> {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return books.find(book => book.id === id) || null;
}

export async function createBook(bookData: Omit<Book, "id">): Promise<Book> {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const newBook: Book = {
    ...bookData,
    id: (books.length + 1).toString()
  };
  
  books.push(newBook);
  return newBook;
}

export async function updateBook(id: string, bookData: Partial<Book>): Promise<Book | null> {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const bookIndex = books.findIndex(book => book.id === id);
  if (bookIndex === -1) return null;
  
  books[bookIndex] = { ...books[bookIndex], ...bookData };
  return books[bookIndex];
}

export async function deleteBook(id: string): Promise<boolean> {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const bookIndex = books.findIndex(book => book.id === id);
  if (bookIndex === -1) return false;
  
  books.splice(bookIndex, 1);
  return true;
}
