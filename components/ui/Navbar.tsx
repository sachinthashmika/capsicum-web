'use client'

import { useState, useEffect, useRef } from "react"
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Settings,
  Users,
  Mail,
  ChevronRight,
} from "lucide-react"
import { Button } from "./Button"
import Image from "next/image"
import LayoutWrapper from "./LayoutWrapper"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
      const sections = ["home", "about", "services", "projects", "clients", "contact"]
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 80 && rect.bottom >= 80) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileOpen])

  const navItemClass = (id: string) =>
    `${
      activeSection === id ? "text-[var(--color-brand)] font-medium" : "hover:text-[var(--color-brand-hover)]"
    } transition`

  const navigationItems = [
    { id: "home", label: "Home", href: "#", icon: Home },
    { id: "about", label: "About", href: "#about", icon: User },
    { id: "projects", label: "Projects", href: "#projects", icon: Briefcase },
    { id: "services", label: "Services", href: "#services", icon: Settings },
    { id: "clients", label: "Clients", href: "#clients", icon: Users },
    { id: "contact", label: "Contact", href: "#contact", icon: Mail },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 pt-2 ${
        scrolled ? "bg-[var(--color-dark-bg)]" : "bg-transparent"
      }`}
    >
      <nav>
        <LayoutWrapper className="flex items-center justify-between py-6 px-4 md:px-0">
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
              <Button variant="outline" className="text-sm bg-transparent">
                Contact
              </Button>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="relative p-2 text-white hover:text-[#ff2d55] transition-colors duration-200 group"
              aria-label="Open menu"
            >
              <div className="absolute inset-0 bg-[#ff2d55]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <Menu size={24} className="relative z-10" />
            </button>
          </div>
        </LayoutWrapper>
      </nav>

      {/* Backdrop for mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300" />
      )}

      {/* Mobile Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a0a0a] text-white shadow-2xl z-50 transform transition-all duration-500 ease-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative p-6 border-b border-[#ff2d55]/20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff2d55]/5 to-transparent" />
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-white tracking-wide">Capsicum</h3>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="relative p-2 text-gray-400 hover:text-white transition-colors duration-200 group"
              aria-label="Close menu"
            >
              <div className="absolute inset-0 bg-[#ff2d55]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <X size={20} className="relative z-10" />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="flex-1 p-6">
          <nav className="space-y-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`group relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:translate-x-2 active:scale-95 ${
                    isActive
                      ? "bg-[#ff2d55]/20 text-[#ff2d55] shadow-lg shadow-[#ff2d55]/10"
                      : "text-gray-300 hover:text-white hover:bg-[#ff2d55]/10"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#ff2d55] rounded-r-full" />
                  )}
                  <div
                    className={`relative p-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-[#31060e] shadow-lg shadow-[#ff2d55]/20"
                        : "bg-gray-800/50 group-hover:bg-[#ff2d55]/20"
                    }`}
                  >
                    <Icon size={18} className="relative z-10" />
                  </div>
                  <span className="font-medium text-base flex-1">{item.label}</span>
                  <ChevronRight
                    size={16}
                    className={`transition-all duration-300 ${
                      isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </a>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Glow Effects */}
        <div className="absolute top-20 right-6 w-32 h-32 bg-[#ff2d55]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-6 w-24 h-24 bg-[#ff2d55]/5 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-[#ff2d55]/30 to-transparent blur-sm" />
        <div className="absolute top-1/3 right-0 w-1 h-24 bg-gradient-to-b from-transparent via-[#ff2d55]/20 to-transparent blur-sm" />
      </aside>
    </header>
  )
}
