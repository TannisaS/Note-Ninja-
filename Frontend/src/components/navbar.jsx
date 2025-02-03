"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "#" },
  { name: "About us", href: "#" },
  { name: "Contact", href: "#" },
]

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
      {/* Desktop Navbar (Visible Only in Desktop) */}
      <div className="hidden md:flex bg-white rounded-full shadow-lg p-2 text-black 
                      items-center transition-all duration-300 justify-center">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="relative px-4 py-2 font-semibold hover:text-black transition-colors duration-200"
          >
            {item.name}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 hover:w-full"></span>
          </a>
        ))}
      </div>

      {/* Mobile Hamburger (Navbar Hidden, Only Button Visible) */}
      <div className="md:hidden flex justify-center">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2  rounded-full shadow-lg">
          {isOpen ? <X size={24} className="text-white"/> : <Menu size={24} className="text-white" />}
        </button>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isOpen && (
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-48 bg-white 
                        shadow-lg rounded-lg flex flex-col items-center p-3 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-black font-semibold hover:underline"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
