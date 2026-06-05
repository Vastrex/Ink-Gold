import Link from 'next/link';

export default function Navbar() {
  return (
    // Desktop top bar – hidden on mobile (mobile header is in layout)
    <header className="hidden md:flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-16 bg-surface shadow-md border-b border-outline-variant">
      <div className="flex items-center gap-4">
        <span className="text-headline-md font-headline-md font-black tracking-tighter text-primary">
          INK &amp; GOLD
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-primary cursor-pointer active:opacity-80 transition-opacity hover:text-secondary-container duration-200">
          notifications
        </span>
        <span className="material-symbols-outlined text-primary cursor-pointer active:opacity-80 transition-opacity hover:text-secondary-container duration-200">
          account_circle
        </span>
      </div>
    </header>
  );
}
