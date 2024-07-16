import favicon from "./../../public/img/favicon.png";
import ProvidersLayout from "@/components/providers/providersLayout";

export const viewport = {
  width: 'device-width',
  initialScale: 0.5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="eu">
      <head>
        <link rel="icon" href={favicon.src} />
        <title>SnakeMoney</title>
      </head>
      <ProvidersLayout>
        <body className="App" style={{ fontFamily: "Ravi Prakash, system-ui" }}>
          {children}
        </body>
      </ProvidersLayout>
    </html>
  );
}
