import { json } from "../lib/utils";
import { useLoaderData, Link, useSearchParams } from "react-router-dom";
import { getBooks } from "../lib/api";
import type { Book } from "../lib/api";

// Constants
const BOOK_IMAGE_MAP: Record<string, string> = {
  "1": "brave.png",
  "2": "catcher.png", 
  "3": "code.png",
  "4": "farm.png",
  "5": "gatsby.png",
  "6": "hobbit.png",
  "7": "kill.png",
  "8": "pride.png",
  "9": "t.png"
} as const;

const PLACEHOLDER_IMAGE = "/assets/images/books/placeholder.svg";
const LOGO_IMAGE = "/assets/images/logo.svg";

const SORT_OPTIONS = [
  { value: "title", label: "Title" },
  { value: "author", label: "Author" },
  { value: "price", label: "Price" }
] as const;

const ORDER_OPTIONS = [
  { value: "ascending", label: "Ascending" },
  { value: "descending", label: "Descending" }
] as const;

// Types
type SortField = "title" | "author" | "price";
type SortOrder = "ascending" | "descending";

// Utility functions
function getBookImagePath(bookId: string): string {
  const imageName = BOOK_IMAGE_MAP[bookId] || "placeholder.svg";
  return `/assets/images/books/${imageName}`;
}

function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.src = PLACEHOLDER_IMAGE;
}

function sortBooks(books: Book[], sortField: SortField, order: SortOrder): Book[] {
  return [...books].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];
    
    if (sortField === "price") {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }
    
    const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    return order === "ascending" ? comparison : -comparison;
  });
}

// Loader
export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const sort = (url.searchParams.get("sort") || "title") as SortField;
  const order = (url.searchParams.get("order") || "ascending") as SortOrder;
  
  const books = await getBooks();
  const sortedBooks = sortBooks(books, sort, order);
  
  return json({ books: sortedBooks, sort, order });
}

// Sort Section Component
function SortSection({ 
  title, 
  name, 
  options, 
  value, 
  onChange 
}: {
  title: string;
  name: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="sort-section">
      <label className="sort-label">{title}:</label>
      <div className="radio-group">
        {options.map((option) => (
          <label key={option.value} className="radio-label">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}

// Book Card Component
function BookCard({ book }: { book: Book }) {
  return (
    <Link 
      key={book.id} 
      to={`/books/${book.id}`}
      className="book-card"
    >
      <img 
        src={getBookImagePath(book.id)} 
        alt={`${book.title} cover`}
        className="book-image"
        onError={handleImageError}
      />
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">by {book.author}</p>
      <p className="book-price">${book.price}</p>
    </Link>
  );
}

// Main Component
export default function Index() {
  const { books, sort, order } = useLoaderData() as { 
    books: Book[]; 
    sort: SortField; 
    order: SortOrder; 
  };
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParam = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="books-container">
      <img 
        src={LOGO_IMAGE} 
        alt="Book Store Logo"
        className="logo"
      />

      <div className="sort-container">
        <SortSection
          title="Sort by"
          name="sort"
          options={SORT_OPTIONS}
          value={sort}
          onChange={(value) => updateSearchParam("sort", value)}
        />
        
        <SortSection
          title="Order"
          name="order"
          options={ORDER_OPTIONS}
          value={order}
          onChange={(value) => updateSearchParam("order", value)}
        />
      </div>

      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}