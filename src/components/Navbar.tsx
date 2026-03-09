import { useState } from "react";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const links = ["Home", "Goals", "Planner", "Progress", "BMI", "Leaderboard"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = async () => {
    if (session) {
      await signOut();
      toast.success("Signed out successfully");
    } else {
      navigate("/auth");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#home" className="font-heading text-2xl tracking-wider text-primary">
          FITFORGE
        </a>
        <div className="hidden md:flex gap-6 items-center">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="font-mono text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors uppercase"
            >
              {l}
            </a>
          ))}
          <button
            onClick={handleAuthAction}
            className="flex items-center gap-1.5 font-mono text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors uppercase ml-2"
          >
            {session ? <LogOut size={14} /> : <LogIn size={14} />}
            {session ? "Logout" : "Login"}
          </button>
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
          <button
            onClick={() => { setOpen(false); handleAuthAction(); }}
            className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors uppercase text-left flex items-center gap-2"
          >
            {session ? <LogOut size={14} /> : <LogIn size={14} />}
            {session ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
