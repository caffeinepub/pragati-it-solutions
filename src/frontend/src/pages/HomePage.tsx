import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Laptop,
  MapPin,
  Monitor,
  Package2,
  Phone,
  Printer,
  Server,
  Shield,
  Wifi,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductDetailModal from "../components/ProductDetailModal";
import { useAllProducts, useBrands, useCategories } from "../hooks/useQueries";
import type { Product } from "../types";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Laptops: <Laptop className="h-6 w-6" />,
  "Antivirus & Security": <Shield className="h-6 w-6" />,
  Printers: <Printer className="h-6 w-6" />,
  Servers: <Server className="h-6 w-6" />,
  Networking: <Wifi className="h-6 w-6" />,
  Software: <Monitor className="h-6 w-6" />,
};

const STATIC_BRANDS = [
  "Microsoft",
  "Kaspersky",
  "Dell",
  "HP",
  "Lenovo",
  "Asus",
  "Acer",
  "Canon",
  "Epson",
  "D-Link",
];

const STATIC_CATEGORIES = [
  {
    name: "Laptops & Desktops",
    icon: <Laptop className="h-6 w-6" />,
    desc: "Leading brands for business & personal use",
    img: "/assets/generated/product-laptop.dim_600x400.jpg",
  },
  {
    name: "Antivirus & Security",
    icon: <Shield className="h-6 w-6" />,
    desc: "Kaspersky, Quick Heal, Bitdefender",
    img: "/assets/generated/product-security.dim_600x400.jpg",
  },
  {
    name: "Printers & Scanners",
    icon: <Printer className="h-6 w-6" />,
    desc: "Canon, Epson, HP inkjet & laser",
    img: null,
  },
  {
    name: "Servers & Storage",
    icon: <Server className="h-6 w-6" />,
    desc: "Dell, HP enterprise solutions",
    img: null,
  },
  {
    name: "Networking",
    icon: <Wifi className="h-6 w-6" />,
    desc: "Routers, switches, access points",
    img: null,
  },
  {
    name: "Software & Licenses",
    icon: <Monitor className="h-6 w-6" />,
    desc: "Microsoft, Adobe, and more",
    img: "/assets/generated/product-software.dim_600x400.jpg",
  },
];

