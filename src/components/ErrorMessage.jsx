import React from "react";

export default function ErrorMessage({ message }) {
  return (
    <div className="w-full bg-red-50 border border-red-200 text-red-800 p-3 rounded-md text-sm">
      {message}
    </div>
  );
}
