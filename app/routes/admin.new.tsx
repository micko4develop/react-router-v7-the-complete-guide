import { json, redirect } from "../lib/utils";
import { Form, useActionData, useNavigation, Link } from "react-router-dom";
import { createBook } from "../lib/api";
import type { Book } from "../lib/api";

export async function loader({ request }: { request: Request }) {
  return json({});
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;

  // Validation
  const errors: Record<string, string> = {};
  
  if (!title) errors.title = "Title is required";
  if (!author) errors.author = "Author is required";
  if (!price) errors.price = "Price is required";
  if (isNaN(Number(price))) errors.price = "Price must be a number";

  if (Object.keys(errors).length > 0) {
    return json({ errors, values: { title, author, price, description, image } });
  }

  try {
    await createBook({
      title,
      author,
      price: Number(price),
      description,
      image
    });
    
    return redirect("/admin");
  } catch (error) {
    console.error("Error creating book:", error);
    return json({ error: "Failed to create book" }, { status: 500 });
  }
}

export default function NewBook() {
  const actionData = useActionData() as any;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="form-container">
      <h2 className="form-title">
        Create New Book
      </h2>
      
      {actionData?.errors && (
        <div className="error-message">
          Please fix the following errors:
          <ul style={{ margin: "8px 0 0 0", paddingLeft: "20px" }}>
            {Object.keys(actionData.errors).map((key) => (
              <li key={key}>{actionData.errors[key]}</li>
            ))}
          </ul>
        </div>
      )}

      <Form method="post">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={actionData?.values?.title || ""}
            required
            className="form-input"
          />
          {actionData?.errors?.title && (
            <div className="field-error">
              {actionData.errors.title}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="author" className="form-label">
            Author *
          </label>
          <input
            type="text"
            id="author"
            name="author"
            defaultValue={actionData?.values?.author || ""}
            required
            className="form-input"
          />
          {actionData?.errors?.author && (
            <div className="field-error">
              {actionData.errors.author}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            min="0"
            defaultValue={actionData?.values?.price || ""}
            required
            className="form-input"
          />
          {actionData?.errors?.price && (
            <div className="field-error">
              {actionData.errors.price}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={actionData?.values?.description || ""}
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">
            Image Filename
          </label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="e.g., book-cover.jpg"
            defaultValue={actionData?.values?.image || ""}
            className="form-input"
          />
        </div>

        <div className="form-buttons">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="form-button submit-button"
          >
            📚 {isSubmitting ? "Creating..." : "Create Book"}
          </button>
          <Link 
            to="/admin"
            className="form-button cancel-button"
          >
            ❌ Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
}