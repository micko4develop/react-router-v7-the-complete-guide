import { json } from "../lib/utils";
import { useLoaderData, Link } from "react-router-dom";
import { getBook } from "../lib/api";
import type { Book } from "../lib/api";

export async function loader({ params }: { params: { id: string } }) {
  const book = await getBook(params.id!);
  
  if (!book) {
    throw new Response("Book not found", { status: 404 });
  }
  
  return json({ book });
}

function getBookImagePath(bookId: string): string {
  const imageMap: Record<string, string> = {
    "1": "brave.png",
    "2": "catcher.png", 
    "3": "code.png",
    "4": "farm.png",
    "5": "gatsby.png",
    "6": "hobbit.png",
    "7": "kill.png",
    "8": "pride.png",
    "9": "t.png"
  };
  
  const imageName = imageMap[bookId] || "placeholder.svg";
  return `/assets/images/books/${imageName}`;
}

export default function BookDetail() {
  const { book } = useLoaderData() as { book: Book };

  return (
    <div className="book-container">
      <img 
        src={getBookImagePath(book.id)} 
        alt={book.title}
        className="book-detail-image"
        onError={(e) => {
          e.currentTarget.src = "/assets/images/books/placeholder.svg";
        }}
      />
      <h1 className="book-detail-title">
        {book.title}
      </h1>
      <h2 className="book-detail-author">
        by {book.author}
      </h2>
      <div className="book-detail-price">
        ${book.price}
      </div>
      <p className="book-description">
        {book.description || "No description available for this book."}
      </p>
      <Link 
        to="/"
        className="back-link"
      >
        ← Back to Books
      </Link>
    </div>
  );
}