export default function HomePage() {
  const { data: products, isLoading } = useAllProducts();
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const displayCategories =
    categories && categories.length > 0
      ? categories.slice(0, 6).map((c) => ({
          name: c,
          icon: CATEGORY_ICONS[c] ?? <Package2 className="h-6 w-6" />,
          desc: "Quality products available",
          img: null as string | null,
        }))
      : STATIC_CATEGORIES;

  const displayBrands = brands && brands.length > 0 ? brands : STATIC_BRANDS;
  const featuredProducts = products?.slice(0, 6) ?? [];

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[520px] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-banner.dim_1200x500.jpg"
            alt="PRAGATI IT SOLUTIONS"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-yellow-500/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full bg-yellow-600/8 blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 border border-yellow-500/40 bg-yellow-500/20 text-yellow-300">
                Authorized IT Distributor
              </Badge>
            </motion.div>

            <motion.div
              className="mb-5 flex items-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <img
                src="/assets/uploads/pis-logo-1.jpeg"
                alt="PiS Logo"
                className="h-20 w-20 rounded-full object-cover ring-4 ring-yellow-500/60 shadow-lg"
              />
            </motion.div>

            <motion.h1
              className="mb-4 font-display text-4xl font-bold leading-tight text-white md:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your Trusted
              <span className="text-yellow-400"> IT Products</span>
              <br />
              Distributor
            </motion.h1>

            <motion.p
              className="mb-8 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              PRAGATI IT SOLUTIONS &mdash; authorized distributor of Microsoft,
              Kaspersky, Dell, HP, Lenovo and 50+ leading technology brands
              across India.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/products" data-ocid="hero.primary_button">
                <Button
                  size="lg"
                  className="gap-2 bg-yellow-500 font-semibold text-black shadow-lg hover:bg-yellow-400"
                >
                  Browse All Products
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#contact-map" data-ocid="hero.secondary_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:border-yellow-500/50 hover:bg-white/10"
                >
                  Contact Us
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-yellow-500/20 bg-black py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { label: "Brands", value: "50+" },
              { label: "Products", value: "500+" },
              { label: "Years Experience", value: "10+" },
              { label: "Happy Clients", value: "1000+" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <div className="font-display text-2xl font-bold text-yellow-400">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-background py-16" id="about">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-3 font-display text-3xl font-bold text-foreground">
              Product Categories
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Browse our wide range of IT products across multiple categories
              from authorized brands.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {displayCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to="/products"
                  search={{ category: cat.name }}
                  data-ocid={`category.item.${i + 1}`}
                  className="group relative flex h-full flex-col items-start gap-3 overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-yellow-500/40 hover:shadow-lg"
                >
                  {cat.img && (
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <img
                        src={cat.img}
                        alt={cat.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/70" />
                    </div>
                  )}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-600 transition-all group-hover:bg-yellow-500 group-hover:text-black">
                    {cat.icon}
                  </div>
                  <div className="relative z-10">
                    <div className="font-display font-semibold text-foreground transition-colors group-hover:text-yellow-400">
                      {cat.name}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground group-hover:text-white/70">
                      {cat.desc}
                    </div>
                  </div>
                  <ChevronRight className="relative z-10 mt-auto h-4 w-4 text-muted-foreground transition-colors group-hover:text-yellow-400" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand strip */}
      <section className="border-y border-border bg-secondary/50 py-10">
        <div className="container mx-auto px-4">
          <h3 className="mb-6 text-center font-display text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            Authorized Distributor of Leading Brands
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {displayBrands.map((brand, i) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to="/products"
                  search={{ brand }}
                  data-ocid={`brand.item.${i + 1}`}
                  className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black"
                >
                  {brand}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-10 flex items-end justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="mb-2 font-display text-3xl font-bold text-foreground">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Latest and most popular products from our catalog
              </p>
            </div>
            <Link to="/products" data-ocid="featured.primary_button">
              <Button
                variant="outline"
                className="hidden gap-2 border-yellow-500/30 text-yellow-600 hover:bg-yellow-500/5 md:flex"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {isLoading ? (
            <div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              data-ocid="featured.loading_state"
            >
              {["a", "b", "c", "d", "e", "f"].map((sk) => (
                <div
                  key={sk}
                  className="overflow-hidden rounded-xl border border-border"
                >
                  <Skeleton className="h-48 w-full" />
                  <div className="space-y-2 p-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="mt-3 h-8 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product, i) => (
                <motion.div
                  key={product.id.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <ProductCard
                    product={product}
                    index={i + 1}
                    onClick={() => setSelectedProduct(product)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              className="rounded-xl border border-dashed border-border py-16 text-center"
              data-ocid="featured.empty_state"
            >
              <Package2 className="mx-auto mb-3 h-12 w-12 text-muted-foreground/40" />
              <p className="text-muted-foreground">
                Products will appear here once added by admin.
              </p>
              <Link to="/products">
                <Button className="mt-4" variant="outline">
                  Browse Catalog
                </Button>
              </Link>
            </div>
          )}

          {featuredProducts.length > 0 && (
            <div className="mt-8 text-center md:hidden">
              <Link to="/products" data-ocid="featured.secondary_button">
                <Button
                  variant="outline"
                  className="gap-2 border-yellow-500/30 text-yellow-600"
                >
                  View All Products <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Find Us / Map Section */}
      <section
        id="contact-map"
        className="relative overflow-hidden py-16"
        style={{
          background:
            "linear-gradient(135deg, #1a1200 0%, #2d1f00 50%, #1a1200 100%)",
        }}
      >
        {/* Decorative glow */}
        <div className="pointer-events-none absolute top-0 right-1/3 h-72 w-72 rounded-full bg-yellow-500/6 blur-3xl" />

        {/* Top border */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #eab308 30%, #eab308 70%, transparent)",
          }}
        />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-2 flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-yellow-500/50" />
              <span className="text-xs font-bold tracking-[0.2em] text-yellow-500 uppercase">
                Visit Us
              </span>
              <div className="h-px w-12 bg-yellow-500/50" />
            </div>
            <h2 className="font-display text-3xl font-bold text-white">
              Find Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Map */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="overflow-hidden rounded-2xl"
                style={{
                  boxShadow:
                    "0 0 0 2px rgba(234,179,8,0.25), 0 20px 60px rgba(0,0,0,0.5)",
                }}
                data-ocid="contact.map_marker"
              >
                <iframe
                  title="PRAGATI IT SOLUTIONS Location"
                  src="https://maps.google.com/maps?q=Mittal+Chamber+MG+Road+Secunderabad+Hyderabad+500003&output=embed"
                  width="100%"
                  height="400"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Contact details */}
            <motion.div
              className="flex flex-col justify-center gap-6 lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Address */}
              <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-5 backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/20">
                    <MapPin className="h-4 w-4 text-yellow-400" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase">
                    Address
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-300">
                  2nd Floor, 5/5/51 Room No 209A,
                  <br />
                  Mittal Chamber, M.G. Road,
                  <br />
                  Secunderabad, Hyderabad,
                  <br />
                  Telangana - 500003
                </p>
              </div>

              {/* Phone */}
              <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-5 backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/20">
                    <Phone className="h-4 w-4 text-yellow-400" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase">
                    Call Us
                  </span>
                </div>
                <a
                  href="tel:+919866667015"
                  className="text-sm font-semibold text-white transition-colors hover:text-yellow-400"
                  data-ocid="map.phone.link"
                >
                  +91 98666 67015
                </a>
              </div>

              {/* WhatsApp */}
              <div className="rounded-xl border border-green-500/20 bg-yellow-500/10 p-5 backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/20">
                    <svg
                      role="img"
                      aria-label="WhatsApp"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 text-green-400"
                    >
                      <title>WhatsApp</title>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold tracking-widest text-green-400 uppercase">
                    WhatsApp
                  </span>
                </div>
                <a
                  href="https://wa.me/919866667015"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-white transition-colors hover:text-green-400"
                  data-ocid="map.whatsapp.link"
                >
                  +91 98666 67015
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ProductDetailModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
