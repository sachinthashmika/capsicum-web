"use client";

import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import { Button } from "./Button";
import Image from "next/image";
import LayoutWrapper from "./LayoutWrapper";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      const sections = ["home", "about", "services", "projects", "clients", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  const navItemClass = (id: string) =>
    `${activeSection === id ? "text-[var(--color-brand)] font-medium" : "hover:text-[var(--color-brand-hover)]"} transition`;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 pt-2 ${scrolled ? "bg-[var(--color-dark-bg)]" : "bg-transparent"}`}
    >
      <nav>
        <LayoutWrapper className="flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Capsicum Logo" width={32} height={32} />
            <span className="text-white text-xl font-semibold">Capsicum</span>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 text-base text-[var(--color-text-light)]">
            <li><a href="#" className={navItemClass("home")}>Home</a></li>
            <li><a href="#about" className={navItemClass("about")}>About</a></li>
            <li><a href="#projects" className={navItemClass("projects")}>Projects</a></li>
            <li><a href="#services" className={navItemClass("services")}>Services</a></li>
           
            <li><a href="#clients" className={navItemClass("clients")}>Clients</a></li>
          </ul>

          {/* Desktop Contact Button */}
          <div className="hidden md:block">
            <a href="#contact">
              <Button variant="outline" className="text-sm">
                Contact
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-white"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </LayoutWrapper>
      </nav>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" />
      )}

      {/* Mobile Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-64 bg-[var(--color-dark-bg)] text-white shadow-xl z-50 p-6 flex flex-col gap-6 transform transition-transform duration-300 md:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <ul className="flex flex-col gap-5 text-base text-[var(--color-text-light)]">
          <li>
            <a href="#" onClick={() => setMobileOpen(false)} className={navItemClass("home")}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => setMobileOpen(false)} className={navItemClass("about")}>
              About
            </a>
          </li>
          <li>
            <a href="#projects" onClick={() => setMobileOpen(false)} className={navItemClass("projects")}>
              Projects
            </a>
          </li>
          <li>
            <a href="#services" onClick={() => setMobileOpen(false)} className={navItemClass("services")}>
              Services
            </a>
          </li>
          
          <li>
            <a href="#clients" onClick={() => setMobileOpen(false)} className={navItemClass("clients")}>
              Clients
            </a>
          </li>
        </ul>

        <a href="#contact" onClick={() => setMobileOpen(false)}>
          <Button variant="outline" className="text-sm py-1.5 px-5 mt-auto">
            Contact
          </Button>
        </a>
      </aside>
    </header>
  );
}
