// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navyPanel flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-left space-y-8">

        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="w-5 h-5 text-responseGreen" />
            <span className="text-xs font-mono font-black tracking-widest text-responseGreen uppercase">
              System Error — Route Not Found
            </span>
          </div>
          <h1 className="text-8xl font-black text-white leading-none tracking-tighter">
            404
          </h1>
          <p className="text-xl font-black text-white/60 uppercase tracking-tight">
            Page Not Found
          </p>
        </div>

        <div className="border-l-2 border-responseGreen pl-6 space-y-2">
          <p className="text-sm text-white/50 font-mono leading-relaxed">
            The route you are trying to access does not exist or has been moved.
            Return to the homepage or use the navigation to find what you need.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-responseGreen hover:bg-emerald-600 text-navyPanel font-bold uppercase tracking-wider text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Homepage
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 hover:border-white text-white font-mono text-xs tracking-widest font-bold uppercase transition-colors"
          >
            Contact Support
          </Link>
        </div>

        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
          CleanAfrica Associates Platform — Error Code 404
        </p>
      </div>
    </div>
  );
}
