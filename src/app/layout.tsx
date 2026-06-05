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
      <body className="bg-background text-foreground min-h-screen flex flex-col selection:bg-gold-500/30">
        <Navbar />
        <main className="flex-grow w-full flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
