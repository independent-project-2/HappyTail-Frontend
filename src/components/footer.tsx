import LOGO from '/assets/Images/logo.png'
import { PawPrint, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className=" relative bg-gray-700 text-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/10 via-transparent to-orange-500/10 pointer-events-none" />

      <div className="relative mt-0 mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-4 md:grid-cols-4">
          {/* logo */}
          <div className="space-y-2">
            <img src={LOGO} alt="HappyTail Logo" className="h-20 w-auto" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Building meaningful connections between pets and people.
            </p>

            <div className="flex items-center gap-3 pt-2 text-indigo-400">
              <PawPrint className="h-5 w-5 animate-pulse" />
              <span className="text-sm font-medium">
                Adopt. Love. Repeat.
              </span>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="font-semibold mb-4 tracking-wide">
              Pages
            </h3>
            <ul className="space-y-3 text-sm">
              {['Home', 'Browse Pets', 'Blog', 'About'].map((item) => (
                <li key={item}>
                  <button className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all">
                    <span className="h-1 w-1 rounded-full bg-indigo-400 scale-0 group-hover:scale-100 transition-transform" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 tracking-wide">
              Resources
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">
                Pet Care Guide
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Blog
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Ask Me
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 tracking-wide">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-indigo-400" />
                support@happytail.com
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-indigo-400" />
                +94 898 756 44
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 pt-4 border-t border-gray-300 flex justify-center">
          <p className="text-gray-400 text-xs text-center">
              © 2025HappyTail.All rights reserved.
           </p>
        </div>
      </div>
    </footer>
  )
}
