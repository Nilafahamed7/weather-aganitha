import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-white animate-spin"></div>
      <div className="text-sm text-slate-700">Fetching weather…</div>
    </div>
  );
}
