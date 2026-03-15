import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;
  const whatsappUrl = "https://wa.me/919866667015";

  return (
    <footer
      id="contact"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #111827 40%, #1a1006 100%)",
      }}
    >
      {/* Decorative gold glow */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-64 w-96 rounded-full bg-yellow-500/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-48 w-72 rounded-full bg-yellow-600/5 blur-2xl" />

      {/* Top gold border */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #eab308 30%, #eab308 70%, transparent)",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-yellow-500/30 blur-sm" />
                <img
                  src="/assets/uploads/pis-logo-1.jpeg"
                  alt="PRAGATI IT SOLUTIONS"
                  className="relative h-14 w-14 rounded-full object-cover ring-2 ring-yellow-500"
                />
              </div>
              <div>
                <div className="font-display text-base font-bold text-white leading-tight">
                  PRAGATI IT SOLUTIONS
                </div>
                <div className="text-xs tracking-widest text-yellow-400/80 uppercase mt-0.5">
                  Your Trusted IT Partner
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Authorized distributor of Microsoft, Kaspersky, Dell, HP, Lenovo,
              and many more leading IT brands.
            </p>
            <div className="mt-4 inline-block rounded-md border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5">
              <p className="text-xs font-mono text-yellow-300/90">
                GST: 36AAPFP3849P1Z9
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="mb-5 font-display text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: "#eab308" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", to: "/" as const },
                { label: "Products", to: "/products" as const },
                { label: "Admin Panel", to: "/admin" as const },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-yellow-400"
                  >
                    <span className="h-px w-4 bg-gray-600 transition-all group-hover:w-6 group-hover:bg-yellow-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="mb-5 font-display text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: "#eab308" }}
            >
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-500/15 mt-0.5">
                  <Phone className="h-3.5 w-3.5 text-yellow-400" />
                </div>
                <a
                  href="tel:+919866667015"
                  className="text-sm text-gray-300 transition-colors hover:text-yellow-400"
                  data-ocid="contact.phone.link"
                >
                  +91 98666 67015
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/15 mt-0.5">
                  <svg
                    role="img"
                    aria-label="WhatsApp"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-3.5 w-3.5 text-green-400"
                  >
                    <title>WhatsApp</title>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gray-300 transition-colors hover:text-green-400"
                  data-ocid="contact.whatsapp.link"
                >
                  WhatsApp: +91 98666 67015
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-500/15 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-yellow-400" />
                </div>
                <span className="text-sm leading-relaxed text-gray-300">
                  2nd Floor, 5/5/51 Room No 209A,
                  <br />
                  Mittal Chamber, M.G. Road,
                  <br />
                  Secunderabad, Hyderabad,
                  <br />
                  Telangana - 500003
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col items-center justify-between gap-3 pt-6 md:flex-row"
          style={{ borderTop: "1px solid rgba(234,179,8,0.15)" }}
        >
          <p className="text-xs text-gray-500">
            &copy; {year} PRAGATI IT SOLUTIONS. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Built with &#10084; using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noreferrer"
              className="text-yellow-600 underline hover:text-yellow-400"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
