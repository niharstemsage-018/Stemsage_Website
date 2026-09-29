import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import GoogleAuthButton from "../components/auth/GoogleAuthButton";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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
        <p className="text-sm text-slate-700 font-normal mb-6">
          New to this site?{" "}
          <Link
            to="/signup"
            className="text-slate-900 font-normal hover:underline underline-offset-2 transition-all"
          >
            Sign Up
          </Link>
        </p>

        {/* Error Banner */}
        {error && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded text-left leading-relaxed">
            {error}
          </div>
        )}

        {/* Social Buttons & Email Action */}
        <div className="w-full space-y-3">
          
          {/* Google Button */}
          <GoogleAuthButton
            buttonText="Log in with Google"
            onError={setError}
          />

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
