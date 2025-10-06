import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("books/:id", "routes/books.$id.tsx"),
  route("admin", "routes/admin.tsx"),
  route("admin/new", "routes/admin.new.tsx"),
  route("admin/:id", "routes/admin.$id.tsx"),
] satisfies RouteConfig;
