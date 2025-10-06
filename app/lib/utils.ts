// Utility functions for React Router v7
export function json(data: any, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });
}

export function redirect(url: string, init?: ResponseInit) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: url,
      ...init?.headers,
    },
    ...init,
  });
}
