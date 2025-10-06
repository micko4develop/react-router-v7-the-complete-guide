# React Router v7 - Framework Mode Complete Guide

A comprehensive React application demonstrating the latest React Router v7 framework mode with modern routing patterns, server-side rendering, and advanced features.

## 🚀 What's New in React Router v7

React Router v7 introduces **Framework Mode** - a complete rewrite that brings:
- **Full-stack React** with server-side rendering
- **File-based routing** with automatic code splitting
- **Built-in data loading** with loaders and actions
- **Progressive enhancement** with form submissions
- **TypeScript support** out of the box
- **Modern tooling** with Vite and ES modules

## 🛠️ Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Setup

1. **Clone and navigate to the project**
   ```bash
   cd react-router-v7-the-complete-guide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Available Scripts

### `npm run dev`
Starts the development server with hot reloading and React Router v7 framework mode.

### `npm run build`
Builds the app for production with optimized bundles and server-side rendering.

### `npm start`
Starts the production server (requires build first).

### `npm run typecheck`
Runs TypeScript type checking without emitting files.

### `npm run lint`
Runs ESLint to check for code quality issues.

## 🏗️ Project Structure

```
app/
├── components/          # Reusable React components
│   └── Navigation.tsx   # Navigation component
├── lib/                 # Utility functions and types
│   ├── books.server.ts  # Server-side data functions
│   └── types.ts         # TypeScript type definitions
├── routes/              # File-based routing
│   ├── _index.tsx       # Home page (/)
│   ├── books.$id.tsx    # Book detail page (/books/:id)
│   ├── admin.tsx        # Admin dashboard (/admin)
│   ├── admin.new.tsx    # Add new book (/admin/new)
│   └── admin.$id.tsx    # Edit book (/admin/:id)
├── styles/              # Global styles
│   └── global.css       # CSS styles
└── root.tsx             # Root layout component
```

## 🛣️ React Router v7 Features

### File-Based Routing

Routes are automatically generated based on file structure:

- `_index.tsx` → `/` (index route)
- `books.$id.tsx` → `/books/:id` (dynamic route)
- `admin.new.tsx` → `/admin/new` (nested route)
- `admin.$id.tsx` → `/admin/:id` (nested dynamic route)

### Data Loading with Loaders

```typescript
export async function loader({ request }: LoaderFunctionArgs) {
  const books = await getBooks();
  return json({ books });
}

export default function BooksPage() {
  const { books } = useLoaderData<typeof loader>();
  // Component automatically receives data
}
```

### Form Actions

```typescript
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const book = await createBook(formData);
  return redirect(`/books/${book.id}`);
}
```

### Progressive Enhancement

Forms work without JavaScript and progressively enhance with client-side features:

```tsx
<Form method="post">
  <input name="title" required />
  <button type="submit">Create Book</button>
</Form>
```

## 🔧 Key Differences from v6

| Feature | React Router v6 | React Router v7 |
|---------|----------------|-----------------|
| **Architecture** | Client-side only | Full-stack framework |
| **Routing** | Component-based | File-based |
| **Data Loading** | Manual (useEffect) | Built-in (loaders) |
| **Forms** | Manual handling | Progressive enhancement |
| **SSR** | Not included | Built-in |
| **TypeScript** | Manual setup | First-class support |

## 🎯 Application Features

### 📖 Book Management
- **Browse Books**: View all available books with sorting
- **Book Details**: Detailed view of individual books
- **Admin Panel**: Full CRUD operations for book management
- **Responsive Design**: Works on all device sizes

### 🔐 Authentication Ready
- **Protected Routes**: Admin routes require authentication
- **Route Guards**: Automatic redirection for unauthorized access
- **Session Management**: Ready for user sessions

### ⚡ Performance Features
- **Code Splitting**: Automatic route-based code splitting
- **Server-Side Rendering**: Fast initial page loads
- **Progressive Enhancement**: Works without JavaScript
- **Optimized Bundles**: Minimal JavaScript for better performance

## 🛠️ Development

### Adding New Routes

1. **Create a new file** in `app/routes/`
2. **Export a default component** for the page
3. **Add loaders/actions** for data handling
4. **The route is automatically available**

Example:
```typescript
// app/routes/about.tsx
export default function About() {
  return <h1>About Us</h1>;
}
```

### Data Loading Patterns

```typescript
// Loader for initial data
export async function loader() {
  return json({ data: await fetchData() });
}

// Action for form submissions
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  await processForm(formData);
  return redirect("/success");
}
```

### Styling

The app uses styled-components for component styling and global CSS for base styles:

```typescript
const StyledButton = styled.button`
  background-color: #00daff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
`;
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 📖 Learning Resources

- [React Router v7 Documentation](https://reactrouter.com/)
- [Remix Documentation](https://remix.run/docs) (React Router v7 is built on Remix)
- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is for educational purposes. Feel free to use and modify as needed.

## 🆘 Troubleshooting

### Common Issues

**App won't start:**
- Ensure Node.js v18+ is installed
- Run `npm install` to install dependencies
- Check for port conflicts (default: 3000)

**Build errors:**
- Run `npm run typecheck` to check TypeScript errors
- Ensure all imports are correct
- Check file naming conventions

**Routing issues:**
- Verify file names match route patterns
- Check loader/action exports
- Ensure proper TypeScript types

### Getting Help

- Check the browser console for error messages
- Review the file structure and naming
- Refer to React Router v7 documentation
- Check TypeScript errors with `npm run typecheck`

---

**Welcome to the future of React routing! 🎉**

React Router v7 framework mode brings the power of full-stack React with modern tooling and excellent developer experience.
