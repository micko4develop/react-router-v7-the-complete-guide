import { json, redirect } from "../lib/utils";
import { useLoaderData, Link, Form } from "react-router-dom";
import { getBooks, deleteBook } from "../lib/api";
import type { Book } from "../lib/api";

export async function loader({ request }: { request: Request }) {
  const books = await getBooks();
  return json({ books });
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const action = formData.get("action");
  const id = formData.get("id") as string;

  if (action === "delete" && id) {
    try {
      await deleteBook(id);
      return redirect("/admin");
    } catch (error) {
      console.error("Error deleting book:", error);
      return json({ error: "Failed to delete book" }, { status: 500 });
    }
  }

  return json({ error: "Invalid action" }, { status: 400 });
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

export default function Admin() {
  const { books } = useLoaderData() as { books: Book[] };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">
          Admin
        </h1>
        <Link 
          to="new"
          className="new-book-link"
        >
          New
        </Link>
      </div>
      
      <div className="admin-book-list">
        {books.map((book) => (
          <div key={book.id} className="admin-book-card">
            <div className="admin-book-info">
              <img 
                src={getBookImagePath(book.id)} 
                alt={`${book.title} cover`}
                className="admin-book-image"
                onError={(e) => {
                  e.currentTarget.src = "/assets/images/books/placeholder.svg";
                }}
              />
              <div className="admin-book-details">
                <h3 className="admin-book-title">
                  {book.title}
                </h3>
                <p className="admin-book-author">
                  by {book.author}
                </p>
                <p className="admin-book-price">
                  ${book.price}
                </p>
              </div>
            </div>
            <div className="action-buttons">
              <Link 
                to={`/admin/${book.id}`}
                className="edit-button"
              >
                ✏️ Edit
              </Link>
              <Form method="post" style={{ display: "inline" }}>
                <input type="hidden" name="action" value="delete" />
                <input type="hidden" name="id" value={book.id} />
                <button 
                  type="submit" 
                  className="delete-button"
                  onClick={(e) => {
                    if (!confirm("Are you sure you want to delete this book?")) {
                      e.preventDefault();
                    }
                  }}
                >
                  Delete
                </button>
              </Form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}