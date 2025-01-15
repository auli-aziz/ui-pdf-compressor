"use server";

import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import DropdownMenuComponent from "@/components/fragments/dropdown-menu";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth/config";

async function Header() {
  const session = await getServerSession(authConfig);

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          {/* <Image src={uilogo} alt="UI PDF Compressor" width={32} height={32} /> */}
          <span className="ml-2 text-xl font-semibold text-gray-900">
            UI PDF<span className="text-orange-500"> Compressor</span>
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            About Us
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Pricing
          </Link>
          <DropdownMenuComponent session={session} />
        </div>
      </div>
    </header>
  );
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="flex flex-col">
        <Header />
        {children}
      </section>
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About section */}
            <div>
              <h3 className="text-xl font-semibold text-white">About Us</h3>
              <p className="mt-4 text-sm">
                We provide high-quality PDF compression services to help users
                reduce file size without sacrificing quality. Trusted by
                professionals and students alike.
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-xl font-semibold text-white">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:underline">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media & Contact Info */}
            <div>
              <h3 className="text-xl font-semibold text-white">Follow Us</h3>
              <div className="mt-4 flex space-x-4">
                <a href="#" aria-label="Facebook">
                  <Facebook className="w-6 h-6 text-gray-400 hover:text-white" />
                </a>
                <a href="#" aria-label="Twitter">
                  <Twitter className="w-6 h-6 text-gray-400 hover:text-white" />
                </a>
                <a href="#" aria-label="Instagram">
                  <Instagram className="w-6 h-6 text-gray-400 hover:text-white" />
                </a>
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white">Contact Us</h4>
                <p className="text-sm">Email: support@pdfcompressor.com</p>
                <p className="text-sm">Phone: +1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
            &copy; 2024 PDFCompressor. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
