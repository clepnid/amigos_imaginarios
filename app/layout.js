import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio Pavon",
  description: "Ingeniero software, escritorio virtual versión mínima con proyectos realizados",
  openGraph: {
    title: "Portfolio Pavon",
    description: "Ingeniero software, escritorio virtual versión mínima con proyectos realizados",
    images: ["https://pavon00-port-folio.vercel.app/img.png"]
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0]} />
        {/* Añade otros metadatos si es necesario */}
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
