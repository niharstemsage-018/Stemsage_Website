import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Wrench,
  BookOpen,
  MessageSquareQuote,
  Newspaper,
  Image,
  Building2,
  Compass,
  FileText,
  Mail
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/products', label: 'Products', icon: Package },
  { path: '/services', label: 'Services', icon: Wrench },
  { path: '/courses', label: 'Courses', icon: BookOpen },
  { path: '/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { path: '/news', label: 'News', icon: Newspaper },
  { path: '/gallery', label: 'Gallery', icon: Image },
  { path: '/associations', label: 'Associations', icon: Building2 },
  { path: '/innovations', label: 'Innovations', icon: Compass },
  { path: '/blogs', label: 'Blogs', icon: FileText },
  { path: '/messages', label: 'Messages', icon: Mail },
];

export default function Sidebar({ onClose }) {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-screen lg:sticky lg:top-0 lg:h-screen">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-600 inline-block"></span>
          STEMSAGE Admin
        </h1>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}