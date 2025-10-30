import React from "react";

export default function SearchBar({ value, onChange, onSearch }) {
  const submit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={submit} className="flex gap-3">
      <label htmlFor="city" className="sr-only">City</label>
      <input
        id="city"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter city (e.g. London, Tokyo, Mumbai)"
        className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
      />
      <button
        type="submit"
        onClick={onSearch}
        className="px-4 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg shadow-md transition"
      >
        Search
      </button>
    </form>
  );
}
