import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inboop - Instagram Lead Management",
  description: "Manage your Instagram DM leads and convert them to customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
