import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-[#27272a]">
      <div className="mx-auto max-w-6xl">
        <div className="grid sm:grid-cols-3 gap-8 items-start">
          {/* Logo + copyright */}
          <div>
            <Image
              src="/logo_large_light.svg"
              alt="A Level Mentor"
              width={130}
              height={20}
              className="h-5 w-auto mb-3"
              unoptimized
            />
            <p className="text-xs text-[#71717a]">
              &copy; {new Date().getFullYear()} alevelmentor. All rights reserved.
            </p>
          </div>

          {/* Product links */}
          <div>
            <p className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-3">
              Product
            </p>
            <div className="space-y-2">
              <a
                href="#features"
                className="block text-sm text-[#71717a] hover:text-[#5a35f8] transition-colors"
              >
                Features
              </a>
              <a
                href="#solution"
                className="block text-sm text-[#71717a] hover:text-[#5a35f8] transition-colors"
              >
                How It Works
              </a>
              <a
                href="#faq"
                className="block text-sm text-[#71717a] hover:text-[#5a35f8] transition-colors"
              >
                FAQ
              </a>
            </div>
          </div>

          {/* Legal + contact */}
          <div>
            <p className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-3">
              Legal
            </p>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-sm text-[#71717a] hover:text-[#5a35f8] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="block text-sm text-[#71717a] hover:text-[#5a35f8] transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="mailto:hello@alevelmentor.com"
                className="block text-sm text-[#71717a] hover:text-[#5a35f8] transition-colors"
              >
                hello@alevelmentor.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
