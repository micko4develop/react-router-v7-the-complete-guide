export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description?: string;
  image?: string;
}

export interface BookFormData {
  title: string;
  author: string;
  price: number;
  description?: string;
  image?: string;
}

export interface SortOptions {
  sort: "title" | "price";
  order: "ascending" | "descending";
}
