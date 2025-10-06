import { json } from "../lib/utils";
import { useLoaderData, Link, useSearchParams } from "react-router-dom";
import { getBooks } from "../lib/api";
import type { Book } from "../lib/api";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const sort = url.searchParams.get("sort") || "title";
  const order = url.searchParams.get("order") || "ascending";
  
  const books = await getBooks();
  
  const sortedBooks = [...books].sort((a, b) => {
    let aValue: any = a[sort as keyof Book];
    let bValue: any = b[sort as keyof Book];
    
    if (sort === "price") {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }
    
    if (order === "ascending") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
  
  return json({ books: sortedBooks, sort, order });
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

export default function Index() {
  const { books, sort, order } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (newSort: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort", newSort);
    setSearchParams(newSearchParams);
  };

  const handleOrderChange = (newOrder: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("order", newOrder);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="books-container">
      <img 
        src="/assets/images/logo.svg" 
        alt="Book Store Logo"
        className="logo"
      />

      <div className="sort-container">
        <div className="sort-section">
          <label className="sort-label">Sort by:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="sort"
                value="title"
                checked={sort === "title"}
                onChange={() => handleSortChange("title")}
              />
              Title
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="sort"
                value="author"
                checked={sort === "author"}
                onChange={() => handleSortChange("author")}
              />
              Author
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="sort"
                value="price"
                checked={sort === "price"}
                onChange={() => handleSortChange("price")}
              />
              Price
            </label>
          </div>
        </div>
        
        <div className="sort-section">
          <label className="sort-label">Order:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="order"
                value="ascending"
                checked={order === "ascending"}
                onChange={() => handleOrderChange("ascending")}
              />
              Ascending
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="order"
                value="descending"
                checked={order === "descending"}
                onChange={() => handleOrderChange("descending")}
              />
              Descending
            </label>
          </div>
        </div>
      </div>

      <div className="book-list">
        {books.map((book: { id: string; title: string; author: string; price: number }) => (
          <Link 
            key={book.id} 
            to={`/books/${book.id}`}
            className="book-card"
          >
            <img 
              src={getBookImagePath(book.id)} 
              alt={`${book.title} cover`}
              className="book-image"
              onError={(e) => {
                e.currentTarget.src = "/assets/images/books/placeholder.svg";
              }}
            />
            <h3 className="book-title">
              {book.title}
            </h3>
            <p className="book-author">
              by {book.author}
            </p>
            <p className="book-price">
              ${book.price}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}