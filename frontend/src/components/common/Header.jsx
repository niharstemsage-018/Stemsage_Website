import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

/* ─── Courses Mega Menu Data ─── */
const coursesMegaMenuColumns = [
  {
    id: 1,
    categories: [
      {
        title: "Electronics",
        items: [
          { label: "Basic electronics", path: "/courses" },
          { label: "Fundamentals of Electronics", path: "/courses" },
          { label: "Digital Electronics", path: "/courses" },
        ],
      },
    ],
  },
  {
    id: 2,
    categories: [
      {
        title: "Internet of Things",
        items: [
          { label: "Arduino Masterclass", path: "/courses" },
          { label: "Play with Sensors", path: "/courses" },
          { label: "IOT Masterclass", path: "/courses" },
          { label: "Industrial IOT Training & Workshops", path: "/courses" },
        ],
      },
    ],
  },
  {
    id: 3,
    categories: [
      {
        title: "Robotics",
        items: [
          { label: "DIY Robotics", path: "/courses" },
          { label: "Advanced Robotics Masterclass", path: "/courses" },
          { label: "SRC (Simulation Robotics Class)", path: "/courses" },
        ],
      },
      {
        title: "3D Designing & Animations",
        items: [
          { label: "3D Designing Masterclass", path: "/courses" },
          { label: "3D Animation Super Course", path: "/courses" },
        ],
      },
    ],
  },
];

/* ─── Nav structure ─── */
const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  {
    label: "Courses",
    path: "/courses",
    isMegaMenu: true,
  },
  { label: "Services", path: "/services" },
  { label: "Our Store", path: "/store" },
  {
    label: "Our Forum",
    path: "/forum",
    isHorizontal: true,
    dropdown: [
      { label: "Blog", path: "/forum" },
      { label: "Gallery", path: "/learning" },
      { label: "Projects", path: "/projects" },
      { label: "Student Projects", path: "/student-projects" },
    ],
  },
  { label: "Contact", path: "/contact" },
];

