import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "API Portal",
  description: "Portal de APIs com conversor, documentação e pré-comitê",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js" async></script>
      </head>
      <body>
        <div className="container">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
