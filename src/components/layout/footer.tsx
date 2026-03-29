import Link from "next/link";
import { Mountain, Mail, Phone, MapPin, Globe, Share2, Play } from "lucide-react";

const explore = [
  { label: "All Tours", href: "/tours" },
  { label: "Community", href: "/community" },
  { label: "About Us", href: "/about" },
];

const popular = [
  { label: "Charyn Canyon", href: "/tours/1" },
  { label: "Kolsai Lakes", href: "/tours/2" },
  { label: "Burabay National Park", href: "/tours/12" },
  { label: "Kaindy Lake", href: "/tours/8" },
  { label: "Silk Road Heritage", href: "/tours/5" },
];

const legal = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cancellation Policy", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-sand-900 text-sand-300">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Mountain className="h-6 w-6 text-terracotta-400" />
              <span className="text-lg font-bold text-white">Saiahat</span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-sand-400">
              Premium travel experiences across Kazakhstan's most breathtaking landscapes. Curated by locals, built for explorers.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: Share2, label: "Instagram" },
                { icon: Globe, label: "Website" },
                { icon: Play, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-sand-700 text-sand-400 transition-colors hover:border-terracotta-500 hover:text-terracotta-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-sand-400 transition-colors hover:text-terracotta-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">
              Popular Tours
            </h3>
            <ul className="space-y-2.5">
              {popular.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-sand-400 transition-colors hover:text-terracotta-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-sand-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-400" />
                <span>Almaty, Kazakhstan</span>
              </li>
              <li>
                <a
                  href="mailto:hello@saiahat.kz"
                  className="flex items-center gap-2.5 text-sm text-sand-400 transition-colors hover:text-terracotta-400"
                >
                  <Mail className="h-4 w-4 shrink-0 text-terracotta-400" />
                  hello@saiahat.kz
                </a>
              </li>
              <li>
                <a
                  href="tel:+77001234567"
                  className="flex items-center gap-2.5 text-sm text-sand-400 transition-colors hover:text-terracotta-400"
                >
                  <Phone className="h-4 w-4 shrink-0 text-terracotta-400" />
                  +7 700 123 45 67
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-sand-800">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-xs text-sand-600">
              &copy; {new Date().getFullYear()} Saiahat. All rights reserved.
            </p>
            <div className="flex gap-5">
              {legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs text-sand-600 transition-colors hover:text-sand-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
