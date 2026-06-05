import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-background/80 backdrop-blur-md border-b border-white/5 flex justify-center">
      <div className="w-full max-w-7xl px-6 md:px-12 flex justify-between items-center h-full">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all">
            <span className="text-background font-black text-xl leading-none">I</span>
          </div>
          <span className="text-xl font-bold tracking-widest text-foreground group-hover:text-gold-500 transition-colors">
            INK<span className="text-muted font-light">&</span>GOLD
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/book" className="text-sm font-semibold text-muted hover:text-foreground transition-colors">Book</Link>
          <Link href="/pricing" className="text-sm font-semibold text-muted hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/dashboard" className="text-sm font-semibold text-muted hover:text-foreground transition-colors">Dashboard</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button href="/book" variant="primary" size="sm" className="hidden sm:inline-flex">
            Book Now
          </Button>
        </div>
      </div>
    </header>
  );
}
