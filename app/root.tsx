import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/app/styles/global.css" />
      </head>
      <body>
        <div className="app-container">
          <div className="content-wrapper">
            <div className="main-layout">
              <Navigation />
              <Outlet />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}