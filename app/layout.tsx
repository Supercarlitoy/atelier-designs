import "./globals.css";

export const metadata = {
  title: "Designers. Curated. Melbourne.",
  description: "Curated Melbourne designers directory"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
