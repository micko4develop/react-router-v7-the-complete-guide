// API client for communicating with Express server
const API_BASE_URL = 'http://localhost:3001';

export interface Book {
  id: string;
  title: string;
  author?: string;
  price: number;
  description: string;
  image?: string;
}

export async function getBooks(): Promise<Book[]> {
  const response = await fetch(`${API_BASE_URL}/books`);
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return response.json();
}

export async function getBook(id: string): Promise<Book | null> {
  const response = await fetch(`${API_BASE_URL}/books/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch book');
  }
  return response.json();
}

export async function createBook(book: Omit<Book, 'id'>): Promise<Book> {
  const response = await fetch(`${API_BASE_URL}/books/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ book }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create book');
  }
  return response.json();
}

export async function updateBook(id: string, book: Partial<Book>): Promise<Book> {
  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ book }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update book');
  }
  return response.json();
}

export async function deleteBook(id: string): Promise<Book[]> {
  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete book');
  }
  return response.json();
}