/* ─── Coming Soon Modal ─── */
function ComingSoonModal({ title, onClose }) {
  if (!title) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl text-center">
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition"
        >
          <X size={18} />
        </button>

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600 text-3xl shadow-inner">
          🚀
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-600 text-[11px] font-bold uppercase tracking-wider mb-3">
          Coming Soon
        </span>

        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
          {title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          This course is currently under development. Stay tuned for upcoming schedule releases and enrollment details!
        </p>

        <div className="flex flex-col gap-2.5">
          <Link
            to="/courses"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md"
          >
            Browse Course Catalog
          </Link>
          <button
            onClick={onClose}
            type="button"
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Desktop Mega Menu for Courses ─── */
function CoursesMegaMenu({ onCourseClick }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-45%)",
        paddingTop: "12px",
        zIndex: 100,
        width: "750px",
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      <div
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          boxShadow: "0 20px 45px -10px rgba(0,0,0,0.12), 0 0 15px rgba(0,0,0,0.04)",
          padding: "24px 28px",
          position: "relative",
        }}
      >
        {/* Pointer Arrow */}
        <div
          style={{
            position: "absolute",
            top: "6px",
            left: "45%",
            transform: "translateX(-50%) rotate(45deg)",
            width: "12px",
            height: "12px",
            background: "white",
            borderLeft: "1px solid #e2e8f0",
            borderTop: "1px solid #e2e8f0",
          }}
        />

        <div className="grid grid-cols-3 gap-8 text-left">
          {coursesMegaMenuColumns.map((col) => (
            <div key={col.id} className="flex flex-col gap-6">
              {col.categories.map((cat) => (
                <div key={cat.title}>
                  {/* Category Header */}
                  <div className="flex items-center gap-1.5 text-[14px] font-semibold text-blue-600 mb-2.5">
                    <span className="text-blue-500 text-xs">❖</span>
                    <span>{cat.title}</span>
                  </div>

                  {/* Category Link List */}
                  {cat.items.length > 0 && (
                    <ul className="flex flex-col gap-2 pl-3">
                      {cat.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={`/courses?course=${encodeURIComponent(item.label)}`}
                            onClick={() => onCourseClick(item.label)}
                            className="text-[13px] font-normal text-slate-700 hover:text-blue-600 transition-colors block py-0.5 text-left w-full cursor-pointer"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Standard Desktop Dropdown ─── */
function DropdownMenu({ items }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        paddingTop: "12px",
        zIndex: 100,
        minWidth: "220px",
      }}
    >
      <div
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          boxShadow: "0 20px 45px -10px rgba(0,0,0,0.12), 0 0 15px rgba(0,0,0,0.04)",
          padding: "18px 22px",
          position: "relative",
        }}
      >
        {/* Pointer Arrow */}
        <div
          style={{
            position: "absolute",
            top: "6px",
            left: "50%",
            transform: "translateX(-50%) rotate(45deg)",
            width: "12px",
            height: "12px",
            background: "white",
            borderLeft: "1px solid #e2e8f0",
            borderTop: "1px solid #e2e8f0",
          }}
        />

        <ul className="flex flex-col gap-2.5 text-left relative z-10">
          {items.map((item) =>
            item.disabled ? (
              <li key={item.label}>
                <span className="text-[13px] font-normal text-slate-400 cursor-not-allowed block py-0.5">
                  {item.label} (Soon)
                </span>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="text-[13px] font-normal text-slate-700 hover:text-blue-600 transition-colors block py-0.5 text-left w-full cursor-pointer"
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

/* ─── Horizontal Desktop Dropdown Sub-Bar (Courses Mega Menu Style) ─── */
function HorizontalSubNav({ items, onClose }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        paddingTop: "12px",
        zIndex: 100,
        width: "620px",
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      <div
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          boxShadow: "0 20px 45px -10px rgba(0,0,0,0.12), 0 0 15px rgba(0,0,0,0.04)",
          padding: "20px 24px",
          position: "relative",
        }}
      >
        {/* Pointer Arrow */}
        <div
          style={{
            position: "absolute",
            top: "6px",
            left: "50%",
            transform: "translateX(-50%) rotate(45deg)",
            width: "12px",
            height: "12px",
            background: "white",
            borderLeft: "1px solid #e2e8f0",
            borderTop: "1px solid #e2e8f0",
          }}
        />

        <div className="grid grid-cols-4 gap-4 text-center items-center relative z-10">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={onClose}
              className="text-[13.5px] font-normal text-slate-700 hover:text-blue-600 transition-colors py-1 px-2 inline-block text-center cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Header ─── */
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [comingSoonTitle, setComingSoonTitle] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActiveRoute = (path) => {
    if (!path) return false;
    if (path === "/") return location.pathname === "/";
    return location.pathname === path;
  };

  const isGroupActive = (item) => {
    if (isActiveRoute(item.path)) return true;
    if (item.dropdown) {
      const topLevelPaths = navItems.map((n) => n.path);
      return item.dropdown.some(
        (d) => d.path && !topLevelPaths.includes(d.path) && isActiveRoute(d.path)
      );
    }
    return false;
  };

  const handleCourseItemClick = (courseTitle) => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    setComingSoonTitle(courseTitle);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2.5 text-slate-900 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 rounded"
            >
              <img
                src="/images/logo.png"
                alt="STEMSAGE"
                className="h-8 w-auto object-contain"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <span className="text-lg font-extrabold leading-none tracking-tight text-slate-900">
                STEMSAGE
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main Navigation" ref={dropdownRef}>
            {navItems.map((item) => {
              const active = isGroupActive(item);

              /* ── Item with Courses Mega Menu ── */
              if (item.isMegaMenu) {
                const isOpen = openDropdown === item.label;
                return (
                  <div
                    key={item.label}
                    style={{ position: "relative" }}
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      to={item.path}
                      className={`inline-flex items-center gap-1 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded px-1 ${
                        active
                          ? "font-bold text-red-600 underline decoration-red-500 decoration-2 underline-offset-4"
                          : "font-medium text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className="text-slate-400 transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </Link>
                    {isOpen && <CoursesMegaMenu onCourseClick={handleCourseItemClick} />}
                  </div>
                );
              }

              /* ── Standard Dropdown ── */
              if (item.dropdown) {
                const isOpen = openDropdown === item.label;
                return (
                  <div
                    key={item.label}
                    style={{ position: "relative" }}
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      to={item.path}
                      className={`inline-flex items-center gap-1 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded px-1 ${
                        active
                          ? "font-bold text-red-600 underline decoration-red-500 decoration-2 underline-offset-4"
                          : "font-medium text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className="text-slate-400 transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </Link>
                    {isOpen && (
                      item.isHorizontal ? (
                        <HorizontalSubNav items={item.dropdown} onClose={() => setOpenDropdown(null)} />
                      ) : (
                        <DropdownMenu items={item.dropdown} />
                      )
                    )}
                  </div>
                );
              }

              /* ── Regular link ── */
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`inline-flex items-center gap-1 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded px-1 ${
                    active
                      ? "font-bold text-red-600 underline decoration-red-500 decoration-2 underline-offset-4"
                      : "font-medium text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-3.5 lg:flex">
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 shadow-sm"
            >
              GET STARTED
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col justify-between border-t border-slate-200 bg-white px-6 py-6 lg:hidden overflow-y-auto shadow-2xl">
            <div className="space-y-1">
              {navItems.map((item) => {
                const active = isGroupActive(item);

                /* ── Mega Menu (Courses) Mobile ── */
                if (item.isMegaMenu) {
                  const isOpen = openDropdown === item.label;
                  return (
                    <div key={item.label}>
                      <div
                        className={`flex h-11 items-center justify-between rounded-lg px-3 cursor-pointer transition-colors ${
                          active
                            ? "border-l-4 border-red-500 bg-red-50/60 font-bold text-red-600 pl-4"
                            : "font-medium text-slate-700 hover:bg-slate-50"
                        }`}
                        onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                      >
                        <span className="text-base">{item.label}</span>
                        <ChevronDown
                          size={16}
                          className="text-slate-400 transition-transform duration-200"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                      </div>

                      {isOpen && (
                        <div className="ml-4 mt-2 border-l-2 border-slate-100 pl-3 space-y-4 py-2">
                          {coursesMegaMenuColumns.map((col) =>
                            col.categories.map((cat) => (
                              <div key={cat.title} className="space-y-1">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                                  <span>❖</span>
                                  <span>{cat.title}</span>
                                </div>
                                {cat.items.map((child) => (
                                  <Link
                                    key={child.label}
                                    to={`/courses?course=${encodeURIComponent(child.label)}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block pl-3 text-xs text-slate-600 hover:text-blue-600 py-1 text-left w-full"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  );
                }

                /* ── Standard Dropdown Mobile ── */
                if (item.dropdown) {
                  const isOpen = openDropdown === item.label;
                  return (
                    <div key={item.label}>
                      <div
                        className={`flex h-11 items-center justify-between rounded-lg px-3 cursor-pointer transition-colors ${
                          active
                            ? "border-l-4 border-red-500 bg-red-50/60 font-bold text-red-600 pl-4"
                            : "font-medium text-slate-700 hover:bg-slate-50"
                        }`}
                        onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                      >
                        <span className="text-base">{item.label}</span>
                        <ChevronDown
                          size={16}
                          className="text-slate-400 transition-transform duration-200"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                      </div>
                      {isOpen && (
                        <div className="ml-4 mt-1 border-l-2 border-slate-100 pl-3 space-y-0.5">
                          {item.dropdown.map((child) =>
                            child.disabled ? (
                              <div
                                key={child.label}
                                className="flex h-10 items-center gap-2 px-3 text-sm text-slate-400 cursor-not-allowed"
                              >
                                <span>{child.icon}</span>
                                <span>{child.label}</span>
                                <span className="ml-auto text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full">Soon</span>
                              </div>
                            ) : (
                              <Link
                                key={child.label}
                                to={child.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex h-10 items-center gap-2 rounded-lg px-3 text-sm transition-colors ${
                                  isActiveRoute(child.path)
                                    ? "font-bold text-red-600 bg-red-50/60"
                                    : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                              >
                                <span>{child.icon}</span>
                                <span>{child.label}</span>
                              </Link>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  );
                }

                /* ── Regular link ── */
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex h-11 items-center justify-between rounded-lg px-3 text-base transition-colors ${
                      active
                        ? "border-l-4 border-red-500 bg-red-50/60 font-bold text-red-600 pl-4"
                        : "font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-6 border-t border-slate-100">
              <Link
                to="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex h-11 w-full items-center justify-center rounded-md bg-red-600 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-red-700"
              >
                GET STARTED
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        title={comingSoonTitle}
        onClose={() => setComingSoonTitle(null)}
      />
    </>
  );
}

export default Header;



