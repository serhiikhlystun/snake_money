"use client";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";
import favicon from './../../public/img/favicon.png';

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <html className="" lang="en">
          <head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=0.5"
            />
            <title>SnakeMoney</title>
            <link rel="icon" href={favicon.src} />
          </head>
          <body
            className="App"
            style={{ fontFamily: "Ravi Prakash, system-ui" }}
          >
            {children}
          </body>
        </html>
      </SessionProvider>
    </QueryClientProvider>
  );
}
