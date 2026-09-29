import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-4 overflow-y-auto font-sans">
      {/* Top-Right Close Button */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-6 right-6 p-2 text-slate-800 hover:opacity-70 transition-opacity cursor-pointer focus:outline-none"
        aria-label="Close"
      >
        <X className="w-6 h-6 stroke-[1.5]" />
      </button>

      {/* Main Content Area */}
      <div className="w-full max-w-[360px] flex flex-col items-center text-center my-auto">
        
        {/* Title */}
        <h1 className="text-4xl font-normal text-slate-800 tracking-tight mb-3">
          Log In
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-slate-700 font-normal mb-8">
          New to this site?{" "}
          <Link
            to="/signup"
            className="text-slate-900 font-normal hover:underline underline-offset-2 transition-all"
          >
            Sign Up
          </Link>
        </p>

        {/* Social Buttons & Email Action */}
        <div className="w-full space-y-3">
          
          {/* Google Button */}
          <button
            type="button"
            onClick={handleClick}
            className="relative w-full h-11 border border-slate-300 bg-white hover:bg-slate-50 active:bg-slate-100 transition-colors flex items-center justify-center px-4 cursor-pointer"
          >
            <div className="absolute left-4 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
            <span className="text-sm font-normal text-slate-800">
              Log in with Google
            </span>
          </button>

          {/* Divider */}
          <div className="relative py-2 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300" />
            </div>
            <span className="relative bg-white px-3 text-xs font-normal text-slate-500 lowercase">
              or
            </span>
          </div>

          {/* Email Button */}
          <button
            type="button"
            onClick={handleClick}
            className="w-full h-11 border border-slate-300 bg-white hover:bg-slate-50 active:bg-slate-100 transition-colors flex items-center justify-center px-4 cursor-pointer"
          >
            <span className="text-sm font-normal text-slate-800">
              Log in with Email
            </span>
          </button>

        </div>

      </div>
    </div>
  );
}
