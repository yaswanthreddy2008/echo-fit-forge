import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = ["Home", "Goals", "Planner", "Progress", "BMI", "Leaderboard"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#home" className="font-heading text-2xl tracking-wider text-primary">
          FITFORGE
        </a>
        <div className="hidden md:flex gap-6">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="font-mono text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors uppercase"
            >
              {l}
            </a>
          ))}
        </div>
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors uppercase"
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
