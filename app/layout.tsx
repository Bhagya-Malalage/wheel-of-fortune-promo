import "./globals.css";

export const metadata = {
  title: "Wheel of Fortune",
  description: "Spin to win exclusive rewards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
