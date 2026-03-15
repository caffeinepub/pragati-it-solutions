import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const links: { label: string; to: "/" | "/products" | "/admin" }[] = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-navy-deep shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3"
          data-ocid="nav.link"
        >
          <img
            src="/assets/uploads/pis-logo-1.jpeg"
            alt="PRAGATI IT SOLUTIONS Logo"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-yellow-500/60"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-sm font-bold tracking-wide text-white">
              PRAGATI
            </span>
            <span className="text-[10px] tracking-widest text-yellow-400/80 uppercase">
              IT Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid="nav.link"
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                pathname === link.to
                  ? "bg-white/10 text-yellow-400"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link to="/admin" data-ocid="nav.admin.link">
            <Button
              size="sm"
              className="hidden bg-yellow-500 font-semibold text-black hover:bg-yellow-400 md:flex"
            >
              Admin Panel
            </Button>
          </Link>
          <button
            type="button"
            className="p-2 text-white md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-brand-navy md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              data-ocid="nav.admin.link"
            >
              <Button className="mt-2 w-full bg-yellow-500 font-semibold text-black hover:bg-yellow-400">
                Admin Panel
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
