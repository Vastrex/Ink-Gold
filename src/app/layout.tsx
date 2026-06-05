import '@/app/globals.css';

export const metadata = {
  title: 'INK & GOLD',
  description: 'Tattoo artist scheduling app',
};

import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-on-background min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg">
          {children}
        </main>
      </body>
    </html>
  );
}
